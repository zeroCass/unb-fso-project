"use server";

import { getToken } from "@/lib/getToken";
import { APIGenericResponse } from "@/types";

// Função para calcular a diferença em segundos entre dois timestamps
function calculateRemainingSeconds(timestamp: string) {
	const now = new Date();
	const initialTime = new Date(timestamp);
	const differenceInMilliseconds = now.getTime() - initialTime.getTime();
	const differenceInSeconds = Math.max(-1, Math.floor(differenceInMilliseconds / 1000));
	return differenceInSeconds;
}

export async function ReservaTurno(turnoKey: string): Promise<APIGenericResponse> {
	const token = await getToken(); // Pega o token no servidor
	if (!token) {
		console.error("Token inválido");
		return { error: true, message: "Token inválido" };
	}

	try {
		const response = await fetch(`${process.env.DJANGO_API}/api/reserva-turno/`, {
			method: "POST",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				turno: turnoKey,
			}),
		});

		const data = await response.json();
		if (data.tempo_inicial) {
			const remainingTime = calculateRemainingSeconds(data.tempo_inicial);
			console.warn("Time Remain: ", remainingTime);
		}

		console.log("Reserva data: ", data);
		return {
			message: data.message,
			sucess: data.sucess ? true : false,
			error: data.error ? true : false,
		};
	} catch (err) {
		console.error("Erro ao realizar a reserva:", err);
		return { error: true, message: "Erro ao realizar a reserva" };
	}
}

export async function desfazerReserva() {
  const token = await getToken();  // Pega o token no servidor
  if (!token) {
    console.error("Token inválido");
    return { error: "Token inválido" };
  }

  try {
    const response = await fetch(`${process.env.DJANGO_API}/api/desfazer-reserva/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      }
    });
	

    const data = await response.json();
    console.log("Aluno retirado da fila de reservados:", data);
    return { message: "Aluno retirado da fila de reservados", data };
  } catch (err) {
    return { error: "Erro ao realizar a operação" };
  }
}
"use server";

import { getToken } from "@/lib/getToken";

export async function ReservaTurno(turnoKey: string) {
  const token = await getToken();  // Pega o token no servidor
  if (!token) {
    console.error("Token inválido");
    return { error: "Token inválido" };
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
    console.log("Reserva realizada com sucesso:", data);
    return { message: "Reserva realizada com sucesso", data };
  } catch (err) {
    console.error("Erro ao realizar a reserva:", err);
    return { error: "Erro ao realizar a reserva" };
  }
}

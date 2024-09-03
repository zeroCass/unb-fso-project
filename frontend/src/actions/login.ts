"use server";

import { encrypt } from "@/lib/_session";
import isValidCPF from "@/utils/isValidCpf";
import { cookies } from "next/headers";

type fetchData = {
	token: string;
	user: { id: number; role: "ADMIN" | "ALUNO" };
};

type Response = {
	sucess: boolean;
	error: boolean;
	message: string;
};

export default async function login(state: {}, formData: FormData): Promise<Response> {
	const cpfData = formData.get("cpf") as string;
	const password = formData.get("password") as string;

	const cpf = cpfData.replace(/[^\d]+/g, "");
	if (!isValidCPF(cpf)) {
		console.warn("CPF INVÁLIDO!!", cpf);
		return { error: true, sucess: false, message: "CPF invalido" };
	}

	try {
		if (!cpf) throw new Error("Preencha os dados.");
		if (!password) throw new Error("Preencha os dados.");

		const response = await fetch(`${process.env.DJANGO_API}/api/login/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ cpf, password }),
		});

		if (!response.ok) {
			throw new Error("Failed to authenticate");
		}

		const data: fetchData = await response.json();

		// Create the session
		const expires = new Date(Date.now() + 10 * 60 * 1000);
		const session = await encrypt({ token: data.token, user: data.user, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });

		return { sucess: true, error: false, message: "Login realizado com sucesso" };
	} catch (error: unknown) {
		return { sucess: false, error: true, message: String(error) };
	}
}

"use server";

import { getToken } from "@/lib/getToken";

type Response = {
	sucess: boolean;
	error: boolean;
	message: string;
};

export default async function registerAluno(state: {}, formData: FormData): Promise<Response> {
	const token = await getToken();
	if (!token) return { error: true, sucess: false, message: "Token Not Found" };

	const cpf = formData.get("cpf") as string | null;
	const password = formData.get("password") as string | null;
	const nome = formData.get("nome") as string | null;

	try {
		if (!cpf) throw new Error("Preencha os dados.");
		if (!password) throw new Error("Preencha os dados.");

		const response = await fetch(`${process.env.DJANGO_API}/api/aluno/create/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({ nome, cpf, password, role: "ALUNO" }),
		});

		if (!response.ok) {
			return { sucess: false, error: true, message: response.statusText };
		}

		console.log("response: ", response.status, response.body);
		return { sucess: true, error: false, message: "Aluno Cadastrado" };
	} catch (error: unknown) {
		return { sucess: false, error: true, message: "error" };
	}
}

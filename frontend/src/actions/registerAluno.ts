"use server";

import { getToken } from "@/lib/getToken";
import isValidCPF from "@/utils/isValidCpf";

type Response = {
	success: boolean;
	error: boolean;
	message: string;
};

export default async function registerAluno(state: {}, formData: FormData): Promise<Response> {
	const token = await getToken();
	if (!token) return { error: true, success: false, message: "Token Not Found" };

	const cpfData = formData.get("cpf") as string;
	const password = formData.get("password") as string | null;
	const nome = formData.get("nome") as string | null;

	const cpf = cpfData.replace(/[^\d]+/g, "");
	if (!isValidCPF(cpf)) return { error: true, success: false, message: "CPF invalido" };

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
			return { success: false, error: true, message: response.statusText };
		}

		console.log("response: ", response.status, response.body);
		return { success: true, error: false, message: "Aluno Cadastrado" };
	} catch (error: unknown) {
		return { success: false, error: true, message: "error" };
	}
}

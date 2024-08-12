// @ts-nocheck
"use server";

import { cookies } from "next/headers";

export async function login(state, formData) {
	console.warn("dados do form: ", formData.get("cpf"), formData.get("password"));
	// 1- faz consulta na api

	try {
		// 2 - recebe os dados
		const data = {
			name: "Jão das Neves",
			cpf: formData.get("cpf"),
			role: "aluno",
		};

		// 3 - armazena nos cookies
		// await createSession(JSON.parse(data));
		cookies().set("session", formData.cpf);
		console.log("session created");

		return {
			sucess: true,
			data: data,
			error: null,
		};
	} catch (error) {
		return {
			sucess: false,
			data: null,
			error: error.message,
		};
	}
}

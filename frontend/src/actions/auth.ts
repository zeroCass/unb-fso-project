// @ts-nocheck
"use server";

import { cookies } from "next/headers";

export async function login(state, formData) {
	console.warn("dados do form: ", formData.get("cpf"), formData.get("password"));
	// 1- faz consulta na api

	try {
		// 2 - recebe os dados

		// 3 - armazena nos cookies
		cookies().set("token", formData.get("cpf"), {
			httpOnly: true,
			secure: true,
			maxAge: 60 * 10,
		});
		return {
			sucess: true,
			error: null,
		};
	} catch (error) {
		return {
			sucess: false,
			error: error.message,
		};
	}
}

export async function logout() {
	cookies().delete("token");
}

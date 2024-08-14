"use server";

import { encrypt } from "@/lib/_session";
import { getToken } from "@/lib/getToken";
import { cookies } from "next/headers";

export default async function login(state: {}, formData: FormData) {
	const cpf = formData.get("cpf") as string | null;
	const password = formData.get("password") as string | null;
	console.warn("cpf: ", cpf);

	try {
		if (!cpf) throw new Error("Preencha os dados.");

		const token = await getToken(cpf, password);
		// if (!response.ok) throw new Error('Senha ou usuário inválidos.');
		// const data = await response.json();
		// cookies().set("session", token, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	sameSite: "lax",
		// 	maxAge: 60 * 60 * 24,
		// });

		// Create the session
		const expires = new Date(Date.now() + 10 * 60 * 1000);
		const session = await encrypt({ token, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });

		return { sucess: true, data: null, error: null };
	} catch (error: unknown) {
		return { sucess: false, data: null, error: "error" };
	}
}

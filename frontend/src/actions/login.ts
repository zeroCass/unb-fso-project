"use server";

import { encrypt } from "@/lib/_session";
import { cookies } from "next/headers";

export default async function login(state: {}, formData: FormData) {
	const cpf = formData.get("cpf") as string | null;
	const password = formData.get("password") as string | null;
	console.warn("cpf: ", cpf);

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

		const sessionWithToken = await response.json();

		// Create the session
		const expires = new Date(Date.now() + 10 * 60 * 1000);
		const session = await encrypt({ session: sessionWithToken, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });

		return { sucess: true, data: null, error: null };
	} catch (error: unknown) {
		return { sucess: false, data: null, error: "error" };
	}
}

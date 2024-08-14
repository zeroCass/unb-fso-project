import type { SessionCookie } from "@/types";
import { cookies } from "next/headers";
import { decrypt } from "./_session";

// get the token from the api
export async function getToken() {
	const cookie = cookies().get("session")?.value;
	// if (!token) throw new Error("Token não encontrado.");
	if (!cookie) return null;

	const decryptCookie: SessionCookie = await decrypt(cookie);
	return decryptCookie.session.token;
}

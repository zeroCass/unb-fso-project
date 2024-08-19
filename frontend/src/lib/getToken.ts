import type { Session } from "@/types";
import { cookies } from "next/headers";
import { decrypt } from "./_session";

// get the token from the api
export async function getToken(): Promise<string | null> {
	const cookie = cookies().get("session")?.value;
	// if (!token) throw new Error("Token não encontrado.");
	if (!cookie) return null;

	const decryptCookie: Session = await decrypt(cookie);
	return decryptCookie.token;
}

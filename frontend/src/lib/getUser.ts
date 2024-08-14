// get the user from cookie
import type { SessionCookie, User } from "@/types";
import { cookies } from "next/headers";
import { decrypt } from "./_session";

export async function getUser() {
	const cookie = cookies().get("session")?.value;
	// if (!token) throw new Error("Token não encontrado.");
	if (!cookie) return null;

	const decryptCookie: SessionCookie = await decrypt(cookie);

	const user: User = {
		nome: decryptCookie.session.nome,
		role: decryptCookie.session.role,
	};

	return user;
}

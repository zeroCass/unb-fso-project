import { cookies } from "next/headers";

export async function fetchUser() {
	const token = cookies().get("session")?.value;
	// if (!token) throw new Error("Token não encontrado.");
	if (!token) return;

	try {
		const res = await fetch("http://localhost:8000/usuarios/1", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const user = await res.json();
		console.warn("getUser: ", user);
		return user;
	} catch (err: unknown) {
		console.warn(err);
		throw new Error("Falha ao tentar carregar usuário: ");
	}
}

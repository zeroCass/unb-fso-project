import { getToken } from "@/lib/getToken";

export async function fetchAluno(userID: number) {
	const token = await getToken();
	if (!token) throw new Error("Token inválido");

	try {
		const response = await fetch(`${process.env.DJANGO_API}/api/aluno/${userID}/`, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const user = await response.json();
		console.warn("getAluno: ", user);
		return user;
	} catch (err: unknown) {
		console.warn(err);
		throw new Error("Falha ao tentar carregar usuário: ");
	}
}

import { getToken } from "@/lib/getToken";
import { Aluno } from "@/types";

export async function fetchAlunos(): Promise<Aluno[]> {
	const token = await getToken();
	if (!token) throw new Error("Token inválido");

	try {
		const response = await fetch(`${process.env.DJANGO_API}/api/aluno/all/`, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});

		const alunos = await response.json();
		console.warn("getAlunos: ", alunos);
		return alunos;
	} catch (err: unknown) {
		console.warn(err);
		throw new Error("Falha ao tentar carregar usuário: ");
	}
}

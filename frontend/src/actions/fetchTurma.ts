import { getToken } from "@/lib/getToken";
import { Turma } from "@/types";
import { revalidatePath } from "next/cache";

export async function fetchTurma(turmaID: number | null | undefined): Promise<Turma | null> {
	const token = await getToken();
	if (!token) throw new Error("Token inválido");

	if (!turmaID) return null;

	const response = await fetch(`${process.env.DJANGO_API}/api/turma/${turmaID}/`, {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
		},
	});
	// ensure that is the lastest data
	revalidatePath("/turmas");

	if (!response.ok) {
		throw new Error("Erro ao buscar turmas");
	}

	const data = await response.json();
	return data;
}

import { revalidatePath } from "next/cache";
import { getToken } from "./getToken";

export async function getTurmas() {
	const token = await getToken();
	if (!token) throw new Error("Token inválido");

	const response = await fetch(`${process.env.DJANGO_API}/api/turma/all/`, {
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

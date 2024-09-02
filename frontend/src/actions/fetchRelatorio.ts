import { getToken } from "@/lib/getToken";
import { revalidatePath } from "next/cache";

export async function fetchRelatorio() {
	const token = await getToken();
	if (!token) throw new Error("Token inválido");

	try {
		const response = await fetch(`${process.env.DJANGO_API}/api/relatorio/`, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		revalidatePath("/relatorio-matricula");
		const relatorio = await response.json();
		return relatorio;
	} catch (err: unknown) {
		console.warn(err);
		throw new Error("Falha ao tentar carregar usuário: ");
	}
}

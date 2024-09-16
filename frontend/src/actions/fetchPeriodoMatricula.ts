import { getToken } from "@/lib/getToken";
import { PeriodoMatricula } from "@/types";
import { revalidatePath } from "next/cache";

export async function fetchPeriodoMatricula(): Promise<PeriodoMatricula | null> {
	const token = await getToken();
	if (!token) return null;

	try {
		const response = await fetch(`${process.env.DJANGO_API}/api/consultar-periodo-matricula/`, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		revalidatePath("/");
		const data = await response.json();
		return data.sucess ? data.data : null;
	} catch (err: unknown) {
		console.warn(err);
		throw new Error("Erro desconhecido");
	}
}

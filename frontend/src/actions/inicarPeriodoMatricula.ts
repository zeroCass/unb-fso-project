"use server";
import { getToken } from "@/lib/getToken";
import { APIGenericResponse, Turma } from "@/types";

type APIResponse = APIGenericResponse & {
	turmas: Turma[];
};

export default async function inciarPeriodoMatricula(): Promise<APIResponse> {
	const token = await getToken();

	const response = await fetch(`${process.env.DJANGO_API}/api/iniciar-periodo-matricula/`, {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return {
		sucess: data?.sucess ? true : false,
		error: data?.error ? true : false,
		message: data.message,
		turmas: data.turmas,
	};
}

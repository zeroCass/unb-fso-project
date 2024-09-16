"use server";
import { getToken } from "@/lib/getToken";
import { APIGenericResponse } from "@/types";

export default async function matricular(turmaID: number): Promise<APIGenericResponse> {
	const token = await getToken();

	const response = await fetch(`${process.env.DJANGO_API}/api/matricula/`, {
		method: "POST",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ turma: turmaID }),
	});
	const data = await response.json();
	console.warn("Matricula: ", data);

	// redirect("/");

	return {
		sucess: data?.sucess ? true : false,
		error: data?.error ? true : false,
		message: data.message,
	};
}

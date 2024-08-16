"use server";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";

export default async function matricular(turmaID: number) {
	const token = await getToken();

	const response = await fetch(`${process.env.DJANGO_API}/api/matricula/`, {
		method: "POST",
		headers: {
			Authorization: `Token ${token}`,
            "Content-Type": "application/json",
		},
        body: JSON.stringify({ turma: turmaID })
	});

	if (!response.ok) {
		throw new Error("Failed to authenticate");
	}
    console.warn('Matricula realizada com sucesso!')
	redirect("/");
}

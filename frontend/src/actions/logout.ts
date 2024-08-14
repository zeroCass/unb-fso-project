"use server";
import { deleteSession } from "@/lib/_session";
import { getToken } from "@/lib/getToken";
import { redirect } from "next/navigation";

export default async function logout() {
	const token = await getToken();

	const response = await fetch(`${process.env.DJANGO_API}/api/logout/`, {
		method: "GET",
		headers: {
			Authorization: `Token ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to authenticate");
	}

	await deleteSession();
	redirect("/login");
}

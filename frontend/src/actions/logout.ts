"use server";
import { deleteSession } from "@/lib/_session";

export default async function logout() {
	await deleteSession();
}

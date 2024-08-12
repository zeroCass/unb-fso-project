"use server";
import { logout } from "@/lib/_session";

export default async function logoutUser() {
	await logout();
}

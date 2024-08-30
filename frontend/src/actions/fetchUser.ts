import { setCookieUserInfo } from "@/lib/_session";
import { getToken } from "@/lib/getToken";
import { User } from "@/types";
import { revalidatePath } from "next/cache";

export async function fetchUser(): Promise<User | null> {
	const token = await getToken();
	if (!token) return null;
	console.log("token: ", token);

	try {
		const response = await fetch(`${process.env.DJANGO_API}/api/user/`, {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		});
		revalidatePath("/");

		const user: User = await response.json();
		await setCookieUserInfo({id: user.id, role: user.role})
		return user;
	} catch (err: unknown) {
		console.warn(err);
		throw new Error("Falha ao tentar carregar usuário: ");
	}
}

import type { Session } from "@/types";
import { User } from "@/types";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { decrypt } from "./_session";

// get the token from the api
export async function getUserFromCookies(cookie: RequestCookie): Promise<User | null> {
	const data = cookie.value;
	const decryptCookie: Session = await decrypt(data);
	return decryptCookie.user;
}

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// signJWT, jwtVerify

const secrectKey = "secret";
const key = new TextEncoder().encode(secrectKey);
async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10 sec from now")
		.sign(key);
}
async function decrypt(input: string) {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

const cookie = {
	name: "session",
	options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
	duration: 60 * 10 * 1000,
};
// passar token ou userID
export async function createSession(userData: any) {
	const expires = new Date(Date.now() + 10 * 10000);
	const session = await encrypt({ userData, expires });
	cookies().set(cookie.name, session, { expires, httpOnly: true, secure: true, path: "/" });
	console.warn("create session: ", session);
	// redirect();
}

export async function verifySession() {
	const session = cookies().get(cookie.name)?.value;
	if (!session) {
		redirect("/login");
	}
	return await decrypt(session);
}

export function deleteSession() {
	cookies().set("session", "", { maxAge: 0 });
	redirect("/login");
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

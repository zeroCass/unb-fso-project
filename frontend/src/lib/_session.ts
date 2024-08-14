import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./getToken";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("10 sec from now")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function login(state: {}, formData: FormData) {
	try {
		// Verify credentials && get the user
		const cpf = formData.get("cpf") ? formData.get("cpf") : "";
		const password = "123";
		const token = await getToken(cpf, password);

		// Create the session
		const expires = new Date(Date.now() + 10 * 1000);
		const session = await encrypt({ token, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });

		return {
			sucess: true,
			data: null,
			error: null,
		};
	} catch (error) {
		// throw new Error('Falha na Autenticacao')
		return {
			sucess: false,
			data: null,
			error,
		};
	}
}

export async function deleteSession() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return false;

	// Refresh the session so it doesn't expire
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 10 * 60 * 1000);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}

"use client";
// import Cookies from "js-cookie";
// import { useCookies } from "next-client-cookies";
import { createContext, useEffect, useState } from "react";
export type User = {
	name: string;
	cpf: string;
	role: string;
};

type IUserContext = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext({} as IUserContext);

export function UserContextProvider({
	children,
	session,
}: {
	children: React.ReactNode;
	session: { user: User; exp: number; expires: string; iat: number };
}) {
	const [user, setUser] = useState({} as User);
	useEffect(() => {
		if (session?.user) {
			setUser(session.user);
			console.warn("the user: ", user);
		}
	}, [user, session?.user]);
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

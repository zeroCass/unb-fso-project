"use client";
import type { IUserContext, User } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContext | null>(null);

export function UserContextProvider({
	children,
	session,
	user,
}: {
	children: React.ReactNode;
	user: User | null;
	session: { user: User; exp: number; expires: string; iat: number };
}) {
	const [userState, setUser] = useState<User | null>(user);
	useEffect(() => {
		console.warn("user: ", userState);
	});
	return <UserContext.Provider value={{ user: userState, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
	return useContext(UserContext);
}

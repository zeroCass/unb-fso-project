"use client";
import type { IUserContext, User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContext | null>(null);

export function UserContextProvider({ children, user }: { children: React.ReactNode; user: User | null }) {
	const [userState, setUser] = useState<User | null>(user);
	// Effect to update userState whenever the user prop changes
	useEffect(() => {
		setUser(user);
	}, [user]);

	return <UserContext.Provider value={{ user: userState, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser deve ter usado dentro de UserContextProvider");
	}
	return context;
}

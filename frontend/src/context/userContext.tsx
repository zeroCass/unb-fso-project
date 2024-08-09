"use client";

import { createContext } from "react";

type IUserContext = {
	user: any;
};

export const UserContext = createContext({} as IUserContext);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
	return <UserContext.Provider value={{ user: "Jao das Neves" }}>{children}</UserContext.Provider>;
}

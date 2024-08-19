import { fetchUser } from "@/actions/fetchUser";
import { UserContextProvider } from "@/context/userContext";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import "./globals.css";

export const metadata: Metadata = {
	title: "FSO Project",
	description: "Projeto da disciplina FSO da Universidade de Brasília (Unb)",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await fetchUser();

	return (
		<CookiesProvider>
			<html lang="pt-BR">
				<body>
					<UserContextProvider user={user}>{children}</UserContextProvider>
				</body>
			</html>
		</CookiesProvider>
	);
}

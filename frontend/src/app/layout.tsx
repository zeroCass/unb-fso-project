import { UserContextProvider } from "@/context/userContext";
import { getSession } from "@/lib/_session";
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
	const session = await getSession();

	return (
		<CookiesProvider>
			<html lang="pt-BR">
				<body>
					<UserContextProvider session={session}>{children}</UserContextProvider>
				</body>
			</html>
		</CookiesProvider>
	);
}

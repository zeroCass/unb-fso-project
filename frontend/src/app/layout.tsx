import { UserContextProvider } from "@/context/userContext";
import { getSession } from "@/lib/_session";
import { getUser } from "@/lib/getUser";
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
	const user = await getUser();

	return (
		<CookiesProvider>
			<html lang="pt-BR">
				<body>
					<UserContextProvider user={user} session={session}>
						{children}
					</UserContextProvider>
				</body>
			</html>
		</CookiesProvider>
	);
}

import { UserContextProvider } from "@/context/userContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "FSO Project",
	description: "Projeto da disciplina FSO da Universidade de Brasília (Unb)",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<body>
				<UserContextProvider>{children}</UserContextProvider>
			</body>
		</html>
	);
}

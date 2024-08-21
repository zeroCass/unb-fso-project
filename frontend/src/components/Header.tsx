"use client";
import logout from "@/actions/logout";
import { useUser } from "@/context/userContext";
import Link from "next/link";

export default function Header() {
	const { user } = useUser();

	const handleClick = async () => {
		await logout();
	};

	return (
		<header>
			<div
				style={{
					width: "100%",
					backgroundColor: "#ccc",
					display: "flex",
					position: "relative",
					height: "50px",
					justifyContent: "space-between",
				}}
			>
				<div>
					<nav style={{ display: "flex", gap: "15px" }}>
						<Link style={{ textDecoration: "none", color: "#a8f", fontSize: "20px" }} href="/">
							Home
						</Link>
						{user?.role === "ADMIN" && (
							<>
								<Link style={{ textDecoration: "none", color: "#a8f", fontSize: "20px" }} href="/turmas">
									Turmas
								</Link>
								<Link style={{ textDecoration: "none", color: "#a8f", fontSize: "20px" }} href="matricula/turnos">
									Turnos
								</Link>
							</>
						)}
					</nav>
				</div>
				<button style={{ position: "absolute", right: 0 }} onClick={handleClick}>
					Logout
				</button>
			</div>
		</header>
	);
}

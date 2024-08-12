"use client";
import logout from "@/actions/logout";
import { UserContext } from "@/context/userContext";
import Cookies from "js-cookie";
import { useContext } from "react";

export default function Header() {
	const { user } = useContext(UserContext);
	const session = Cookies.get("session");
	console.warn("session header: ", session);

	const handleClick = async () => {
		await logout();
	};

	return (
		<header>
			<div style={{ width: "100%" }}>
				<h2>{user.name}</h2>
				<button onClick={handleClick}>Logout</button>
			</div>
		</header>
	);
}

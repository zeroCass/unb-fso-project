"use client";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function Page() {
	const { user } = useContext(UserContext);
	return (
		<section>
			<h1>{user.name}</h1>
		</section>
	);
}

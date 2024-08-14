"use client";

import { useUser } from "@/context/userContext";

export default function Home() {
	const userContext = useUser();

	return (
		<section>
			<div>
				<h5>Nome: {userContext?.user?.nome}</h5>
				<h6>{userContext?.user?.role}</h6>
			</div>
		</section>
	);
}

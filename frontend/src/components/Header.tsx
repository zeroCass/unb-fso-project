"use client";
import { logout } from "@/actions/auth";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();

	const handleClick = async () => {
		logout();
		router.push("/login");
	};

	return (
		<header>
			<div style={{ width: "100%" }}>
				<button onClick={handleClick}>Logout</button>
			</div>
		</header>
	);
}

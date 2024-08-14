"use client";

import login from "@/actions/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function LoginForm() {
	const router = useRouter();
	const [state, action] = useFormState(login, {
		sucess: false,
		data: null,
		error: null,
	});

	useEffect(() => {
		if (state.sucess) {
			console.warn("estado com sucesso, redirecionando");
			window.location.href = "/";
			// router.push("/");
		}
	}, [state.sucess, router]);

	return (
		<section>
			<h1>Login</h1>
			<form action={action}>
				<input type="text" name="cpf" placeholder="cpf" required />
				<input type="password" name="password" placeholder="senha" required />
				<button>Entrar</button>
			</form>
		</section>
	);
}

"use client";

import login from "@/actions/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function LoginForm() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
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
				{showPassword && <input type="password" name="password" placeholder="senha" required />}
				{!showPassword ? (
					<button onClick={() => setShowPassword(true)}>Sou administrador</button>
				) : (
					<button onClick={() => setShowPassword(false)}>Sou aluno</button>
				)}

				<button>Entrar</button>
			</form>
		</section>
	);
}

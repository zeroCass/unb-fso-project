"use client";

import { login } from "@/actions/login";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function LoginForm() {
	const { setUser } = useContext(UserContext);
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [state, action] = useFormState(login, {
		sucess: false,
		data: null,
		error: null,
	});

	useEffect(() => {
		if (state.sucess && state.data) {
			setUser(state.data);
			console.warn("estado com sucesso, redirecionando");
			router.push("/");
		}
	}, [state.sucess, state.data, router, setUser]);

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

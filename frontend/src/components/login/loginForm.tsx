"use client";

import login from "@/actions/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { TextField, Button, Box } from "@mui/material";
import styles from "./loginForm.module.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";

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
		<section className={styles.backgroundBox}>
			<Box className={styles.styledBox}>
				<LockOpenIcon fontSize="large" color="primary" />

				<Box className={styles.boxItems}>
					<form action={action}>
						<TextField
							fullWidth
							name="cpf"
							label="CPF"
							type="cpf"
							placeholder="CPF"
							margin="normal"
							variant="outlined"
							required
						/>

						<TextField
							fullWidth
							name="password"
							label="Password"
							type="password"
							placeholder="Password"
							margin="normal"
							variant="outlined"
							required
						/>

						<Box mt={2}>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								type="submit"
							>
								Entrar
							</Button>
						</Box>
					</form>
				</Box>
			</Box>
		</section>
	);
}

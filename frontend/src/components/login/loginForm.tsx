"use client";

import login from "@/actions/login";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box, Button, TextField } from "@mui/material";
import CpfInput from "../cadastro-aluno/CpfInput";
import styles from "./loginForm.module.css";

export default function LoginForm() {
	const [cpf, setCpf] = useState("");
	const router = useRouter();
	const [state, action] = useFormState(login, {
		sucess: false,
		error: false,
		message: "",
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
			<div className={styles.styledBox}>
				<LockOpenIcon fontSize="large" color="primary" />

				<div className={styles.boxItems}>
					<form action={action}>
						<CpfInput value={cpf} onChange={setCpf}>
							<TextField
								fullWidth
								name="cpf"
								label="CPF"
								type="cpf"
								placeholder="000.000.000/00"
								margin="normal"
								variant="outlined"
								required
							/>
						</CpfInput>

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
							<Button fullWidth variant="contained" color="primary" type="submit">
								Entrar
							</Button>
						</Box>
						{state.error && <span style={{ color: "#ff0000" }}>ERROR: {state.message}</span>}
					</form>
				</div>
			</div>
		</section>
	);
}

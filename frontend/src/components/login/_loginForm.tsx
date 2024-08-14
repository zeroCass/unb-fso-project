import { getSession, login } from "@/lib/_session";
import { redirect } from "next/navigation";
import { TextField, Button, Box } from "@mui/material";
import styles from "./loginForm.module.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export default async function LoginForm() {
	const session = await getSession();
	return (
		<section className={styles.backgroundBox}>
			<Box className={styles.styledBox}>
				<LockOpenIcon fontSize="large" color="primary" />

				<Box className={styles.boxItems}>
					<form
						action={async (formData) => {
							"use server";
							await login(formData);
							redirect("/");
						}}
					>
						<TextField
							fullWidth
							label="CPF"
							type="cpf"
							placeholder="CPF"
							margin="normal"
							variant="outlined"
						/>

						<TextField
							fullWidth
							label="Password"
							type="password"
							placeholder="Password"
							margin="normal"
							variant="outlined"
							className={styles.admPassword}
						/>

						<Box mt={2}>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								type="submit"
							>
								Login
							</Button>
						</Box>
					</form>
				</Box>
				<Button className={styles.admlogin} variant="text">
					logar como administrador
				</Button>
			</Box>
		</section>
	);
}

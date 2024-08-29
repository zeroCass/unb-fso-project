"use client";

import { useUser } from "@/context/userContext";
import { Turma, User } from "@/types";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";

type UserRole = {
	role: "ADMIN" | "ALUNO";
};

function CustomButton({ role }: UserRole) {
	const router = useRouter();
	return (
		<>
			{role === "ALUNO" ? (
				<button onClick={() => router.push("/matricula/turnos")} className={styles.button_styled}>
					Clique Aqui
				</button>
			) : (
				<button>PLACE HOLDER</button>
			)}
		</>
	);
}

const AlunoContent = ({ user, turma }: { user: User; turma: Turma | null }) => {
	const isMatriculado = Boolean(turma);

	return (
		<>
			<Box>
				<Typography className={styles.title} sx={{ marginTop: "5rem", marginLeft: "2rem" }}>
					Olá, <br /> {user?.nome}.
				</Typography>

				<Typography className={styles.base_text} sx={{ marginLeft: "2rem" }}>
					{!isMatriculado ? "Você não está matriculado ainda." : "Você está matriculado na trilha"}
				</Typography>

				{!isMatriculado ? (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: "15%",
						}}
					>
						<CustomButton role={user.role} />
						<Typography className={styles.base_text} sx={{ marginTop: "-1.5rem" }}>
							para se matricular
						</Typography>
					</Box>
				) : (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<p className={styles.styled_text}>{turma?.trilha}</p>
						<Box className={styles.base_text} sx={{ marginTop: "15%" }}>
							<p>Turma: {turma?.nome}</p>
							<p>Turno: {turma?.turno}</p>
						</Box>
					</Box>
				)}
			</Box>

			<Box sx={{ justifyContent: "center", marginTop: "8.5rem" }}>
				<Image src="/images/undraw_Studying.svg" alt="Estudando" width={600} height={600} />
			</Box>
		</>
	);
};

const AdminContent = ({ user }: any) => {
	return (
		<>
			<Box>
				<Typography className={styles.title} sx={{ marginTop: "5rem", marginLeft: "2rem" }}>
					Olá ADM <br /> {user?.nome}.
				</Typography>
				<CustomButton role={user.role} />
			</Box>
		</>
	);
};

export default function Home({ turma }: { turma: Turma | null }) {
	const { user } = useUser();

	return (
		<Container
			maxWidth={false}
			sx={{
				display: "flex",
				justifyContent: "space-around",
				width: "100%",
				height: "100%",
			}}
		>
			{user?.role === "ALUNO" && <AlunoContent user={user} turma={turma} />}
			{user?.role === "ADMIN" && <AdminContent user={user} />}
		</Container>
	);
}

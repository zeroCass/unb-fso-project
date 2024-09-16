"use client";

import inciarPeriodoMatricula from "@/actions/inicarPeriodoMatricula";
import { usePeriodoMatricula } from "@/context/PeriodoMatriculaContext";
import { useUser } from "@/context/userContext";
import { Aluno, Turma, User } from "@/types";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./home.module.css";

type UserRole = {
	role: "ADMIN" | "ALUNO";
};

function formatDate(date: Date) {
	return String(date);
}

function CustomButton({ role }: UserRole) {
	const router = useRouter();

	const getPeriodoMatricula = async () => {
		await inciarPeriodoMatricula();
		window.location.href = "/";
	};

	const getTurnos = () => {
		router.push("/matricula/turnos");
	};

	return (
		<>
			{role === "ALUNO" ? (
				<button onClick={() => getTurnos()} className={styles.button_styled}>
					Clique Aqui
				</button>
			) : (
				<button onClick={getPeriodoMatricula} className={styles.button_styled}>
					Clique Aqui
				</button>
			)}
		</>
	);
}

const HomeImage = () => {
	return (
		<Box sx={{ justifyContent: "center", marginTop: "8.5rem" }}>
			<Image src="/images/undraw_studying.svg" alt="Estudando" width={600} height={600} />
		</Box>
	);
};

const AlunoContent = ({ user, turma }: { user: User; turma: Turma | null }) => {
	const isMatriculado = Boolean(turma);
	const { periodo } = usePeriodoMatricula();

	console.log("perioso de matricula: ", periodo);

	return (
		<Box>
			<Typography className={styles.title} sx={{ marginTop: "5rem", marginLeft: "2rem" }}>
				Olá, <br /> {user?.nome}.
			</Typography>

			<Typography className={styles.base_text} sx={{ marginLeft: "2rem" }}>
				{!isMatriculado ? "Você não está matriculado ainda." : "Você está matriculado na trilha"}
			</Typography>

			{!isMatriculado && periodo?.status === "EM_ANDAMENTO" && (
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
			)}

			{!isMatriculado && (!periodo || periodo.status === "FINALIZADO") && (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginTop: "15%",
					}}
				>
					<Typography className={styles.base_text} sx={{ marginTop: "-1.5rem" }}>
						Não estamos no período de matrícula
					</Typography>
				</Box>
			)}
			{isMatriculado && (
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
	);
};

const AdminContent = ({ user, alunos }: { user: User | null; alunos: Aluno[] | null }) => {
	const totalAlunos = alunos?.length || 0;
	const totalAlunosMatriculados = alunos?.reduce((count, aluno) => (aluno.turma ? count + 1 : count), 0);
	const { periodo } = usePeriodoMatricula();
	const dateFormatted = periodo ? formatDate(periodo.fim) : "";

	return (
		<Box>
			<Typography className={styles.title} sx={{ marginTop: "5rem", marginLeft: "2rem" }}>
				Olá ADM <br /> {user?.nome}.
			</Typography>

			{periodo?.status === "EM_ANDAMENTO" ? (
				<Typography className={styles.styled_text} sx={{ marginLeft: "2rem", marginTop: "2rem" }}>
					Periodo de matricula em andamento. Término:
					{dateFormatted}
				</Typography>
			) : (
				<>
					<Typography className={styles.styled_text} sx={{ marginLeft: "2rem", marginTop: "2rem" }}>
						Fora do período de matrícula.
					</Typography>
					<CustomButton role={"ADMIN"} />
					<Typography className={styles.base_text} sx={{ marginTop: "-1.5rem" }}>
						para inciar o período de matrícula
					</Typography>
				</>
			)}

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box className={styles.base_text} sx={{ marginTop: "10%" }}>
					<p>Total de alunos cadastrados: {totalAlunos}</p>
					<p>Total de alunos matriculados: {totalAlunosMatriculados}</p>
				</Box>
			</Box>
		</Box>
	);
};

export default function Home({ turma, alunos }: { turma: Turma | null; alunos: Aluno[] | null }) {
	const { user } = useUser();

	return (
		<Container
			maxWidth={false}
			sx={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
			}}
		>
			<>
				<Box
					sx={{
						flexGrow: 1,
						width: "60%",
					}}
				>
					{user?.role === "ALUNO" && <AlunoContent user={user} turma={turma} />}
					{user?.role === "ADMIN" && <AdminContent user={user} alunos={alunos} />}
				</Box>

				<Box
					sx={{
						width: "40%",
						paddingLeft: 2,
					}}
				>
					<HomeImage />
				</Box>
			</>
		</Container>
	);
}

"use client";
import { useUser } from "@/context/userContext";
import { Turma } from "@/types";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

// fazer esta pagina ser server component com async (remover links)
export default function EscolhaTurno({ turmas }: { turmas: Turma[] }) {
	const { user } = useUser();
	// const router = useRouter();

	const [turmasMatutino, setTurmasMatutino] = useState<Turma[]>([]);
	const [turmasVespertino, setTurmasVespertino] = useState<Turma[]>([]);
	const [totalVagasMat, setTotalVagasMat] = useState<number>(0);
	const [totalVagasVes, setTotalVagasVes] = useState<number>(0);

	const calculateTotalVagas = (turmas: Turma[], turno: "MAT" | "VES") => {
		let totalVagas = 0;
		turmas.forEach((turma) => (totalVagas += turma.capacidadeAtual));
		if (turno === "MAT") {
			setTotalVagasMat(totalVagas);
		} else {
			setTotalVagasVes(totalVagas);
		}
	};

	useEffect(() => {
		const matutino: Turma[] = [];
		const vespertino: Turma[] = [];

		turmas.forEach((turma) => {
			if (turma.turno === "MAT") {
				matutino.push(turma);
			} else {
				vespertino.push(turma);
			}
		});

		setTurmasMatutino(matutino);
		setTurmasVespertino(vespertino);

		calculateTotalVagas(matutino, "MAT");
		calculateTotalVagas(vespertino, "VES");
	}, [turmas]);

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper elevation={4}>
						<Box display={"flex"} flexDirection={"column"} bgcolor={"burlywood"}>
							{/*  */}
							<Typography variant="h2">Matutino</Typography>
							<Typography>Total de vagas: {totalVagasMat}</Typography>
							{turmasMatutino.map((turma: Turma) => {
								return (
									<Typography key={turma.id}>
										Trila {turma.trilha} - vagas: {turma.capacidadeAtual}
									</Typography>
								);
							})}
							{user?.role === "ALUNO" && (
								<Link
									href={{
										pathname: "/matricula/turmas",
										query: { turno: "MAT" },
									}}
								>
									Escolher
								</Link>
							)}
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={4}>
						<Box display={"flex"} flexDirection={"column"} bgcolor={"blueviolet"}>
							<Typography variant="h2">Vespertino</Typography>
							<Typography>Total de vagas: {totalVagasVes}</Typography>
							{turmasVespertino.map((turma: Turma) => {
								return (
									<Typography key={turma.id}>
										Trila {turma.trilha} - vagas: {turma.capacidadeAtual}
									</Typography>
								);
							})}
							{user?.role === "ALUNO" && (
								<Link
									href={{
										pathname: "/matricula/turmas",
										query: { turno: "VES" },
									}}
								>
									Escolher
								</Link>
							)}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

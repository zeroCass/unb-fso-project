"use client";
import { ReservaTurno } from "@/actions/reservaTurno";
import { useUser } from "@/context/userContext";
import { Turma } from "@/types";
import { useRouter } from "next/navigation"; // Importa o hook useRouter

import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const TURNOS = {
	MAT: "Matutino",
	VES: "Vespertino",
};

const calculateTotalVagas = (turmas: Turma[]) =>
	turmas.reduce((total, turma) => total + turma.capacidadeAtual, 0);

const TurnoCard = ({
	turno,
	totalVagas,
	turmas,
	user,
	turnoKey,
}: {
	turno: string;
	totalVagas: number;
	turmas: Turma[];
	user: any;
	turnoKey: string;
}) => {
	const isAluno = user?.role === "ALUNO";
	const router = useRouter(); // Obtém a função de roteamento
	const handleClick = async () => {
		const response = await ReservaTurno(turnoKey);
		console.log(response.message);
		if (response.error) {
			alert(`Erro: ${response.message}`);
		}

		console.log(response.success, response.error);

		if (response.success) {
			console.log("sucesso: ", response.turno, turnoKey);
			if (response.turno === turnoKey || !response.turno)
				router.push(`/matricula/turmas?turno=${turnoKey}`);
			// Redireciona para a URL desejada
			else alert(`Erro: Você possui reserva para o outro turno`);
		}
	};
	return (
		<Card
			elevation={5}
			sx={{
				width: 300,
				margin: 2,
				padding: 2,
				maxHeight: 500,
				minHeight: 300,
				maxWidth: 345,
				display: "flex",
				flexDirection: "column",
				borderRadius: 5,
				backgroundColor: "var(--background-div)",
			}}
		>
			<CardContent sx={{ flexGrow: 1 }}>
				<Typography
					variant="h4"
					align="center"
					textTransform="uppercase"
					lineHeight="1rem"
					gutterBottom
					sx={{ fontFamily: "var(--font-title)" }}
				>
					{turno}
				</Typography>
				<Typography variant="subtitle1" align="center" gutterBottom>
					Total de vagas disponíveis: {totalVagas}
				</Typography>
				<Box sx={{ overflowY: "auto", maxHeight: 400 }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell
									align="center"
									sx={{
										fontWeight: "bold",
										color: "var(--primary-dark)",
										backgroundColor: "var(--background-div)",
									}}
								>
									TRILHA
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{turmas.map(({ id, trilha, capacidadeAtual }) => (
								<TableRow key={id}>
									<TableCell align="center">{trilha}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</CardContent>

			{isAluno && (
				<Button
					variant="contained"
					color="primary"
					fullWidth
					sx={{
						marginTop: 2,
						borderRadius: "20px",
						backgroundColor: "var(--primary-dark)",
					}}
					onClick={handleClick} // Agora chama a função do servidor
				>
					Escolher
				</Button>
			)}
		</Card>
	);
};

// fazer esta pagina ser server component com async (remover links)
export default function EscolhaTurno({ turmas }: { turmas: Turma[] }) {
	const { user } = useUser();

	const [turmasMatutino, setTurmasMatutino] = useState<Turma[]>([]);
	const [turmasVespertino, setTurmasVespertino] = useState<Turma[]>([]);

	useEffect(() => {
		const matutino = turmas.filter((turma) => turma.turno === "MAT");
		const vespertino = turmas.filter((turma) => turma.turno !== "MAT");

		setTurmasMatutino(matutino);
		setTurmasVespertino(vespertino);
	}, [turmas]);

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="center"
			spacing={4}
			style={{ height: "100vh" }}
		>
			<Grid item>
				<TurnoCard
					turno={TURNOS.MAT}
					totalVagas={calculateTotalVagas(turmasMatutino)}
					turmas={turmasMatutino}
					user={user}
					turnoKey="MAT"
				/>
			</Grid>
			<Grid item>
				<TurnoCard
					turno={TURNOS.VES}
					totalVagas={calculateTotalVagas(turmasVespertino)}
					turmas={turmasVespertino}
					user={user}
					turnoKey="VES"
				/>
			</Grid>
		</Grid>
	);
}

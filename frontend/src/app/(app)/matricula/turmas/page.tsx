import { fetchTurmas } from "@/actions/fetchTurmas";
import TurmaItem from "@/components/TurmaItem";
import type { Turma } from "@/types";
import { Container, Grid } from "@mui/material";

type turnoType = "MAT" | "VES" | "ALL";

export default async function Page({ searchParams }: { searchParams: { turno: "MAT" | "VES" } }) {
	// const turmas: Turma[] | null = await fetchTurmas();
	const turmas: Turma[] = await fetchTurmas();
	const turno: turnoType = searchParams.turno ? searchParams.turno : "ALL";
	const turmasByTurno = turno === "ALL" ? turmas : turmas.filter((turma) => turma.turno === turno);

	return (
		<Container>
			<h1>Turmas - {turno}</h1>
			<Grid container spacing={2}>
				{turmasByTurno &&
					turmasByTurno.map((turma: Turma) => {
						return (
							<Grid item lg={6} sm={12} key={turma.id}>
								<TurmaItem turma={turma} />
							</Grid>
						);
					})}
			</Grid>
		</Container>
	);
}

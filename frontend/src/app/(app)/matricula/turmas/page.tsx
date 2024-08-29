import { fetchTurmas } from "@/actions/fetchTurmas";
import TurmaHeader from "@/components/turmas/TurmaHeader";
import TurmaItem from "@/components/turmas/TurmaItem";
import type { Turma } from "@/types";
import { Box, Container, Grid } from "@mui/material";

type turnoType = "MAT" | "VES" | "ALL";

export default async function Page({ searchParams }: { searchParams: { turno: "MAT" | "VES" } }) {
	// const turmas: Turma[] | null = await fetchTurmas();
	const turmas: Turma[] = await fetchTurmas();
	const turno: turnoType = searchParams.turno ? searchParams.turno : "ALL";
	const turmasByTurno = turno === "ALL" ? turmas : turmas.filter((turma) => turma.turno === turno);

	return (
		<Container maxWidth={false} >
			<Box>
        		<TurmaHeader turno={turno} />
     		</Box>
			 <Box sx={{ flexGrow: 1, marginTop: 2 }}> 
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
			</Box>
		</Container>
	);
}

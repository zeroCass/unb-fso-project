"use client";
import { useUser } from "@/context/userContext";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
// fazer esta pagina ser server component com async (remover links)
export default function Page() {
	const { user } = useUser();
	const router = useRouter();
	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper elevation={4}>
						<Box display={"flex"} flexDirection={"column"} bgcolor={"burlywood"}>
							{/*  */}
							<Typography variant="h2">Matutino</Typography>
							<Typography>Total de vagas: x</Typography>
							<Typography>Trila 1 - vagas: x</Typography>
							<Typography>Trila 2 - vagas: x</Typography>
							<Typography>Trila 3 - vagas: x</Typography>
							<Typography>Trila 4 - vagas: x</Typography>
							{user?.role === "ALUNO" && <button onClick={() => router.push("/turmas")}>Escolher</button>}
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={4}>
						<Box display={"flex"} flexDirection={"column"} bgcolor={"blueviolet"}>
							<Typography variant="h2">Vespertino</Typography>
							<Typography>Total de vagas: x</Typography>
							<Typography>Trila 1 - vagas: x</Typography>
							<Typography>Trila 2 - vagas: x</Typography>
							<Typography>Trila 3 - vagas: x</Typography>
							<Typography>Trila 4 - vagas: x</Typography>
							{user?.role === "ALUNO" && <button onClick={() => router.push("/turmas")}>Escolher</button>}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

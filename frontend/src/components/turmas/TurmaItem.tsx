"use client";

import matricular from "@/actions/matricular";
import { Turma } from "@/types";
import { Box, Button, Paper, Typography } from "@mui/material";

export default function TurmaItem({ turma }: { turma: Turma }) {
	const reazliarMatricular = async () => {
		await matricular(turma.id);
	};

	return (
		<Paper
			elevation={16}
			sx={{
				width: "500px",
				height: "250px",
			}}
		>
			<Box bgcolor="#165DBD" color="#fff" display="flex" flexDirection="column" height="100%">
				<Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
					<Typography>{turma.trilha}</Typography>
					<Typography>Descrção da trilha</Typography>
				</Box>
				<Box display="flex" justifyContent="space-between">
					<Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="50%">
						<Typography variant="h3" fontSize={26}>
							Turma
						</Typography>
						<Typography>{turma.nome}</Typography>
					</Box>
					<Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" width="50%">
						<Typography variant="h3" px="20px">
							Vagas
						</Typography>
						<Typography>{turma.capacidadeAtual}</Typography>
					</Box>
				</Box>
				<Box>
					<Button sx={{ color: "#fff" }} onClick={() => reazliarMatricular()}>
						Escolher
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}

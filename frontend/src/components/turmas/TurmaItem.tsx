"use client";

import { Turma } from "@/types";
import { Box, Paper, Typography } from "@mui/material";
import styles from "./TurmaItem.module.css";

export default function TurmaItem({
	turma,
	selected,
	disabled,
	onSelect,
}: {
	turma: Turma;
	selected: boolean;
	disabled: boolean;
	onSelect: () => void;
}) {
	return (
		<Paper
			elevation={selected ? 16 : 4}
			className={`${styles.turmaItem} ${selected ? styles.selected : ""} ${
				disabled ? styles.disabled : ""
			}`}
			onClick={!disabled ? onSelect : undefined}
			sx={{ flexGrow: 1, height: "100%" }}
		>
			<Box
				display="flex"
				flexDirection="column"
				height="100%"
				justifyContent="space-around"
			>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
				>
					<Typography variant="h6">{turma.trilha}</Typography>
					<Typography variant="body2">Descrição da trilha</Typography>
				</Box>
				<Box display="flex">
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
						width="50%"
					>
						<Typography variant="h5">Turma</Typography>
						<Typography variant="subtitle1">{turma.nome}</Typography>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
						width="50%"
					>
						<Typography variant="h5">Vagas</Typography>
						<Typography variant="subtitle1">{turma.capacidadeAtual}</Typography>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}

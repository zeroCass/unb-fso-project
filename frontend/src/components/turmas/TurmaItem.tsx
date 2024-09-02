"use client";

import { TrilhaTurma, Turma } from "@/types";
import { Box, Paper, Typography } from "@mui/material";
import styles from "./turmaItem.module.css";

const TrilhaInfo = ({ trilha }: { trilha: TrilhaTurma }) => {
	const getTrilhaDescricao = (trilha: TrilhaTurma): string => {
		const descricoes: Record<TrilhaTurma, string> = {
			[TrilhaTurma.ENEGRESER]:
				"Enfoque social voltado para a comunidade negra e suas questões.",
			[TrilhaTurma.DNMEV]:
				"Tratando de finanças pessoais e a importância de gerir bem o dinheiro.",
			[TrilhaTurma.AMN]:
				"Explorando as tecnologias digitais e seu impacto no mundo atual.",
			[TrilhaTurma.AGRO]:
				"Focado em práticas de agroecologia e sustentabilidade no campo.",
		};
		return descricoes[trilha] || "Descrição não disponível.";
	};

	const getTrilhaTitulo = (trilha: TrilhaTurma): string => {
		const titulos: Record<TrilhaTurma, string> = {
			[TrilhaTurma.ENEGRESER]: "ENEGRE-SER",
			[TrilhaTurma.DNMEV]: "DINHEIRO NA MÃO É VENDAVAL",
			[TrilhaTurma.AMN]: "ADMIRÁVEL MUNDO NOVO",
			[TrilhaTurma.AGRO]: "AGROECOLOGIA",
		};
		return titulos[trilha] || "Título não disponível.";
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			margin="25px"
			textAlign="center"
		>
			<Typography variant="h5">{getTrilhaTitulo(trilha)}</Typography>
			<Typography variant="subtitle1">{getTrilhaDescricao(trilha)}</Typography>
		</Box>
	);
};

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
				<TrilhaInfo trilha={turma.trilha} />
				<Box display="flex">
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
						width="50%"
					>
						<Typography variant="h5">Turma</Typography>
						<Typography variant="h3">{turma.nome}</Typography>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						flexDirection="column"
						width="50%"
					>
						<Typography variant="h5">Vagas</Typography>
						<Typography variant="h3">{turma.capacidadeAtual}</Typography>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
}

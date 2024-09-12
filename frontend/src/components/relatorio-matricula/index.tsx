"use client";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
	Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./relatorio.module.css";
import { Relatorio } from "@/types";

export default function RelatorioMatricula({
	relatorio,
}: {
	relatorio: Relatorio[];
}) {
	return (
		<Container>
			<Typography
				variant="h5"
				align="center"
				p={2}
				sx={{ fontFamily: "var(--fontTitle)" }}
				gutterBottom
			>
				Relatório de Matrícula
			</Typography>

			{relatorio.map((rel: Relatorio) => (
				<Accordion key={rel.id} className={styles.accordion}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
						aria-controls={`panel${rel.id}-content`}
						id={`panel${rel.id}-header`}
						className={styles.accordionSummary}
					>
						<Box sx={{ flexGrow: 1 }}>
							<Typography
								variant="h5"
								style={{ fontWeight: "bold", paddingTop: "15px" }}
							>
								Turma {rel.nome}
							</Typography>
						</Box>

						<Box sx={{ flexGrow: 1 }} className={styles.accordionBox}>
							<Typography variant="h6" style={{ fontWeight: "bold" }}>
								Trilha
							</Typography>
							<Typography variant="h6">{rel.trilha}</Typography>{" "}
						</Box>

						<Box sx={{ flexGrow: 1 }}>
							<Typography variant="h6" style={{ fontWeight: "bold" }}>
								Vagas
							</Typography>
							<Typography variant="h6">
								{rel.capacidadeAtual}/{rel.capacidadeMaxima}
							</Typography>
						</Box>

						<Box sx={{ flexGrow: 1 }}>
							<Typography variant="h6" style={{ fontWeight: "bold" }}>
								Turno
							</Typography>
							<Typography variant="h6">{rel.turno}</Typography>
						</Box>
					</AccordionSummary>

					<AccordionDetails className={styles.accordionDetails}>
						{rel.alunos.length > 0 ? (
							<TableContainer
								component={Paper}
								style={{ backgroundColor: "#fff", border: "none" }}
							>
								<Table>
									<TableHead>
										<TableRow style={{ backgroundColor: "#f5f5f5" }}>
											<TableCell
												className={`${styles.tableCell} ${styles.borderRight}`}
											>
												Nome
											</TableCell>
											<TableCell className={styles.tableCell}>CPF</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rel.alunos.map((aluno) => (
											<TableRow key={aluno.cpf}>
												<TableCell className={styles.borderRight}>
													{aluno.nome}
												</TableCell>
												<TableCell>{aluno.cpf}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							<Typography style={{ padding: "10px 0" }}>
								Sem Alunos Matriculados
							</Typography>
						)}
					</AccordionDetails>
				</Accordion>
			))}
		</Container>
	);
}

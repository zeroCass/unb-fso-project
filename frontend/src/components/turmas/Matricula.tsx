"use client";

import matricular from "@/actions/matricular";
import { Turma } from "@/types";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TurmaHeader from "./TurmaHeader";
import TurmaItem from "./TurmaItem";

type turnoType = "MAT" | "VES" | "ALL";

function FooterButtons({ selectedTurmaId }: { selectedTurmaId: number | null }) {
	const router = useRouter();

	const handleSave = async () => {
		if (selectedTurmaId !== null) {
			const response = await matricular(selectedTurmaId);
			alert(`${response.error ? "Erro:" : "Sucesso:"}: ${response.message}`);
			router.push("/");
		}
	};

	return (
		<Box display="flex" justifyContent="center" gap={2} mt={10}>
			<Button variant="outlined" color="primary" onClick={() => router.push("/matricula/turnos")}>
				Voltar
			</Button>
			<Button variant="contained" color="primary" onClick={handleSave} disabled={selectedTurmaId === null}>
				Salvar
			</Button>
		</Box>
	);
}

export default function Matricula({ turno, turmas }: { turno: turnoType; turmas: Turma[] }) {
	const [selectedTurmaId, setSelectedTurmaId] = useState<number | null>(null);

	const turmasByTurno = turno === "ALL" ? turmas : turmas.filter((turma) => turma.turno === turno);

	const handleSelect = (id: number) => {
		setSelectedTurmaId(id);
	};

	return (
		<Container maxWidth={false} sx={{ width: "100%" }}>
			<Box mb={2}>
				<TurmaHeader turno={turno} />
			</Box>
			<Box
				display="grid"
				gridTemplateColumns={{
					xs: "1fr",
					sm: "1fr 1fr",
					md: "repeat(2, 1fr)",
				}}
				gap={2}
				alignItems="stretch"
			>
				{turmasByTurno.map((turma: Turma) => {
					const isSelected = selectedTurmaId === turma.id;
					const isDisabled = turma.capacidadeAtual === 0;

					return (
						<Box
							key={turma.id}
							p={1}
							sx={{
								minHeight: { xs: "200px", md: "300px" },
								display: "flex",
								flexDirection: "column",
							}}
						>
							<TurmaItem
								selected={isSelected}
								disabled={isDisabled}
								turma={turma}
								onSelect={() => handleSelect(turma.id)}
							/>
						</Box>
					);
				})}
			</Box>
			<FooterButtons selectedTurmaId={selectedTurmaId} />
		</Container>
	);
}

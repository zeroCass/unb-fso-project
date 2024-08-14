import { getTurmas } from "@/lib/getTurmas";
import type { Turma } from "@/types";

export default async function Page() {
	const turmas: Turma[] | null = await getTurmas();
	return (
		<section>
			<h1>Turmas</h1>
			{turmas &&
				turmas.map((turma: Turma) => {
					return (
						<ul key={turma.nome}>
							<li>Nome: {turma.nome}</li>
							<li>Ano: {turma.ano}</li>
							<li>Turno: {turma.turno}</li>
							<li>Trilha: {turma.trilha}</li>
							<li>Capacidade Máxima: {turma.capacidadeMaxima}</li>
							<li>Capacidade Atual: {turma.capacidadeAtual}</li>
						</ul>
					);
				})}
		</section>
	);
}

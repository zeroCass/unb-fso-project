import TurmaItem from "@/components/TurmaItem";
import { fetchTurmas } from "@/actions/fetchTurmas";
import type { Turma } from "@/types";

export default async function Page() {
	const turmas: Turma[] | null = await fetchTurmas();
	return (
		<section>
			<h1>Turmas</h1>
			{turmas &&
				turmas.map((turma: Turma) => {
					return (
						<TurmaItem turma={turma} key={turma.id}/>
					);
				})}
		</section>
	);
}

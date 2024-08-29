import { fetchTurmas } from "@/actions/fetchTurmas";
import EscolhaTurno from "@/components/turnos/EscolhaTurma";
import { Turma } from "@/types";

// fazer esta pagina ser server component com async (remover links)
export default async function Page() {
	const turmas: Turma[] = await fetchTurmas();

	return <EscolhaTurno turmas={turmas} />;
}

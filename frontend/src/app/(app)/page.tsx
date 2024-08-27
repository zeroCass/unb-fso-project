import Home from "@/components/home/Home";
import { fetchTurmas } from "@/actions/fetchTurmas";
import { Turma } from "@/types";


export default async function Page() {
	const turmas: Turma[] = await fetchTurmas();

	return <Home turmas={turmas} />;
}

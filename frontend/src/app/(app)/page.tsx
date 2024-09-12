import { fetchAlunos } from "@/actions/fetchAlunos";
import { fetchTurma } from "@/actions/fetchTurma";
import { fetchUser } from "@/actions/fetchUser";
import Home from "@/components/home/Home";

export default async function Page() {
	const user = await fetchUser();
	const turma = user?.role === "ALUNO" ? await fetchTurma(user.turma) : null;
	const alunos = user?.role === "ADMIN" ? await fetchAlunos() : null;

	return <Home turma={turma} alunos={alunos} />;
}

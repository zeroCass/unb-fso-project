import { fetchTurma } from "@/actions/fetchTurma";
import { fetchUser } from "@/actions/fetchUser";
import Home from "@/components/home/Home";

export default async function Page() {
	const user = await fetchUser();
	const turma = user?.role === "ALUNO" ? await fetchTurma(user.turma) : null;

	return <Home turma={turma} />;
}

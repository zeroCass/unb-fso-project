import { fetchTurmas } from "@/actions/fetchTurmas";
import Matricula from "@/components/turmas/Matricula";
import type { Turma } from "@/types";

type turnoType = "MAT" | "VES" | "ALL";

export default async function Page({
	searchParams,
}: {
	searchParams: { turno: "MAT" | "VES" };
}) {
	const turmas: Turma[] = await fetchTurmas();
	const turno: turnoType = searchParams.turno ? searchParams.turno : "ALL";

	return <Matricula turno={turno} turmas={turmas} />;
}

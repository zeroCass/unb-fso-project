import { fetchRelatorio } from "@/actions/fetchRelatorio";
import RelatorioMatricula from "@/components/relatorio-matricula";
import { Relatorio } from "@/types";
import { Container } from "@mui/material";

export default async function Page() {
	const relatorio: Relatorio[] = await fetchRelatorio();
	return (
		<Container>
			<h1>Relatório de Matricula</h1>
			<RelatorioMatricula relatorio={relatorio} />
		</Container>
	);
}

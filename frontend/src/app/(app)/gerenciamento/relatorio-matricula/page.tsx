import { fetchRelatorio } from "@/actions/fetchRelatorio";
import RelatorioMatricula from "@/components/relatorio-matricula";
import { Relatorio } from "@/types";

export default async function Page() {
	const relatorio: Relatorio[] = await fetchRelatorio();
	return <RelatorioMatricula relatorio={relatorio} />;
}

"use client";

import { Relatorio } from "@/types";

export default function RelatorioMatricula({ relatorio }: { relatorio: Relatorio[] }) {
	return (
		<>
			{relatorio.map((rel: Relatorio) => (
				<div
					key={rel.id}
					style={{
						margin: "30px 0",
						border: "2px solid black",
					}}
				>
					<p>
						Turma {rel.nome} - Turno: {rel.turno} - Vagas: {rel.capacidadeAtual}/{rel.capacidadeMaxima}
					</p>
					<div
						style={{
							padding: "0 15px",
						}}
					>
						<p
							style={{
								padding: "0 25px",
							}}
						>
							Alunos
						</p>
						{rel.alunos.length > 0 ? (
							<ul
								style={{
									padding: "0 55px",
								}}
							>
								{rel.alunos.map((aluno) => (
									<li key={aluno.cpf}>
										Nome: {aluno.nome} - CPF: {aluno.cpf}
									</li>
								))}
							</ul>
						) : (
							<p
								style={{
									padding: "0 55px",
								}}
							>
								Sem Alunos Matriculados
							</p>
						)}
					</div>
				</div>
			))}
		</>
	);
}

"use client";

import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

type UserRole = {
	role: "ADMIN" | "ALUNO";
};

function CustomButton({ role }: UserRole) {
	const router = useRouter();
	return (
		<div>
			{role === "ALUNO" && <button onClick={() => router.push("/turnos")}>MATRICULE-SE</button>}

			{role === "ADMIN" && <button>PLACE HOLDER</button>}
		</div>
	);
}

export default function Home() {
	const { user } = useUser();
	const isMatriculado = user?.turma ? true : false;

	return (
		<div>
			<div>
				{user?.role === "ALUNO" && !isMatriculado && (
					<div>
						<h2>
							Olá {user?.nome}. Você ainda não está matriculado.
							<span>Clique aqui</span> para se matricular.
						</h2>
						<CustomButton role={user.role} />
					</div>
				)}
				{user?.role === "ALUNO" && isMatriculado && (
					<div>
						<h2>
							Olá {user?.nome}. Você já está matriculado na Turma {user.turma}
						</h2>
					</div>
				)}
				{user?.role === "ADMIN" && (
					<div>
						<h2>Olá ADM {user?.nome}.</h2>
						<CustomButton role={user.role} />
					</div>
				)}
			</div>
		</div>
	);
}

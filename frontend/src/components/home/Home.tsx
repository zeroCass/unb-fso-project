"use client";

import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import style from "./home.module.css";
import Image from "next/image";

type UserRole = {
	role: "ADMIN" | "ALUNO";
};

function CustomButton({ role }: UserRole) {
	const router = useRouter();
	return (
		<div>
			{role === "ALUNO" && (
				<button
					onClick={() => router.push("/turnos")}
					className={style.button_styled}
				>
					Clique Aqui
				</button>
			)}

			{role === "ADMIN" && <button>PLACE HOLDER</button>}
		</div>
	);
}

const BackgroundImage = () => {
	return (
		<Image
			src="/images/undraw_Studying.svg"
			alt="Estudando"
			width={500}
			height={500}
		/>
	);
};

export default function Home() {
	const { user } = useUser();
	const isMatriculado = user?.turma ? true : false;

	return (
		<div>
			<div>
				{user?.role === "ALUNO" && !isMatriculado && (
					<div>
						<Typography
							sx={{
								position: "absolute",
								left: "66px",
								top: "198px",
								fontFamily: "Judson",
								fontWeight: 400,
								fontSize: "128px",
								lineHeight: "147px",
								color: "#000000",
							}}
						>
							Olá, {user?.nome}.
						</Typography>

						<Typography
							sx={{
								position: "absolute",
								left: "75px",
								top: "489px",
								fontFamily: "Archivo Narrow",
								fontWeight: 400,
								fontSize: "48px",
								lineHeight: "65px",
								color: "#000000",
							}}
						>
							você não está matriculado ainda.
						</Typography>
						<CustomButton role={user.role} />

						<Typography
							sx={{
								position: "absolute",
								left: "122px",
								top: "781px",
								fontFamily: "Archivo Narrow",
								fontWeight: 400,
								fontSize: "48px",
								lineHeight: "65px",
								textAlign: "center",
								color: "#000000",
							}}
						>
							para se matricular
						</Typography>

						<Box
							sx={{
								position: "absolute",
								width: "520px",
								height: "520px",
								left: "803px",
								top: "301px",
							}}
						>
							<BackgroundImage />
						</Box>
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

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

export default function Home() {
	const { user } = useUser();
	const isMatriculado = user?.turma ? true : false;

	return (
		<div>
			<div>
				{user?.role === "ALUNO" && (
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
							Olá, <br /> {user?.nome}.
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
							{!isMatriculado 
								? `você não está matriculado ainda.`
							 	:  `você está matriculado na trilha` }
						</Typography>
						
						{!isMatriculado  && (
							<>
							<CustomButton role={user.role} />
							<Typography
								sx={{
									position: "absolute",
									left: "405px",
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
							</>
						)}

						{isMatriculado  && (
							<>
							<Typography 
							sx={{
									position: "absolute",
									top: "550px",
									fontFamily: "Archivo Narrow",
									fontWeight: 400,
									fontSize: "48px",
									lineHeight: "65px",
									textAlign: "center",
									color: "#1c74ec",
								}}
							>
								 TRILHA
							</Typography>
							<Typography
								sx={{
									position: "absolute",
									left: "405px",
									top: "720px",
									fontFamily: "Archivo Narrow",
									fontWeight: 400,
									fontSize: "48px",
									lineHeight: "65px",
									textAlign: "center",
									color: "#000000",
								}}
							>
								Turma: {user.turma}
								<br />
								Turno:
							</Typography>
							</>
						)}
						
						<Box
							sx={{
								position: "absolute",
								width: "520px",
								height: "520px",
								left: "900px",
								top: "500px",
							}}
						>
							<Image
								src="/images/undraw_Studying.svg"
								alt="Estudando"
								width={500}
								height={500}
							/>
						</Box>
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

"use client";

import registerAluno from "@/actions/registerAluno";
import { Container, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

type ModalConfig = {
	message: string;
	action: "none" | "redirect";
};

export default function Cadastro() {
	const [password, setPassword] = useState("");
	const [open, setOpen] = useState<boolean>(false);
	const [modalConfig, setModalConfig] = useState<ModalConfig>({
		message: "",
		action: "none",
	});
	const router = useRouter();
	const [state, action] = useFormState(registerAluno, { sucess: false, error: false, message: "" });

	useEffect(() => {
		console.log("effect");
		if (state.sucess) {
			handleOpenModal({ message: state.message, action: "redirect" });
		}

		if (!state.sucess && state.error) {
			handleOpenModal({ message: state.message, action: "none" });
		}
	}, [state.sucess, router, state.error, state.message]);

	const generatePassword = () => {
		const randomPassword = "123";
		setPassword(randomPassword);
	};

	const handleOpenModal = ({ message, action }: { message: string; action: "redirect" | "none" }) => {
		setModalConfig({
			message,
			action,
		});
		setOpen(true);
	};

	const handleCloseModal = () => {
		state.error = false;
		setOpen(false);
		if (modalConfig.action === "redirect") {
			console.warn("estado com sucesso, redirecionando");
			window.location.href = "/";
		}
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleCloseModal}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div
						style={{
							width: "500px",
							height: "500px",
						}}
					>
						<div
							style={{
								width: "100%",
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<h3>{modalConfig.message}</h3>
							<button onClick={handleCloseModal}>Ok</button>
						</div>
					</div>
				</div>
			</Modal>
			<Container>
				<form
					action={action}
					style={{
						width: "50%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<input name="nome" placeholder="Nome" type="text" required />
					<input name="cpf" placeholder="CPF" type="text" required />
					<input name="email" placeholder="E-mail" type="email" required />
					<input value={password} name="password" placeholder="Senha" type="password" readOnly required />
					<button onClick={() => generatePassword()} type="button">
						Gerar Senha
					</button>
					<button type="submit">Cadastrar</button>
				</form>
			</Container>
		</>
	);
}

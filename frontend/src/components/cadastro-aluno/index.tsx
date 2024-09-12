"use client";

import registerAluno from "@/actions/registerAluno";
import {
	Box,
	Button,
	Container,
	IconButton,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import CpfInput from "./CpfInput";

type ModalConfig = {
	message: string;
	action: "none" | "redirect";
};

function FeedbackModal({
	open,
	modalConfig,
	handleCloseModal,
}: {
	open: boolean;
	modalConfig: ModalConfig;
	handleCloseModal: () => void;
}) {
	return (
		<Modal
			open={open}
			onClose={handleCloseModal}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
		>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						width: 300,
						padding: 4,
						backgroundColor: "white",
						boxShadow: 24,
						borderRadius: 2,
						textAlign: "center",
					}}
				>
					<Typography variant="h6" gutterBottom>
						{modalConfig.message}
					</Typography>
					<Button variant="contained" onClick={handleCloseModal}>
						Ok
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}

const passwordStyles = {
	"& .MuiInputBase-root": {
		backgroundColor: "#e0e0e0",
		cursor: "not-allowed",
		pointerEvents: "none",
	},
	"& .MuiOutlinedInput-notchedOutline": {
		borderColor: "transparent",
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "transparent",
	},
	"& .Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "transparent",
	},
};

export default function Cadastro() {
	const [cpf, setCpf] = useState("");
	const [password, setPassword] = useState("");
	const [open, setOpen] = useState<boolean>(false);
	const [modalConfig, setModalConfig] = useState<ModalConfig>({
		message: "",
		action: "none",
	});
	const router = useRouter();
	const [state, action] = useFormState(registerAluno, {
		sucess: false,
		error: false,
		message: "",
	});

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
		const password = "123";
		setPassword(password);
	};

	const handleOpenModal = ({
		message,
		action,
	}: {
		message: string;
		action: "redirect" | "none";
	}) => {
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
			<FeedbackModal
				open={open}
				modalConfig={modalConfig}
				handleCloseModal={handleCloseModal}
			/>

			<Container maxWidth="md">
				<Box
					sx={{
						marginTop: 8,
						padding: 4,
						borderRadius: 2,
						boxShadow: 3,
						backgroundColor: "#f5f5f5",
					}}
				>
					<Typography
						variant="h5"
						align="center"
						sx={{ fontFamily: "var(--fontTitle)" }}
						gutterBottom
					>
						Cadastrar Aluno
					</Typography>

					<Box
						component="form"
						action={action}
						mt={5}
						sx={{ display: "flex", flexDirection: "column", gap: 2 }}
						noValidate
						autoComplete="off"
					>
						<TextField
							name="nome"
							label="Nome"
							variant="outlined"
							required
							fullWidth
						/>

						<CpfInput value={cpf} onChange={setCpf} />

						<TextField
							name="email"
							label="E-mail"
							type="email"
							variant="outlined"
							required
							fullWidth
						/>

						<Box sx={{ display: "flex", alignItems: "center" }}>
							<TextField
								name="password"
								label="Senha"
								type="password"
								variant="outlined"
								value={password}
								InputProps={{
									readOnly: true,
								}}
								onChange={(e) => e.preventDefault()}
								required
								fullWidth
								sx={passwordStyles}
							/>

							<IconButton onClick={generatePassword} sx={{ marginLeft: 1 }}>
								<SyncIcon />
							</IconButton>
						</Box>

						<Box display="flex" justifyContent="center" gap={2} mt={5}>
							<Button
								variant="outlined"
								color="primary"
								sx={{ minWidth: "150px" }}
								onClick={() => window.history.back()}
							>
								Voltar
							</Button>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								sx={{ minWidth: "150px" }}
							>
								Cadastrar
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
}

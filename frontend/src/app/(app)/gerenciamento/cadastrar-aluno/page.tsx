import Cadastro from "@/components/cadastro-aluno";
import { Box, Typography } from "@mui/material";

export default async function Page() {
	return (
		<section>
			<Box mt={5}>
				<Typography
					variant="h5"
					align="center"
					sx={{ fontFamily: "var(--fontTitle)" }}
					gutterBottom
				>
					Cadastrar Aluno
				</Typography>
				<Cadastro />
			</Box>
		</section>
	);
}

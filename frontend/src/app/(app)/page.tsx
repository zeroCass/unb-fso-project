import Home from "@/components/home/Home";
import { Container } from "@mui/material";

export default async function Page() {
	return (
		<Container sx={{ height: "100vh" }}>
			<Home />
		</Container>
	);
}

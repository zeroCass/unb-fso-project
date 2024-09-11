import { Box, Typography } from "@mui/material";
import Timer from "./Timer";

export default function TurmaHeader({ turno }: { turno: any }) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				height: "100%",
				alignItems: "center",
				padding: "10px",
			}}
		>
			<Typography
				textTransform="uppercase"
				fontSize={25}
				sx={{
					fontFamily: "var(--font-title)",
					flexGrow: 1,
				}}
			>
				Turno: {turno}
			</Typography>
			<Timer />
		</Box>
	);
}

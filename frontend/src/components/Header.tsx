"use client";
import logout from "@/actions/logout";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const pages = [{ name: "Home", path: "/" }];
const adminPages = [
	{ name: "Turmas", path: "/turmas" },
	{ name: "Turnos", path: "/turnos" },
];

const DesktopMenu = ({ user }: any) => (
	<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
		{pages.map((page) => (
			<Button
				key={page.name}
				sx={{ my: 2, color: "white", display: "block", fontSize: "1.1rem" }}
				component={Link}
				href={page.path}
			>
				{page.name}
			</Button>
		))}
		{user?.role === "ADMIN" &&
			adminPages.map((page) => (
				<Button
					key={page.name}
					sx={{ my: 2, color: "white", display: "block", fontSize: "1.1rem" }}
					component={Link}
					href={page.path}
				>
					{page.name}
				</Button>
			))}
	</Box>
);

export default function Header() {
	const { user } = useUser();

	const handleClick = async () => {
		await logout();
	};

	return (
		<AppBar position="static">
			<Container maxWidth={false}>
				<Toolbar>
					<AutoStoriesIcon
						sx={{
							display: { xs: "none", md: "flex", fontSize: "2rem" },
							mr: 1,
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							fontSize: "1.5rem",
						}}
					>
						FSO
					</Typography>

					<DesktopMenu user={user} />

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Sair">
							<IconButton onClick={handleClick} sx={{ p: 0, color: "white" }}>
								<ExitToAppIcon sx={{ fontSize: "2rem" }} />
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

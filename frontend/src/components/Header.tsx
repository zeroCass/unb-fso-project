"use client";
import { useState } from "react";
import * as React from "react";
import logout from "@/actions/logout";
import { useUser } from "@/context/userContext";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu"; // Import do ícone de menu
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const pages = [{ name: "Home", path: "/" }];
const adminPages = [
	{ name: "Cadastrar Aluno", path: "/gerenciamento/cadastrar-aluno" },
	{
		name: "Relatório de Matrículas",
		path: "/gerenciamento/relatorio-matricula",
	},
];

const DesktopMenu = ({ user }: any) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
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

			{user?.role === "ADMIN" && (
				<>
					<Button
						sx={{ my: 2, color: "white", display: "block", fontSize: "1.1rem" }}
						onClick={handleClick}
					>
						Gerenciamento
					</Button>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							"aria-labelledby": "basic-button",
						}}
					>
						{adminPages.map((page) => (
							<MenuItem
								key={page.name}
								component={Link}
								href={page.path}
								onClick={handleClose}
							>
								{page.name}
							</MenuItem>
						))}
					</Menu>
				</>
			)}
		</Box>
	);
};

const MobileMenu = ({ user }: any) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
			<IconButton
				size="large"
				edge="start"
				aria-label="menu"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleClick}
				sx={{ color: "white" }}
			>
				<MenuIcon />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ "aria-labelledby": "basic-button" }}
			>
				{pages.map((page) => (
					<MenuItem
						key={page.name}
						component={Link}
						href={page.path}
						onClick={handleClose}
					>
						{page.name}
					</MenuItem>
				))}
				{user?.role === "ADMIN" && (
					<>
						{adminPages.map((page) => (
							<MenuItem
								key={page.name}
								component={Link}
								href={page.path}
								onClick={handleClose}
							>
								{page.name}
							</MenuItem>
						))}
					</>
				)}
			</Menu>
		</Box>
	);
};

export default function Header() {
	const { user } = useUser();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							fontSize: "1.5rem",
							cursor: "default",
						}}
					>
						FSO
					</Typography>

					{isMobile ? <MobileMenu user={user} /> : <DesktopMenu user={user} />}

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

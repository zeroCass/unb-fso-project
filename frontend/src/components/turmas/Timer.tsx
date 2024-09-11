"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Timer() {
	const [time, setTime] = useState(30);
	const router = useRouter();

	useEffect(() => {
		const timerCookie = Cookies.get("matricula-timer");
		// Check if the cookie exists when the page loads and sets
		if (timerCookie) {
			const timeLeftFromCookie = parseInt(timerCookie, 10);
			setTime(timeLeftFromCookie);
		}
	}, []);

	useEffect(() => {
		if (time <= 0) router.push("/matricula/turnos/");
		const interval = setInterval(() => {
			const timeInString = time.toString();
			Cookies.set("matricula-timer", timeInString, { expires: time / 86400 }); // 86400 total of s in a day
			setTime((time: number) => time - 1);
		}, 1000);
		// component unmounts
		return () => clearInterval(interval);
	}, [time, router]);

	return (
		<Tooltip arrow placement="left" title="Tempo até sair da solicitação de matrícula">
			<Box
				sx={{
					backgroundColor: "var(--background-div)",
					borderRadius: "25px",
					width: "120px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Typography textTransform="uppercase" fontSize={25} padding={1}>
					{"00: " +
						time.toLocaleString("en-US", {
							minimumIntegerDigits: 2,
							useGrouping: false,
						})}
				</Typography>
			</Box>
		</Tooltip>
	);
}

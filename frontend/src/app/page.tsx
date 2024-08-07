"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
	const [fools, setFools] = useState([]) as any;

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/v1/fools/")
			.then((response) => {
				setFools(response.data);
			})
			.catch((error) => {
				console.error("There was an error fetching the data!!", error);
			});
	}, []);

	return (
		<main>
			<h1>FSO</h1>
			<h3>Lista de Tavs</h3>
			<ul>
				{fools.map((fool: any) => (
					<li key={fool.id}>
						Nome: {fool.name} - CPF: {fool.cpf}
					</li>
				))}
			</ul>
		</main>
	);
}

"use client";
import { IPeriodoMatriculaContext, PeriodoMatricula } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const PeriodoMatriculaContext = createContext<IPeriodoMatriculaContext | null>(null);

export function PeriodoMatriculaContextProvider({
	children,
	periodo,
}: {
	children: React.ReactNode;
	periodo: PeriodoMatricula | null;
}) {
	const [periodoState, setPeriodo] = useState<PeriodoMatricula | null>(periodo);
	// Effect to update userState whenever the user prop changes
	useEffect(() => {
		setPeriodo(periodo);
	}, [periodo]);

	return (
		<PeriodoMatriculaContext.Provider value={{ periodo: periodoState, setPeriodo }}>
			{children}
		</PeriodoMatriculaContext.Provider>
	);
}

export function usePeriodoMatricula() {
	const context = useContext(PeriodoMatriculaContext);

	if (!context) {
		throw new Error("useUser deve ter usado dentro de UserContextProvider");
	}
	return context;
}

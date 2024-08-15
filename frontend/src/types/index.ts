export type Session = {
	token: string;
	nome: string;
	role: "ADMIN" | "ALUNO";
};

export type SessionCookie = {
	session: Session;
	expires: string; //ISO 8601 date string
	iat: number;
	exp: number;
};

export type User = {
	nome: string;
	role: "ADMIN" | "ALUNO";
	turma?: number | null | undefined;
};

export type IUserContext = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

enum NomeTurma {
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
}

enum TrilhaTurma {
	"ENEGRESER",
	"DNMEV",
	"AMN",
	"AGRO",
}

export type Turma = {
	nome: NomeTurma;
	turno: "MAT" | "VES";
	trilha: TrilhaTurma;
	capacidadeMaxima: number;
	capacidadeAtual: number;
	ano: number;
};

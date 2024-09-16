export type Session = {
	token: string;
	user: User;
	expires: string; //ISO 8601 date string
	iat: number;
	exp: number;
};

export type UserFromCookie = {
	id: number;
	role: "ADMIN" | "ALUNO";
};

export type User = {
	id: number;
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

export enum TrilhaTurma {
	ENEGRESER = "ENEGRESER",
	DNMEV = "DNMEV",
	AMN = "AMN",
	AGRO = "AGRO",
}

export type Turma = {
	id: number;
	nome: NomeTurma;
	turno: "MAT" | "VES";
	trilha: TrilhaTurma;
	capacidadeMaxima: number;
	capacidadeAtual: number;
	ano: number;
};

type AlunoMatriculado = {
	cpf: string;
	nome: string;
};

export type Relatorio = Turma & {
	alunos: AlunoMatriculado[];
};

export type Aluno = {
	cpf: string;
	nome: string;
	role: "ALUNO";
	turma: number | null;
};

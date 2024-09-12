import React, { ReactNode, useRef } from "react";
import TextField from "@mui/material/TextField";

interface CpfInputProps {
	value: string;
	onChange: (value: string) => void;
	children?: ReactNode;
	props?: {
		type: string;
		maxLength: number;
		required: boolean;
		name: string;
	};
}

export default function CpfInput({ value, onChange, children }: CpfInputProps) {
	const cpfRef: any = useRef();

	const formatCpf = (input: string): string => {
		const numbers = input.replace(/\D/g, ""); // Remove all non-numeric characters
		const length = numbers.length;

		if (length <= 3) return numbers;
		if (length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
		if (length <= 9)
			return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
				6
			)}`;
		return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(
			6,
			9
		)}/${numbers.slice(9, 11)}`;
	};

	const handleChange = () => {
		const inputValue = cpfRef.current.value;
		onChange(formatCpf(inputValue));
	};

	if (children) {
		return React.cloneElement(
			React.Children.only(children) as React.ReactElement,
			{
				value,
				onChange: handleChange,
				inputRef: cpfRef,
				onInput: handleChange,
			}
		);
	}

	return (
		<TextField
			type="text"
			label="CPF"
			variant="outlined"
			fullWidth
			value={value}
			inputRef={cpfRef}
			onChange={handleChange}
			required
			placeholder="000.000.000/00"
			name="cpf"
			inputProps={{ maxLength: 14 }}
		/>
	);
}

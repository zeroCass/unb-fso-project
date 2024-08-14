// get the token from the api
export async function getToken(cpf: any, password: any) {
	return cpf + password;

	// const response = await fetch(`${process.env.DJANGO_API}/login/`, {
	//   method: 'POST',
	//   headers: {
	//     'Content-Type': 'application/json',
	//   },
	//   body: JSON.stringify({ cpf, password }),
	// });

	// if (!response.ok) {
	//   throw new Error('Failed to authenticate');
	// }

	// const token = await response.json();
	// return token;
}

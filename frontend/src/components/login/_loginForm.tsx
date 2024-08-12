import { getSession, login, logout } from "@/lib/_session";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getSession();
	return (
		<section>
			<form
				action={async (formData) => {
					"use server";
					await login(formData);
					redirect("/");
				}}
			>
				<input type="email" placeholder="Email" />
				<br />
				<button type="submit">Login</button>
			</form>
			<form
				action={async () => {
					"use server";
					await logout();
					redirect("/");
				}}
			>
				<button type="submit">Logout</button>
			</form>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</section>
	);
}

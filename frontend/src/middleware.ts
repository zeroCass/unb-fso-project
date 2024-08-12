// import { NextRequest, NextResponse } from "next/server";
// import routes from "./lib/routes";

// export async function middleware(request: NextRequest) {
// 	const token = request.cookies.get("session")?.value;
// 	const currentPath = request.nextUrl.pathname;

// 	// needed to be sure if token is valid (jwt)
// 	const authenticaded = token ? true : false;
// 	console.warn("autenticated/token: ", authenticaded, token);

// 	const isProctedRoute = routes.protectedRoutes.includes(currentPath);
// 	if (!authenticaded && isProctedRoute) {
// 		console.warn("is not autenticated");
// 		return NextResponse.redirect(new URL("/login", request.nextUrl));
// 	}

// 	const isAuthRoute = routes.authRoutes.includes(currentPath);
// 	if (authenticaded && isAuthRoute) {
// 		console.warn("it is autenticated already");
// 		return NextResponse.redirect(new URL("/", request.nextUrl));
// 	}

// 	return NextResponse.next();
// }

import { NextRequest } from "next/server";
import { updateSession } from "./lib/_session";

export async function middleware(request: NextRequest) {
	console.log("entrou midleware");
	return await updateSession(request);
}

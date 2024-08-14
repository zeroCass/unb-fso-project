import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/_session";
import routes from "./lib/routes";

export async function middleware(request: NextRequest) {
	const res = await updateSession(request);
	const isAuth = res ? true : false;
	const currentPath = request.nextUrl.pathname;
	const isProctedRoute = routes.protectedRoutes.includes(currentPath);
	if (!isAuth && isProctedRoute) {
		console.warn("is not autenticated");
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	const isAuthRoute = routes.authRoutes.includes(currentPath);
	if (isAuth && isAuthRoute) {
		console.warn("it is autenticated already");
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}

	return NextResponse.next();
}

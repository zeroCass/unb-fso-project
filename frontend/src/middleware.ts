import { NextRequest, NextResponse } from "next/server";

export const routes = {
	protectedRoutes: ["/"],
	authRoutes: ["/login"],
};

export function middleware(request: NextRequest) {
	const token = request.cookies.get("token")?.value;

	const currentPath = request.nextUrl.pathname;

	// needed to be sure if token is valid (jwt)
	const authenticaded = token ? true : false;

	const isProctedRoute = routes.protectedRoutes.includes(currentPath);
	if (!authenticaded && isProctedRoute) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	const isAuthRoute = routes.authRoutes.includes(currentPath);
	if (authenticaded && isAuthRoute) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}

	return NextResponse.next();
}

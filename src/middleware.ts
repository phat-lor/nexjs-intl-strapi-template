import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
	// Handle Locale Routing
	const handleI18nRouting = createMiddleware(routing);
	const response = handleI18nRouting(request);

	return response;
}

export const config = {
	// Match only internationalized pathnames
	// matcher: ["/", "/(en)/:path*"],
	matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

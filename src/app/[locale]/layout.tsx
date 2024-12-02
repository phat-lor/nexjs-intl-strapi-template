import { Prompt } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { notFound } from "next/navigation";
import { routing } from "@/lib/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
const prompt = Prompt({ subsets: ["latin"], weight: "400" });

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const { locale } = await params;
	// Ensure that the incoming `locale` is valid
	// @ts-expect-error locale is a string
	if (!routing.locales.includes(locale)) {
		notFound();
	}
	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={`dark text-foreground bg-background ${prompt.className}`}
		>
			<head></head>
			<body>
				<NextIntlClientProvider messages={messages}>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}

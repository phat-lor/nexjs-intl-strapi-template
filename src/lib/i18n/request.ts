import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale;

	// Ensure that a valid locale is used
	// @ts-expect-error locale is a string
	if (!locale || !routing.locales.includes(locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (await import(`../../dictionaries/${locale}.json`)).default,
	};
});

"use client";

import { usePathname, useRouter } from "@/lib/i18n/routing";
import { Icon } from "@iconify/react";
import { ButtonGroup, Button } from "@nextui-org/button";
import { startTransition } from "react";

export function LanguagesTabs({ locale }: { locale: string }) {
	const pathname = usePathname();
	const router = useRouter();

	const changeLocale = (locale: string) => {
		startTransition(() => {
			router.replace(pathname, { locale: locale });
		});
	};

	return (
		<ButtonGroup>
			{/* replace */}

			<Button
				variant="bordered"
				className="border-default-700/20"
				onClick={() => changeLocale("th")}
			>
				{locale === "th" && (
					<Icon icon="cuida:check-outline" width="24" height="24" />
				)}
				Thai
			</Button>
			<Button
				variant="bordered"
				className="border-default-700/20"
				onClick={() => changeLocale("en")}
			>
				{locale === "en" && (
					<Icon icon="cuida:check-outline" width="24" height="24" />
				)}
				English
			</Button>
		</ButtonGroup>
	);
}

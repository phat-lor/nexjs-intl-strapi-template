import cms from "@/lib/cms";
import Test from "@/types/test.type";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { cn } from "@nextui-org/theme";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import { use } from "react";
import { LanguagesTabs } from "@/components/LangugesTabs";

export default function Home() {
	const locale = use(getLocale());
	const t = useTranslations();

	const testCMS = use(
		cms.getSingleTypes<Test>("test", { locale: locale, throwError: false })
	);

	console.log(testCMS);
	return (
		<div className="font-body bg-background text-text flex flex-col justify-center items-center min-h-screen mx-auto w-full max-w-screen-xl overflow-x-hidden">
			<div className="decorations overflow-x-hidden w-screen h-screen fixed top-0 left-1/2 -translate-x-1/2 select-none ">
				<Image
					src="https://pbs.twimg.com/media/FM_je0TXsAUAjoX?format=jpg&name=large"
					id="background-image"
					width={"100%"}
					height={"100vh"}
					className="object-cover rounded-none "
					alt="Background Image"
				></Image>
			</div>
			<div className="flex flex-col z-10 p-10 py-20 w-full md:px-12 min-h-screen duration-300 px-4 gap-3">
				<div className="w-full flex justify-center">
					<h1 className="text-2xl font-semibold">{t("landing.title")}</h1>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 w-full mt-20 gap-2">
					<Card
						classNames={{
							base: "overflow-hidden rounded-lg shadow border border-[#FFFFFF08]/10 backdrop-filter backdrop-blur-lg bg-gray-300 bg-opacity-5",
						}}
					>
						<CardHeader className="flex flex-col items-start">
							<div className="flex justify-between w-full">
								<p>{t("landing.cmsStatus.title")}</p>
								<div className="flex flex-row items-center gap-2">
									<div className="flex">
										<div
											className={cn(
												"rounded-full w-3 h-3",
												testCMS.error ? "bg-danger" : "bg-success"
											)}
										></div>
										<div
											className={cn(
												"rounded-full w-3 h-3 absolute animate-ping",
												testCMS.error ? "bg-danger" : "bg-success"
											)}
										></div>
									</div>

									<p>
										{testCMS.error
											? t("landing.cmsStatus.problem")
											: t("landing.cmsStatus.online")}
									</p>
								</div>
							</div>
							<p className="text-default-500 text-xs">
								{t("landing.cmsStatus.subtitle")}
							</p>
						</CardHeader>
						<CardBody className="flex gap-2">
							<div className="flex flex-col gap-2 text-xl">
								<p className="text-sm">{t("landing.cmsStatus.dataFetched")}</p>
								<pre className="text-sm border p-2 rounded-md border-default-700/20">
									{JSON.stringify(testCMS.data, null, 2)}
								</pre>
							</div>
						</CardBody>
					</Card>

					<Card
						classNames={{
							base: "overflow-hidden rounded-lg shadow border border-[#FFFFFF08]/10 backdrop-filter backdrop-blur-lg bg-gray-300 bg-opacity-5",
						}}
					>
						<CardHeader className="flex flex-col items-start  md:justify-between">
							<p>{t("landing.playground.title")}</p>
							<p className="text-default-500 text-xs">
								{t("landing.playground.subtitle")}
							</p>
						</CardHeader>
						<CardBody className="flex gap-2">
							{testCMS.error ? (
								<div className="flex flex-col gap-2 text-xl">
									<p className="text-sm">{t("landing.playground.cmsDown")}</p>
								</div>
							) : (
								<div className="flex flex-col gap-2 items-start">
									<p>{t("landing.playground.language")}</p>
									<LanguagesTabs locale={locale} />
								</div>
							)}
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

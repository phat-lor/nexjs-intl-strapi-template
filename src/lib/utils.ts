export type Currencies = "USD" | "THB";

export type ExchangeRate = {
	currency: Currencies;
	rate: number;
};

export function formatPrice(
	price: number | string,
	rates: ExchangeRate[],
	options: {
		currency?: Currencies;
		notation?: Intl.NumberFormatOptions["notation"];
		round?: boolean;
		convert?: boolean;
	} = {}
) {
	const {
		currency = "USD",
		notation = "standard",
		round = true,
		convert = true,
	} = options;

	const numericPrice = typeof price === "string" ? parseFloat(price) : price;

	const exchangeRate = rates.find((rate) => rate.currency === currency);

	if (!exchangeRate && currency !== "USD") {
		return "N/A (Invalid Currency)";
	}

	const convertedPrice =
		convert && exchangeRate ? exchangeRate.rate * numericPrice : numericPrice;

	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			notation,
			maximumFractionDigits: 2,
		}).format(
			currency == "USD" || !round ? convertedPrice : roundPrice(convertedPrice)
		);
	} catch {
		return "N/A (Invalid Price)";
	}
}

export function roundConvert(
	price: number,
	rates: ExchangeRate[],
	currency: Currencies
) {
	if (currency === "USD") {
		return price;
	}

	const exchangeRate = rates.find((rate) => rate.currency === currency);
	const convertedPrice = exchangeRate ? exchangeRate.rate * price : price;
	return roundPrice(convertedPrice);
}

// round
export function roundPrice(price: number) {
	return Math.ceil(price / 10) * 10;
}

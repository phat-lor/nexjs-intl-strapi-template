/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";

interface Pagination {
	page?: number;
	pageSize?: number;
}

interface Filters {
	[key: string]: any;
}

interface QueryOptions {
	pagination?: Pagination;
	populate?: string | string[] | object;
	sort?: string | string[];
	filters?: Filters;
	fields?: string[];
	locale?: string;
	throwError?: boolean;
}

interface ApiResponse<T> {
	data: T;
	error?: any;
	meta?: {
		pagination?: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

interface SingularApiResponse<T> {
	data: T;
	error?: any;
	meta?: Record<string, any>;
}

class StrapiUtil {
	private client: AxiosInstance;

	constructor(baseURL: string, jwtToken: string | null = null) {
		this.client = axios.create({
			baseURL,
			headers: jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {},
		});
	}

	setToken(jwtToken: string): void {
		this.client.defaults.headers.Authorization = `Bearer ${jwtToken}`;
	}

	private static buildQuery(params: QueryOptions): string {
		const query = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (
				key !== "throwError" &&
				typeof value === "object" &&
				!Array.isArray(value)
			) {
				Object.entries(value).forEach(([subKey, subValue]) => {
					query.append(`${key}[${subKey}]`, String(subValue));
				});
			} else if (key !== "throwError") {
				query.append(key, String(value));
			}
		});
		return query.toString();
	}

	async getSingleTypes<T>(
		collectionName: string,
		query: QueryOptions = {}
	): Promise<SingularApiResponse<T>> {
		try {
			const queryString = StrapiUtil.buildQuery(query);
			const response = await this.client.get(
				`/api/${collectionName}?${queryString}`
			);
			return response.data;
		} catch (error: any) {
			console.error(`Error fetching ${collectionName}:`, error.message);
			if (query.throwError) throw error;
			return { data: null as any, error: error.message || "Unknown Error" };
		}
	}

	async getAll<T>(
		collectionName: string,
		query: QueryOptions = {}
	): Promise<ApiResponse<T[]>> {
		try {
			const queryString = StrapiUtil.buildQuery(query);
			const response = await this.client.get(
				`/api/${collectionName}?${queryString}`
			);
			return response.data;
		} catch (error: any) {
			console.error(`Error fetching ${collectionName}:`, error.message);
			if (query.throwError) throw error;
			return { data: [], error: error.message || "Unknown Error" };
		}
	}

	async getById<T>(
		collectionName: string,
		id: number | string,
		query: QueryOptions = {}
	): Promise<ApiResponse<T>> {
		try {
			const queryString = StrapiUtil.buildQuery(query);
			const response = await this.client.get(
				`/api/${collectionName}/${id}?${queryString}`
			);
			return response.data;
		} catch (error: any) {
			console.error(
				`Error fetching ${collectionName} with ID ${id}:`,
				error.message
			);
			if (query.throwError) throw error;
			return { data: null as any, error: error.message || "Unknown Error" };
		}
	}

	async create<T>(
		collectionName: string,
		data: Partial<T>,
		options: { throwError?: boolean } = {}
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.post(`/api/${collectionName}`, {
				data,
			});
			return response.data;
		} catch (error: any) {
			console.error(`Error creating item in ${collectionName}:`, error.message);
			if (options.throwError) throw error;
			return { data: null as any, error: error.message || "Unknown Error" };
		}
	}

	async update<T>(
		collectionName: string,
		id: number | string,
		data: Partial<T>,
		options: { throwError?: boolean } = {}
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.put(`/api/${collectionName}/${id}`, {
				data,
			});
			return response.data;
		} catch (error: any) {
			console.error(
				`Error updating ${collectionName} with ID ${id}:`,
				error.message
			);
			if (options.throwError) throw error;
			return { data: null as any, error: error.message || "Unknown Error" };
		}
	}

	async delete<T>(
		collectionName: string,
		id: number | string,
		options: { throwError?: boolean } = {}
	): Promise<ApiResponse<T>> {
		try {
			const response = await this.client.delete(`/api/${collectionName}/${id}`);
			return response.data;
		} catch (error: any) {
			console.error(
				`Error deleting ${collectionName} with ID ${id}:`,
				error.message
			);
			if (options.throwError) throw error;
			return { data: null as any, error: error.message || "Unknown Error" };
		}
	}
}

const cms = new StrapiUtil(
	process.env.STRAPI_API,
	process.env.STRAPI_AUTHORIZATION
);

export default cms;

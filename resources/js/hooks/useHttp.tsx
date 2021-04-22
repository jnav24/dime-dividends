import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

enum URLMethods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

type Args = {
	headers?: Record<string, string>;
	path: string;
	params: Record<string, any>;
};

type Response = {
	errors: string[];
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	data: Record<string, string>;
};

export default function useHttp() {
	const [data, setData] = useState<Record<string, string>>({});
	const [errors, setErrors] = useState<string[]>([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const getResponse = async (
		method: URLMethods,
		path: string,
		params: Record<string, any>,
		headers: Record<string, any>
	): Promise<void> => {
		try {
			setIsLoading(true);
			let responseData: any = {
				data: params,
			};

			if (method === 'get') {
				responseData = { params };
			}

			const response: AxiosResponse = await axios({
				method,
				url: `${process.env.VUE_APP_API_DOMAIN}${path.replace(
					/^\/|\/$/g,
					''
				)}`,
				headers,
				...responseData,
				withCredentials: true,
			});

			setIsError(!(response.status >= 200 && response.status < 300));
			setIsSuccess(response.status >= 200 && response.status < 300);
			setData(response.data ?? {});
		} catch (err) {
			setIsError(true);
			setIsSuccess(false);
			if (err.response.data?.errors) {
				setErrors(Object.values(data.errors));
			} else {
				setErrors(['Something unexpected had occurred.']);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const deleteAuth = async ({
		headers,
		params,
		path,
	}: Args): Promise<Response> => {
		await getResponse(URLMethods.DELETE, path, params, headers ?? {});
		return { errors, isError, isLoading, isSuccess, data };
	};

	const getAuth = async ({
		headers,
		params,
		path,
	}: Args): Promise<Response> => {
		await getResponse(URLMethods.GET, path, params, headers ?? {});
		return { errors, isError, isLoading, isSuccess, data };
	};

	const postAuth = async ({
		headers,
		params,
		path,
	}: Args): Promise<Response> => {
		await getResponse(URLMethods.POST, path, params, headers ?? {});
		return { errors, isError, isLoading, isSuccess, data };
	};

	const putAuth = async ({
		headers,
		params,
		path,
	}: Args): Promise<Response> => {
		await getResponse(URLMethods.PUT, path, params, headers ?? {});
		return { errors, isError, isLoading, isSuccess, data };
	};

	return { deleteAuth, getAuth, postAuth, putAuth };
}

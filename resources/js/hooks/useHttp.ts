import { useEffect, useMemo, useReducer } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../@types/custom-inertia';
import axios, { AxiosResponse } from 'axios';
import { HttpError } from '../@types/http-responses';

function mkenum<T extends { [index: string]: U }, U extends string>(x: T) {
	return x;
}

const URLMethods = mkenum({
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete',
});

type CommonResponse = {
	errors: string[];
	isError: boolean;
	isFetching: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	data: Record<string, any>;
};

type Response = CommonResponse & {
	refetch: () => void;
	reset: () => void;
};

type Args = {
	method: typeof URLMethods[keyof typeof URLMethods];
	path: string;
	params?: Record<string, any>;
	headers?: Record<string, any>;
	initialize?: boolean;
};

const initialState: CommonResponse = {
	data: {},
	errors: [] as string[],
	isError: false,
	isFetching: false,
	isLoading: false,
	isSuccess: false,
};

enum HttpTypes {
	RESET_STATE = 'RESET_STATE',
	UPDATE_STATE = 'UPDATE_STATE',
}

function reducer(
	state: CommonResponse,
	{ type, payload }: { type: HttpTypes; payload?: Partial<CommonResponse> }
) {
	switch (type) {
		case HttpTypes.UPDATE_STATE:
			return {
				...state,
				...payload,
			};
		case HttpTypes.RESET_STATE:
			return {
				...initialState,
			};
		default:
			return state;
	}
}

export default function useHttp({
	method,
	path,
	params = {},
	headers = {},
	initialize = true,
}: Args): Response {
	const { app_url } = usePage().props as CustomProps;
	const [state, dispatch] = useReducer(reducer, initialState);
	const hasData = useMemo(
		() => state.data && Object.keys(state.data).length,
		[state.data]
	);

	const getResponse = async () => {
		try {
			let responseData: any = {
				data: params,
			};

			if (method === URLMethods.GET) {
				responseData = { params };
			}

			const response: AxiosResponse = await axios({
				method,
				url: `${app_url}${path.replace(/^\/|\/$/g, '')}`,
				headers,
				...responseData,
				withCredentials: true,
			});

			dispatch({
				type: HttpTypes.UPDATE_STATE,
				payload: {
					data: response.data ?? {},
					isError: !(response.status >= 200 && response.status < 300),
					isSuccess: response.status >= 200 && response.status < 300,
				},
			});
		} catch (err) {
			let errors = [HttpError.DEFAULT];

			if (err?.response?.data?.errors) {
				errors = Object.values(err.response.data.errors);
			}

			if (err?.response?.data?.message) {
				errors = [err.response.data.message];
			}

			dispatch({
				type: HttpTypes.UPDATE_STATE,
				payload: {
					isError: true,
					isSuccess: false,
					errors,
				},
			});
		} finally {
			dispatch({
				type: HttpTypes.UPDATE_STATE,
				payload: {
					isFetching: false,
					isLoading: false,
				},
			});
		}
	};

	const refetch = async () => {
		if (state.isFetching) return null;
		dispatch({
			type: HttpTypes.UPDATE_STATE,
			payload: {
				isFetching: true,
				isLoading: !hasData,
			},
		});
	};

	const reset = () => dispatch({ type: HttpTypes.RESET_STATE });

	useEffect(() => {
		// @todo test when initialize === true and component re-renders on state change. infinite loop?
		if (initialize) {
			dispatch({
				type: HttpTypes.UPDATE_STATE,
				payload: {
					isFetching: true,
					isLoading: !hasData,
				},
			});
		}
	}, []);

	useEffect(() => {
		if (state.isFetching) {
			getResponse();
		}
	}, [state.isFetching]);

	const { errors, isError, isFetching, isLoading, isSuccess, data } = state;
	return {
		errors,
		isError,
		isFetching,
		isLoading,
		isSuccess,
		data,
		refetch,
		reset,
	};
}

import { useEffect, useReducer, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { CustomProps } from '../@types/custom-inertia';
import axios, { AxiosResponse } from 'axios';

function mkenum<T extends { [index: string]: U }, U extends string>(x: T) {
	return x;
}

const URLMethods = mkenum({
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete',
});

type Response = {
	errors: string[];
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	data: Record<string, string>;
	refetch: () => void;
};

type Args = {
	method: typeof URLMethods[keyof typeof URLMethods];
	path: string;
	params?: Record<string, any>;
	headers?: Record<string, any>;
	enable?: boolean;
};

type HttpState = {
    errors: string[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    data: Record<string, string>;
    runFetch: boolean;
};

const initialState: HttpState = {
    data: {},
    errors: [] as string[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    runFetch: false,
};

enum HttpTypes {
    UPDATE_STATE = 'UPDATE_STATE',
};

function reducer(state: HttpState, { type, payload }: { type: HttpTypes, payload: Partial<HttpState> }) {
    switch (type) {
        case HttpTypes.UPDATE_STATE:
            return {
                ...state,
                ...payload,
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
	enable = true,
}: Args): Response {
	const { app_url } = usePage().props as CustomProps;
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
	    dispatch({ type: HttpTypes.UPDATE_STATE, payload: { runFetch: enable }});
	}, [enable]);

	const getResponse = async () => {
		try {
            dispatch({ type: HttpTypes.UPDATE_STATE, payload: { isLoading: true, runFetch: false }});
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
            dispatch({
                type: HttpTypes.UPDATE_STATE,
                payload: {
                    isError: true,
                    isSuccess: false,
                    errors: err?.response?.data?.errors ? Object.values(err.response.data.errors) : ['Something unexpected had occurred.'],
                },
            });
		} finally {
            dispatch({
                type: HttpTypes.UPDATE_STATE,
                payload: {
                    isLoading: false,
                },
            });
		}
	};

	const refetch = async () => {
        dispatch({
            type: HttpTypes.UPDATE_STATE,
            payload: {
                runFetch: true,
            },
        });
    };

    if (state.runFetch) {
        getResponse();
    }

    const { errors, isError, isLoading, isSuccess, data } = state;
	return { errors, isError, isLoading, isSuccess, data, refetch };
}

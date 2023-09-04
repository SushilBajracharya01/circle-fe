import { Axios } from '../../apis/configs/axiosConfig';
import { useMutation, useQuery } from 'react-query';
import { IAuthOptionsProps } from '../../types';

interface IQueryOptions {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSuccess?: (data: any) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (error: any) => void;
	refetchInterval?: number;
	enabled?: boolean;
}

type paramType = [string, string | number | boolean] | string[];

interface IQueryHook {
	queryName: string;
	queryRoute: string;
	params?: paramType[];
	options?: IQueryOptions;
	axiosOptions?: IAuthOptionsProps;
}

export const useQueryHook = ({ queryName, queryRoute, params = [], options = {} }: IQueryHook) => {
	const requestService = async () => {
		try {
			const queryParams = params.map((p) => p.join('='));
			const response = await Axios.get(queryRoute + (params.length > 0 ? `?${queryParams.join('&')}` : ''));
			return response?.data || {};
		} catch (error) {
			console.log(error);
		}
	};
	return useQuery({
		queryKey: [queryName, ...params],
		queryFn: requestService,
		...options,
	});
};

interface IMutationHook {
	queryRoute: string;
	method?: 'post' | 'patch' | 'put' | 'delete';
	params?: [string, string | number][];
	options?: IQueryOptions;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	axiosOptions?: any;
	env?: string | null;
}

export const useMutationHook = ({
	queryRoute,
	method = 'post',
	params = [],
	options = {},
	axiosOptions = {},
}: IMutationHook) => {
	const queryParams = params.map((p) => p.join('='));
	return useMutation({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mutationFn: async (data: { [key: string]: any }) => {
			let response = null;
			if (method === "post") {
				response = await Axios.post(`${queryRoute + (params.length > 0 ? `?${queryParams.join('&')}` : '')
					}`, data, axiosOptions);
			}

			console.log(response, 'response')
			// return response.data.data || response;
		},
		...options,
	});
};

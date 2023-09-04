import axios from 'axios';
import { Axios } from '../../apis/configs/axiosConfig';
import { IAuthOptionsProps, authHeader } from '../../_helpers/auth-header';
import { useMutation, useQuery } from 'react-query';

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

export const useQueryHook = ({ queryName, queryRoute, params = [], options = {}, axiosOptions }: IQueryHook) => {
	const requestService = async () => {
		try {
			const queryParams = params.map((p) => p.join('='));
			const response = await Axios(axiosOptions).get(queryRoute + (params.length > 0 ? `?${queryParams.join('&')}` : ''));
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
	env = null,
}: IMutationHook) => {
	const queryParams = params.map((p) => p.join('='));
	return useMutation({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mutationFn: async (data: { [key: string]: any }) => {
			const baseUri = import.meta.env.VITE_BACKEND_API;
			const envUri = env && import.meta.env[env];
			console.log(baseUri, 'baseUri')
			const uri = env ? envUri : baseUri;
			const response = await axios({
				method: method,
				url: `${uri}${queryRoute + (params.length > 0 ? `?${queryParams.join('&')}` : '')
					}`,
				headers: {
					...authHeader({ multipart: axiosOptions.multipart }),
				},
				data: data,
			});
			return response.data.data || response;
		},
		...options,
	});
};

import axios from 'axios';
import { Axios } from '../../apis/configs/axiosConfig';
import { IAuthOptionsProps, authHeader } from '../../_helpers/auth-header';
import { useMutation, useQuery } from 'react-query';

interface IQueryOptions {
	onSuccess?: (data: any) => void;
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
			let queryParams = params.map((p) => p.join('='));
			let response = await Axios(axiosOptions).get(queryRoute + (params.length > 0 ? `?${queryParams.join('&')}` : ''));
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
	let queryParams = params.map((p) => p.join('='));
	return useMutation({
		mutationFn: async (data: { [key: string]: any }) => {
			let baseUri = process.env.REACT_APP_BACKEND_API;
			let envUri = env && process.env[env];

			let uri = env ? envUri : baseUri;
			let response = await axios({
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

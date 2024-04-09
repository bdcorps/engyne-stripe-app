import { fetchStripeSignature } from '@stripe/ui-extension-sdk/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CONFIG } from '../../config';

const getBackendUrl = (endpoint: string) => {
  const backendHost = CONFIG.BACKEND_URL;

  return backendHost + endpoint;
}

const makeRequest = async ({ method, url, data, headers }: any) => {
  const newHeaders = {
    ...headers,
    'Stripe-Signature': await fetchStripeSignature(),
  }

  return axios({
    method,
    url,
    data,
    headers: newHeaders
  });
}

const useUpdateSite = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ subdomain, showToast, ...data }: any) => {
      const url: string = getBackendUrl(`/api/sites/${subdomain}`);

      return makeRequest({
        method: "patch",
        url,
        data,
      });
    },
    {
      onSuccess: (_: any, variables: any) => {
        queryClient.invalidateQueries(["site"]);
      },
    }
  );
};



const fetchSite = async (accountId: string) => {
  const response = await axios.get(getBackendUrl(`/api/sites/stripe/${accountId}`));
  return response.data;
};

const useSite = (accountId: string) => {
  return useQuery(["site", accountId], () => fetchSite(accountId), {
    enabled: !!accountId,
    staleTime: 5000,
    cacheTime: 10000,
    retry: 0,
  });
};

export { useSite, useUpdateSite };


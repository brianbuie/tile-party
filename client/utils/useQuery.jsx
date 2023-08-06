import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import routes from '@common/routes';
import axios from 'axios';

export { routes };

const queryClient = new QueryClient();

export const QueryProvider = props => <QueryClientProvider client={queryClient} {...props} />;

const useMyQuery = (key, fn, opts) => {
  const result = useQuery(key, fn, opts);
  return [result.data, result.isLoading, result.error, result];
};

const get = url => axios(url).then(({ data }) => data);

export const useMe = () => useMyQuery(['me'], () => get(routes.me));

export const useGames = () => useMyQuery(['games'], () => get(routes.viewGames));

export const useWordList = () =>
  useMyQuery(['wordList'], async () => axios.get('/word-list.txt').then(res => res.data.split('\n')), {
    networkMode: 'offlineFirst',
    staleTime: Infinity,
    cacheTime: Infinity,
  });

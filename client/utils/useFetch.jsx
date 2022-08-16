import useHttp, { Provider } from 'use-http';
import { Path } from 'path-parser';
import routes from '@common/routes';

const providerProps = {
  options: {
    cachePolicy: 'no-cache',
  },
};

export const FetchProvider = ({ children }) => <Provider {...providerProps}>{children}</Provider>;

// if route[routeName] === '/some/:id'
// and options === { id: 'example' }
// will fetch '/some/example'
export const useFetch = (routeName, options = {}, deps = []) => {
  const route = routes[routeName] ? new Path(routes[routeName]).build(options) : routeName;
  console.log('fetching ' + route);
  const { data, loading, error } = useHttp(route, options, deps);
  let _data;
  if (data && !loading && !error) _data = data;
  const _error = !loading && error && data ? data : error;
  return [_data, loading, _error];
};

export { routes };

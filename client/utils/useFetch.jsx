import useHttp, { Provider } from "use-http";
import { Path } from "path-parser";
import routes from "@common/routes";

const providerProps = {
  options: {
    cachePolicy: "no-cache",
  },
};

export const FetchProvider = ({ children }) => <Provider {...providerProps}>{children}</Provider>;

// if route[routeName] === '/some/:id'
// and options === { id: 'example' }
// will fetch '/some/example'
export const useFetch = (routeName, options, deps) => {
  const route = new Path(routes[routeName]).build(options);
  console.log("fetching " + route);
  return useHttp(route, options, deps);
};

export { routes };

import useHttp, { Provider } from "use-http";
import { Path } from "path-parser";
import routes from "@common/routes";

export const FetchProvider = ({ children }) => <Provider url="/api">{children}</Provider>;

export const useFetch = (routeName, options, deps) => {
  const route = new Path(routes[routeName]).build(options);
  console.log("fetching " + route);
  return useHttp(route, options, deps);
};

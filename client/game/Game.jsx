import { useFetch } from "@/utils/useFetch";
import Board from "./Board";

export default function Game() {
  const { data, loading, error } = useFetch("GAME", { id: "mock", cachePolicy: "no-cache" }, []);
  console.log(data, loading, error);
  if (data) return <Board {...data} />;
}

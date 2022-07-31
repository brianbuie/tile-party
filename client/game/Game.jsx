import { useFetch } from "@/utils/useFetch";
import Board from "./Board";

export default function Game() {
  const { data } = useFetch("fetchGame", { id: "mock" }, []);
  console.log(data);
  if (data) return <Board {...data} />;
}

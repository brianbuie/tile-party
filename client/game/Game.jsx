import { useFetch } from "@/utils/useFetch";
import Board from "./Board";

export default function Game() {
  const [game, loading, error] = useFetch("viewGame", { id: "mock" });
  const [words] = useFetch("/dictionary.txt", { cachePolicy: "cache-first" });
  const dictionary = words?.split("\n");
  console.log(game, loading, error);
  if (game) return <Board {...game} />;
}

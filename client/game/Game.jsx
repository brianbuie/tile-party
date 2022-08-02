import { useFetch } from "@/utils/useFetch";
import Board from "./Board";

export default function Game() {
  const [game] = useFetch("fetchGame", { id: "mock" });
  const [words] = useFetch("/dictionary.txt", { cachePolicy: "cache-first" });
  console.log(game);
  const dictionary = words?.split("\n");
  console.log(dictionary?.length);
  if (game) return <Board {...game} />;
}

import RequireAuth from "@/auth/RequireAuth";
import GamesList from "@/game/GamesList";

export default function Home() {
  return (
    <RequireAuth>
      <GamesList />
    </RequireAuth>
  );
}

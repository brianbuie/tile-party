import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { formatDistanceToNow } from "date-fns";

const mockGame = () => ({
  id: faker.random.alpha(10),
  opponents: faker.helpers.arrayElements(
    [...Array(3)].map(() => ({
      name: faker.name.firstName(),
      image: faker.image.avatar(50, 50),
    }))
  ),
  timeSinceLastMove: formatDistanceToNow(faker.date.recent(14)) + " ago",
  playerScore: faker.datatype.number(300),
  otherScore: faker.datatype.number(300),
});

const mockGroup = amount => [...Array(amount)].map(mockGame);

const games = {
  available: mockGroup(3),
  waiting: mockGroup(4),
  finished: mockGroup(8),
};

fs.writeFileSync(path.resolve(__dirname, "../.mocks/games.json"), JSON.stringify(games, null, 2));

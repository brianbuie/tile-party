import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { formatDistanceToNow } from "date-fns";

const fakeUser = {
  id: "62eb2d9542270058254d553a",
  name: "Cute Cat",
  image: "https://cataas.com/cat?width=50&height=50",
};

const mockGame = () => {
  const opponents = faker.helpers.arrayElements(
    [...Array(3)].map(() => ({
      id: faker.random.alpha(10),
      name: faker.name.firstName(),
      image: faker.image.avatar(50, 50),
    }))
  );
  const gameFinished = faker.datatype.boolean();
  const myTurn = faker.datatype.boolean();
  const playerUp = myTurn ? fakeUser : faker.helpers.arrayElement(opponents);
  return {
    id: faker.random.alpha(10),
    opponents,
    lastMove: {
      user: opponents[0],
      humanTimeSince: formatDistanceToNow(faker.date.recent(14)) + " ago",
      description: `played ${faker.word.noun(5).toUpperCase()} for ${faker.datatype.number(45)} points`,
    },
    myScore: faker.datatype.number(300),
    otherScore: faker.datatype.number(300),
    gameFinished,
    myTurn: !gameFinished && myTurn,
    playerUp: !gameFinished ? playerUp : null,
  };
};

const mockGroup = amount => [...Array(amount)].map(mockGame);

const games = mockGroup(15);

fs.writeFileSync(path.resolve(__dirname, "./.mocks/games.json"), JSON.stringify(games, null, 2));

import fs from 'fs';
import path from 'path';
import { shuffle } from 'lodash';
import { faker } from '@faker-js/faker';
import gameV1 from './.mocks/game.json';

const me = {
  id: '62eb2d9542270058254d553a',
  name: 'Brian',
  image: 'https://cataas.com/cat?width=50&height=50',
};

const mockGame = () => {
  const opponents = faker.helpers.arrayElements(
    [...Array(3)].map(() => ({
      id: faker.random.alpha(10),
      name: faker.name.firstName(),
      image: faker.image.avatar(50, 50),
    }))
  );

  const players = shuffle([...opponents, me]);

  return {
    id: faker.random.alpha(10),
    name: null,
    complete: faker.datatype.boolean(),
    settings: {
      boardLayout: 'FRIENDLY',
      gameMode: 'FRIENDLY',
    },
    players: players.map((player, key) => ({
      id: player.id,
      name: player.name,
      image: player.image,
      order: key + 1,
      score: faker.datatype.number(300),
    })),
    moveHistory: gameV1.moveHistory.map((m, key) => ({
      id: faker.random.alpha(10),
      playerId: players[key].id,
      created: faker.date.recent(14),
      word: faker.word.noun(5).toUpperCase(),
      points: faker.datatype.number(45),
      tiles: m.tiles,
    })),
    myTiles: ['Q', 'W', 'H', 'A', 'T', 'J', 'Z'],
  };
};

const games = [...Array(15)].map(mockGame);

fs.writeFileSync(path.resolve(__dirname, './.mocks/games.json'), JSON.stringify(games, null, 2));

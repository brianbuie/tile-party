import fs from 'fs';
import path from 'path';
import { shuffle } from 'lodash';
import { faker } from '@faker-js/faker';
import tileAmounts from '../common/config/tileAmounts';

const me = {
  id: '62eb2d9542270058254d553a',
  name: 'Brian',
  image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/716.jpg',
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
      tileValues: 'FRIENDLY',
      tileAmounts: 'FRIENDLY',
      tilesPerTurn: 7,
    },
    players: players.map((player, key) => ({
      id: player.id,
      name: player.name,
      image: player.image,
      order: key + 1,
      score: faker.datatype.number(300),
    })),
    moveHistory: moves().map(({ tiles }, key) => ({
      id: faker.random.alpha(10),
      playerId: players[key].id,
      created: faker.date.recent(14),
      word: faker.word.noun(5).toUpperCase(),
      points: faker.datatype.number(45),
      tiles,
    })),
    myTiles: [...Array(7)].map(() => faker.helpers.arrayElement(Object.keys(tileAmounts.FRIENDLY))),
  };
};

const games = [...Array(15)].map(mockGame);

fs.writeFileSync(path.resolve(__dirname, '../.mocks/games.json'), JSON.stringify(games, null, 2));

function moves() {
  return [
    {
      tiles: [
        {
          letter: 'S',
          loc: [3, 7],
        },
        {
          letter: 'A',
          loc: [4, 7],
        },
        {
          letter: 'N',
          loc: [5, 7],
        },
        {
          letter: 'D',
          loc: [6, 7],
        },
        {
          letter: 'A',
          loc: [7, 7],
        },
        {
          letter: 'L',
          loc: [8, 7],
        },
        {
          letter: 'S',
          loc: [9, 7],
        },
      ],
    },
    {
      tiles: [
        {
          letter: 'C',
          loc: [8, 4],
        },
        {
          letter: 'O',
          loc: [8, 5],
        },
        {
          letter: 'O',
          loc: [8, 6],
        },
      ],
    },
  ];
}

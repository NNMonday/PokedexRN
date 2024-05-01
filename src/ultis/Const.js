export const ROOT_API = "https://pokedex-rn-json-server.vercel.app/pokemons";
export const LIMIT = 10;
export const CARD_HEIGHT = 130;

export const TYPES = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
];

export const HEIGHTS = ["Short", "Medium", "Tall"];
export const WEIGHTS = ["Light", "Normal", "Heavy"];

export const generations = [
  { name: 1, pokemonsId: [1, 4, 7] },
  { name: 2, pokemonsId: [152, 155, 158] },
  { name: 3, pokemonsId: [252, 255, 258] },
  { name: 4, pokemonsId: [387, 390, 393] },
  { name: 5, pokemonsId: [495, 498, 501] },
];

export const generationLimit = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 495, end: 649 },
};

export const sortTypesList = [
  {
    name: "Smallest number first",
    query: "_sort=id",
  },
  {
    name: "Highest number first",
    query: "_sort=id&_order=desc",
  },
  {
    name: "A-Z",
    query: "_sort=name",
  },
  {
    name: "Z-A",
    query: "_sort=name&_order=desc",
  },
];

export const filterHeightList = [
  {
    name: "Short",
    query: "height_lte=100",
  },
  {
    name: "Medium",
    query: "height_gte=100&height_lte=200",
  },
  {
    name: "Tall",
    query: "height_gte=200",
  },
];

export const filterWeightList = [
  {
    name: "Light",
    query: "weight_lte=100",
  },
  {
    name: "Medium",
    query: "weight_gte=100&weight_lte=500",
  },
  {
    name: "Heavy",
    query: "weight_gte=500",
  },
];

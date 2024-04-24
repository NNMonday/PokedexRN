export const ROOT_API = "https://pokedex-rn-json-server.vercel.app/pokemons";
export const PER_PAGE = 5;

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

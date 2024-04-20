const backgroundColorMap = {
  bug: "#8BD674",
  dark: "#6F6E78",
  dragon: "#7383B9",
  electric: "#F2CB55",
  fairy: "#EBA8C3",
  fighting: "#EB4971",
  fire: "#FFA756",
  flying: "#83A2E3",
  ghost: "#8571BE",
  grass: "#8BBE8A",
  ground: "#F78551",
  ice: "#91D8DF",
  normal: "#B5B9C4",
  poison: "#9F6E97",
  psychic: "#FF6568",
  rock: "#D4C294",
  steel: "#4C91B2",
  water: "#58ABF6",
};

const colorMap = {
  bug: "#8CB230",
  dark: "#58575F",
  dragon: "#0F6AC0",
  electric: "#EED535",
  fairy: "#ED6EC7",
  fighting: "#D04164",
  fire: "#FD7D24",
  flying: "#748FC9",
  ghost: "#556AAE",
  grass: "#62B957",
  ground: "#DD7748",
  ice: "#61CEC0",
  normal: "#9DA0AA",
  poison: "#A552CC",
  psychic: "#EA5D60",
  rock: "#BAAB82",
  steel: "#417D9A",
  water: "#4A90DA",
};

export const getBackgroundColor = (type = "") =>
  backgroundColorMap[type.toLowerCase()] || "";

export const getTypeColor = (type = "") => colorMap[type.toLowerCase()] || "";

export const getGeneration = (pokemonId) => {
  if (typeof pokemonId !== "number" || pokemonId < 1) {
    return "Invalid input. Please enter a positive number.";
  }

  if (pokemonId <= 151) {
    return 1;
  } else if (pokemonId <= 251) {
    return 2;
  } else if (pokemonId <= 386) {
    return 3;
  } else if (pokemonId <= 493) {
    return 4;
  } else if (pokemonId <= 649) {
    return 5;
  } else {
    return "Beyond Generation V";
  }
};

export const convertToThreeDigitString = (number) => {
  let numString = number.toString();

  if (numString.length === 1) {
    return "00" + numString;
  } else if (numString.length === 2) {
    return "0" + numString;
  } else {
    return numString;
  }
};

export const capitalizeWords = (inputString) => {
  let words = inputString.split(" ");

  let capitalizedWords = words.map((word) => {
    if (word === "") {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join(" ");
};

export const isPositiveInteger = (inputString) => {
  let trimmedString = inputString.trim();

  if (/^\d+$/.test(trimmedString)) {
    let number = Number(trimmedString);
    return Number.isInteger(number) && number > 0;
  } else {
    return false;
  }
};

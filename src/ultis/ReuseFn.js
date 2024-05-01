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
  short: "#FFC5E6",
  medium: "#AEBFD7",
  tall: "#AAACB8",
  light: "#99CD7C",
  normal: "#57B2DC",
  heavy: "#5A92A5",
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

export const calculateEffectiveness = (
  attackType = "",
  defendTypes = [],
  defendAbilities = []
) => {
  const typeEffectiveness = {
    normal: {
      rock: 0.5,
      ghost: 0,
    },
    fire: {
      water: 0.5,
      grass: 2,
      ice: 2,
      bug: 2,
      rock: 0.5,
      steel: 2,
    },
    water: {
      fire: 2,
      grass: 0.5,
      electric: 2,
      ground: 2,
      rock: 2,
    },
    grass: {
      fire: 0.5,
      water: 2,
      poison: 0.5,
      ground: 2,
      flying: 0.5,
      bug: 0.5,
      rock: 2,
    },
    electric: {
      water: 0.5,
      electric: 0.5,
      ground: 2,
      flying: 2,
      steel: 0.5,
    },
    ice: {
      fire: 0.5,
      water: 0.5,
      grass: 2,
      ground: 2,
      flying: 2,
      dragon: 2,
      steel: 0.5,
    },
    fighting: {
      normal: 2,
      ice: 2,
      rock: 2,
      dark: 2,
      steel: 2,
      fairy: 0.5,
      flying: 0.5,
      psychic: 0.5,
    },
    poison: {
      grass: 2,
      fairy: 2,
      ground: 0.5,
      psychic: 2,
    },
    ground: {
      fire: 2,
      electric: 0,
      poison: 2,
      rock: 2,
      steel: 2,
      grass: 0.5,
      ice: 2,
    },
    flying: {
      grass: 2,
      fighting: 2,
      bug: 2,
      electric: 0.5,
      rock: 2,
      steel: 0.5,
    },
    psychic: {
      fighting: 2,
      poison: 2,
      bug: 2,
      ghost: 2,
      dark: 2,
    },
    bug: {
      fire: 0.5,
      grass: 2,
      fighting: 0.5,
      ground: 0.5,
      flying: 2,
      rock: 2,
    },
    rock: {
      fire: 2,
      ice: 2,
      fighting: 0.5,
      ground: 0.5,
      steel: 2,
    },
    ghost: {
      normal: 0,
      psychic: 2,
      ghost: 2,
      dark: 2,
    },
    dragon: {
      dragon: 2,
      steel: 0.5,
      fairy: 0,
    },
    dark: {
      fighting: 2,
      psychic: 0,
      bug: 2,
      ghost: 0.5,
      dark: 0.5,
      fairy: 2,
    },
    steel: {
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      ice: 2,
      rock: 0.5,
      fairy: 2,
    },
    fairy: {
      fighting: 2,
      poison: 0.5,
      bug: 0.5,
      dark: 2,
      dragon: 0,
    },
  };

  const abilitiesModifiers = {
    "Thick Fat": {
      fire: 0.5,
      ice: 0.5,
    },
    Levitate: {
      ground: 0,
    },
    "Volt Absorb": {
      electric: 0,
    },
    "Water Absorb": {
      water: 0,
    },
    "Flash Fire": {
      fire: 0,
    },
    "Storm Drain": {
      water: 0,
    },
    "Sap Sipper": {
      grass: 0,
    },
    "Motor Drive": {
      electric: 0,
    },
    "Water Veil": {
      fire: 0,
    },
    "Dry Skin": {
      fire: 1.25,
      water: 0,
    },
    "Lightning Rod": {
      electric: 0,
    },
  };

  const effectivenessModifiers = {};

  defendTypes.forEach((defendType) => {
    let effectiveness = typeEffectiveness[attackType]?.[defendType];
    if (effectiveness !== undefined) {
      defendAbilities.forEach((ability) => {
        const abilityModifiers = abilitiesModifiers[ability];
        if (abilityModifiers && abilityModifiers[defendType] !== undefined) {
          effectiveness *= abilityModifiers[defendType];
        }
      });

      if (effectiveness !== 1) {
        effectivenessModifiers[defendType] = effectiveness;
      }
    }
  });

  return effectivenessModifiers;
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

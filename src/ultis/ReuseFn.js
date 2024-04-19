export const getBackgroundColor = (type = "") => {
  const colorMap = {
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

  return colorMap[type.toLowerCase()] || "";
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

export const getTypeColor = (type = "") => {
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

  return colorMap[type.toLowerCase()] || "";
};

export const isPositiveInteger = (inputString) => {
  // Remove leading and trailing whitespace
  let trimmedString = inputString.trim();

  // Check if the trimmed string is non-empty and consists only of digits
  if (/^\d+$/.test(trimmedString)) {
    // Convert the string to a number and check if it's a positive integer
    let number = Number(trimmedString);
    return Number.isInteger(number) && number > 0;
  } else {
    return false;
  }
};

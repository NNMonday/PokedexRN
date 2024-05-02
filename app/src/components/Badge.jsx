import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { capitalizeWords, getTypeColor } from "../ultis/ReuseFn";
import Bug from "../../assets/Vectors/Types/Bug.svg";
import Dark from "../../assets/Vectors/Types/Dark.svg";
import Dragon from "../../assets/Vectors/Types/Dragon.svg";
import Electric from "../../assets/Vectors/Types/Electric.svg";
import Fairy from "../../assets/Vectors/Types/Fairy.svg";
import Fighting from "../../assets/Vectors/Types/Fighting.svg";
import Fire from "../../assets/Vectors/Types/Fire.svg";
import Flying from "../../assets/Vectors/Types/Flying.svg";
import Ghost from "../../assets/Vectors/Types/Ghost.svg";
import Grass from "../../assets/Vectors/Types/Grass.svg";
import Ground from "../../assets/Vectors/Types/Ground.svg";
import Ice from "../../assets/Vectors/Types/Ice.svg";
import Normal from "../../assets/Vectors/Types/Normal.svg";
import Poison from "../../assets/Vectors/Types/Poison.svg";
import Psychic from "../../assets/Vectors/Types/Psychic.svg";
import Rock from "../../assets/Vectors/Types/Rock.svg";
import Steel from "../../assets/Vectors/Types/Steel.svg";
import Water from "../../assets/Vectors/Types/Water.svg";

export default function Badge({ type }) {
  const dynamicStyle = StyleSheet.create({
    badgeContainer: {
      backgroundColor: getTypeColor(type.name),
    },
  });

  const TypeIcons = {
    Bug,
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Flying,
    Ghost,
    Grass,
    Ground,
    Ice,
    Normal,
    Poison,
    Psychic,
    Rock,
    Steel,
    Water,
  };

  const TypeIcon = TypeIcons[capitalizeWords(type.name)];
  return (
    <View style={[styles.badgeContainer, dynamicStyle.badgeContainer]}>
      <TypeIcon />
      <Text style={styles.badgeText}>{capitalizeWords(type.name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    borderRadius: 3,
    padding: 5,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 13,
  },
});

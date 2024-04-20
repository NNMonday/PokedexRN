import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { GlobalStyles } from "../ultis/Global";
import Pattern6x3VectorGrey from "../../assets/Patterns/6x3VectorGrey.svg";

export default function GenerationItem({
  generation,
  onGenerationSelected,
  selected,
}) {
  const styles = StyleSheet.create({
    genItem: {
      width: "47%",
      backgroundColor: selected ? "#EA5D60" : "#F2F2F2",
      borderRadius: 10,
      padding: 15,
      alignItems: "center",
      overflow: "hidden",
    },
    genPokeContainer: {
      flexDirection: "row",
    },
    pokeImage: {
      width: "33%",
    },
    pattern6x3VectorGrey: {
      position: "absolute",
    },
  });

  const images = {
    1: require("../../assets/Images/Gen1/001.png"),
    4: require("../../assets/Images/Gen1/004.png"),
    7: require("../../assets/Images/Gen1/007.png"),
    152: require("../../assets/Images/Gen2/152.png"),
    155: require("../../assets/Images/Gen2/155.png"),
    158: require("../../assets/Images/Gen2/158.png"),
    252: require("../../assets/Images/Gen3/252.png"),
    255: require("../../assets/Images/Gen3/255.png"),
    258: require("../../assets/Images/Gen3/258.png"),
    387: require("../../assets/Images/Gen4/387.png"),
    390: require("../../assets/Images/Gen4/390.png"),
    393: require("../../assets/Images/Gen4/393.png"),
    495: require("../../assets/Images/Gen5/495.png"),
    498: require("../../assets/Images/Gen5/498.png"),
    501: require("../../assets/Images/Gen5/501.png"),
  };

  return (
    <Pressable
      style={styles.genItem}
      onPress={onGenerationSelected}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
    >
      <View style={styles.genPokeContainer}>
        <Pattern6x3VectorGrey style={styles.pattern6x3VectorGrey} />
        {generation.pokemonsId.map((id) => {
          return (
            <Image
              key={id}
              source={images[id.toString()]}
              style={styles.pokeImage}
              resizeMode="contain"
            />
          );
        })}
      </View>
      <Text style={[GlobalStyles.description, styles.genDescription]}>
        Generation {generation.name}
      </Text>
    </Pressable>
  );
}

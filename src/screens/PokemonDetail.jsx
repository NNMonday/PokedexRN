import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import {
  capitalizeWords,
  convertToThreeDigitString,
  getBackgroundColor,
} from "../ultis/ReuseFn";

import PokeballVector from "../../assets/Patterns/PokeballVector.svg";
import Pattern6x3Vector from "../../assets/Patterns/6x3Vector.svg";
import { GlobalStyles } from "../ultis/Global";
import Badge from "../components/Badge";

export default function PokemonDetail({ pokemon }) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 35,
      backgroundColor: getBackgroundColor(pokemon.types[0].name),
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingBottom: 10,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      height: 130,
    },
    details: {
      paddingTop: 20,
      height: "100%",
    },
    image: {
      width: 150,
      height: 150,
    },
    backgroundContainer: {
      zIndex: -1,
      position: "absolute",
      right: 0,
      top: -17,
      overflow: "hidden",
      flexDirection: "row",
    },
    pattern6x3Vector: {
      top: 24,
      marginRight: 20,
    },
    typesContainer: {
      flexDirection: "row",
      columnGap: 9,
    },
    pokemonName: {
      color: "white",
      marginTop: -15,
      marginBottom: -5,
    },
  });
  return (
    <View style={styles.container} key={pokemon.id}>
      <View style={styles.details}>
        <Text style={GlobalStyles.pokemonNumber}>
          #{convertToThreeDigitString(pokemon.id)}
        </Text>
        <Text style={[GlobalStyles.pokemonName, styles.pokemonName]}>
          {capitalizeWords(pokemon.name)}
        </Text>
        <View style={styles.typesContainer}>
          {pokemon.types.map((t, i) => {
            return <Badge key={i} type={t} />;
          })}
        </View>
      </View>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: pokemon.image_url,
          }}
        />
      </View>
      <View style={styles.backgroundContainer}>
        <Pattern6x3Vector
          width={100}
          height={50}
          style={styles.pattern6x3Vector}
        />
        <PokeballVector width={150} height={150} />
      </View>
    </View>
  );
}

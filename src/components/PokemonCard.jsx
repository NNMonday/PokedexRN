import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useCallback } from "react";
import {
  capitalizeWords,
  convertToThreeDigitString,
  getBackgroundColor,
} from "../ultis/ReuseFn";
import { GlobalStyles } from "../ultis/Global";
import Badge from "./Badge";

export default function PokemonCard({ pokemon, navigation }) {
  const dynamicStyle = StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(pokemon.types[0].name),
    },
  });

  const handleNavigation = useCallback(() => {
    navigation.navigate("PokemonDetail", { pokemon });
  }, [navigation]);

  return (
    <Pressable
      style={[styles.container, dynamicStyle.container]}
      key={pokemon.id}
      onPress={handleNavigation}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
    >
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
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

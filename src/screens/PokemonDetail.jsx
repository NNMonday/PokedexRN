import { View, Text } from "react-native";
import React from "react";

export default function PokemonDetail({ route }) {
  const { pokemon } = route.params;
  return (
    <View>
      <Text>{pokemon.name}</Text>
    </View>
  );
}

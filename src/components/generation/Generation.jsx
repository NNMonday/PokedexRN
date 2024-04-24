import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../ultis/Global";
import { generations } from "../../ultis/Const";
import GenerationItem from "./GenerationItem";

export default function Generation({ setDisplayMode, selectedGeneration }) {
  return (
    <>
      <Text style={GlobalStyles.pokemonName}>Generations</Text>
      <Text style={GlobalStyles.description}>
        Use search for generations to explore your Pokémon!
      </Text>
      <View style={styles.gensContainer}>
        {generations.map((g, i) => (
          <GenerationItem
            selected={selectedGeneration === g.name}
            key={i}
            generation={g}
            onGenerationSelected={() => {
              setDisplayMode((pre) => ({
                ...pre,
                generation: g.name === pre.generation ? 0 : g.name,
              }));
            }}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gensContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 17,
    paddingTop: 20,
  },
});

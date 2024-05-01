import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../ultis/Global";
import FilterItem from "./FilterItem";
import NumberRange from "./NumberRange";
export default function Filter({ setDisplayMode, selectedFilter }) {
  const setTypes = (selectedType) => {
    setDisplayMode((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        types: pre.filter.types.includes(selectedType)
          ? [...pre.filter.types.filter((t) => t !== selectedType)]
          : [...pre.filter.types, selectedType],
      },
    }));
  };

  const setWeaknesses = (selectedWeakness) => {
    setDisplayMode((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        weaknesses: pre.filter.weaknesses.includes(selectedWeakness)
          ? [...pre.filter.weaknesses.filter((t) => t !== selectedWeakness)]
          : [...pre.filter.weaknesses, selectedWeakness],
      },
    }));
  };

  const setHeights = (selectedHeight) => {
    setDisplayMode((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        heights: pre.filter.heights.includes(selectedHeight)
          ? [...pre.filter.heights.filter((t) => t !== selectedHeight)]
          : [...pre.filter.heights, selectedHeight],
      },
    }));
  };
  const setWeights = (selectedWeight) => {
    setDisplayMode((pre) => ({
      ...pre,
      filter: {
        ...pre.filter,
        weights: pre.filter.weights.includes(selectedWeight)
          ? [...pre.filter.weights.filter((t) => t !== selectedWeight)]
          : [...pre.filter.weights, selectedWeight],
      },
    }));
  };

  return (
    <View style={{ overflow: "visible" }}>
      <Text style={GlobalStyles.pokemonName}>Filter</Text>
      <Text style={GlobalStyles.description}>
        Use advanced search to explore Pokémon by type, weakness, height and
        more!
      </Text>
      <View style={styles.filterContent}>
        <FilterItem
          mode="Types"
          setTypes={setTypes}
          selectedTypes={selectedFilter.types}
        />
        <FilterItem
          mode="Weaknesses"
          setTypes={setWeaknesses}
          selectedTypes={selectedFilter.weaknesses}
        />
        <FilterItem
          mode="Heights"
          setTypes={setHeights}
          selectedTypes={selectedFilter.heights}
        />
        <FilterItem
          mode="Weights"
          setTypes={setWeights}
          selectedTypes={selectedFilter.weights}
        />
        {/* <NumberRange max={649} min={1} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContent: {
    marginTop: 20,
    rowGap: 25,
  },
});

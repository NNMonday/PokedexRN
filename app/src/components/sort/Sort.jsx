import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../ultis/Global";
import { sortTypesList } from "../../ultis/Const";
import SortItem from "./SortItem";

export default function Sort({ selectedSortType, setDisplayMode }) {
  return (
    <>
      <Text style={GlobalStyles.pokemonName}>Sort</Text>
      <Text style={GlobalStyles.description}>
        Sort Pokémons alphabetically or by National Pokédex number!
      </Text>
      <View style={styles.sortTypesContainer}>
        {sortTypesList.map((t, i) => (
          <SortItem
            selected={selectedSortType === t.name}
            key={i}
            sortType={t}
            onSortTypeSelected={() =>
              setDisplayMode((pre) => ({
                ...pre,
                sort: t.name,
              }))
            }
          />
        ))}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  sortTypesContainer: {
    marginTop: 25,
    rowGap: 17,
  },
});

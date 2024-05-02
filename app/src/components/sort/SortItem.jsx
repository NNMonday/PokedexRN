import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { GlobalStyles } from "../../ultis/Global";

export default function SortItem({ sortType, selected, onSortTypeSelected }) {
  return (
    <Pressable
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={[
        styles.container,
        selected ? GlobalStyles.buttonSelected : GlobalStyles.buttonUnselected,
      ]}
      onPress={onSortTypeSelected}
    >
      <Text
        style={[
          GlobalStyles.description,
          selected ? GlobalStyles.textSelected : GlobalStyles.textUnselected,
        ]}
      >
        {sortType.name}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
});

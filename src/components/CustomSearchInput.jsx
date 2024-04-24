import React, { useState } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import Search from "../../assets/Icons/Search.svg";

export default function CustomSearchInput({
  search,
  setSearch,
}) {
  const [focus, setFocus] = useState(false);

  return (
    <View style={[styles.customSearchInput, focus && styles.focus]}>
      <Search />
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setFocus(false);
          Keyboard.dismiss();
        }}
        style={styles.textInput}
        placeholder="What Pokémon are you looking for?"
        placeholderTextColor="#747476"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  customSearchInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  textInput: {
    marginLeft: 10,
    flex: 1,
  },
  focus: {
    backgroundColor: "#E2E2E2",
  },
});

import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import {
  capitalizeWords,
  convertToThreeDigitString,
  getBackgroundColor,
} from "../ultis/ReuseFn";
import { GlobalStyles } from "../ultis/Global";
import Badge from "../components/Badge";
import BackIcon from "../../assets/Icons/Back.svg";

export default function PokemonDetail({ route, navigation }) {
  const { pokemon } = route.params;
  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: getBackgroundColor(
        capitalizeWords(pokemon.types[0].name)
      ),
    },
  });

  return (
    <>
      <View
        style={[
          dynamicStyles.container,
          {
            marginTop: 50,
            flexDirection: "row",
            alignItems: "center", // Vertically center items
            justifyContent: "space-between", // Space between items
            paddingHorizontal: 20, // Adjust padding for space around the items
          },
        ]}
      >
        <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>
        <Text
          style={[
            dynamicStyles.container,
            styles.title,
            GlobalStyles.pokemonName,
          ]}
        >
          {capitalizeWords(pokemon.name)}
        </Text>
      </View>
      <View style={[styles.container, dynamicStyles.container]}>
        <Image
          style={styles.image}
          source={{
            uri: pokemon.image_url,
          }}
        />
        <View style={styles.brief}>
          <Text style={GlobalStyles.filterTitle}>
            #{convertToThreeDigitString(pokemon.id)}
          </Text>
          <Text style={[GlobalStyles.applicationTitle, styles.name]}>
            {capitalizeWords(pokemon.name)}
          </Text>
          <View style={styles.badgesContainer}>
            {pokemon.types.map((t, i) => {
              return <Badge key={i} type={t} />;
            })}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    position: "absolute",
  },
  title: {
    color: "white",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 5,
    paddingHorizontal: 40,
    columnGap: 30,
  },
  image: {
    width: 120,
    height: 120,
  },
  brief: {
    flex: 1,
  },
  name: {
    marginTop: -15,
    color: "white",
  },
  badgesContainer: {
    marginTop: -7,
    flexDirection: "row",
    columnGap: 10,
  },
});

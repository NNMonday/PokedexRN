import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
} from "react-native";
import PokeballGradient from "../../assets/Patterns/PokeballGradient.svg";
import Generation from "../../assets/Icons/Generation.svg";
import Sort from "../../assets/Icons/Sort.svg";
import Filter from "../../assets/Icons/Filter.svg";
import { GlobalStyles } from "../ultis/Global";
import KeyboardDismiss from "../components/KeyboardDismiss";
import CustomSearchInput from "../components/CustomSearchInput";
import { useCallback, useEffect, useState } from "react";
import data from "../../pokedex_raw_array.json";
import PokemonDetail from "./PokemonDetail";
import { isPositiveInteger } from "../ultis/ReuseFn";

const windowWidth = Dimensions.get("window").width;
export default function Home({ onLayoutRootView }) {
  const [displayPokesList, setDisplayPokesList] = useState(data);
  const [search, setSearch] = useState("");
  const renderItem = useCallback(({ item }) => {
    return <PokemonDetail pokemon={item} />;
  }, []);
  useEffect(() => {
    setDisplayPokesList(
      data.filter((p) =>
        isPositiveInteger(search)
          ? p.id.toString().includes(search.trim())
          : p.name.includes(search.trim().toLowerCase())
      )
    );
  }, [search]);
  return (
    <SafeAreaView style={styles.homeContainer} onLayout={onLayoutRootView}>
      <KeyboardDismiss>
        <View style={styles.pokeballContainer}>
          <PokeballGradient
            width={windowWidth}
            height={windowWidth}
            style={{
              marginTop: -windowWidth / 2,
            }}
          />
        </View>
        <View style={styles.homeContent}>
          <View style={styles.iconsContainer}>
            <Generation />
            <Sort />
            <Filter />
          </View>
          <Text style={GlobalStyles.applicationTitle}>PokéDex</Text>
          <Text style={GlobalStyles.description}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>
          <CustomSearchInput search={search} setSearch={setSearch} />
          <FlatList
            data={displayPokesList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={15}
            removeClippedSubviews={true}
          />
        </View>
      </KeyboardDismiss>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
  },
  pokeballContainer: {
    overflow: "hidden",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 25,
    alignItems: "center",
    marginBottom: 30,
  },
  homeContent: {
    flex: 1,
    marginTop: -windowWidth / 2,
    padding: 35,
  },
});

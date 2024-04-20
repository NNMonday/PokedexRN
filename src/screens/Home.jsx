import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import PokeballGradient from "../../assets/Patterns/PokeballGradient.svg";
import Generation from "../../assets/Icons/Generation.svg";
import Sort from "../../assets/Icons/Sort.svg";
import Filter from "../../assets/Icons/Filter.svg";
import { GlobalStyles } from "../ultis/Global";
import CustomSearchInput from "../components/CustomSearchInput";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import data from "../../pokedex_raw_array.json";
import PokemonCard from "../components/PokemonCard";
import { isPositiveInteger } from "../ultis/ReuseFn";
import CustomBottomSheet from "../components/CustomBottomSheet";

const windowWidth = Dimensions.get("window").width;
export default function Home({ onLayoutRootView }) {
  const [displayPokesList, setDisplayPokesList] = useState(data);
  const renderItem = useCallback(({ item }) => {
    return <PokemonCard pokemon={item} />;
  }, []);

  const bottomSheetRef = useRef(null);
  const [mode, setMode] = useState("");
  const handleOpenPress = (str) => {
    setMode(str);
    bottomSheetRef.current?.collapse();
  };

  const [displayMode, setDisplayMode] = useState({
    search: "",
    filter: { types: [], weaknesses: [], height: [], range: [] },
    sort: "",
    generation: [],
  });

  useEffect(() => {
    console.log(displayMode);
    // setDisplayPokesList(data.filter((p) => {}));
  }, [displayMode]);

  return (
    <View style={styles.homeContainer} onLayout={onLayoutRootView}>
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
          <Pressable
            onPress={() => {
              handleOpenPress("Generation");
            }}
          >
            <Generation />
          </Pressable>
          <Pressable
            onPress={() => {
              handleOpenPress("Sort");
            }}
          >
            <Sort />
          </Pressable>
          <Pressable
            onPress={() => {
              handleOpenPress("Filter");
            }}
          >
            <Filter />
          </Pressable>
        </View>
        <Text style={GlobalStyles.applicationTitle}>PokéDex</Text>
        <Text style={GlobalStyles.description}>
          Search for Pokémon by name or using the National Pokédex number.
        </Text>
        <CustomSearchInput
          search={displayMode.search}
          setSearch={(str) =>
            setDisplayMode((pre) => ({ ...pre, search: str }))
          }
        />
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
      <CustomBottomSheet
        ref={bottomSheetRef}
        mode={mode}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
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
    marginTop: 20,
  },
  homeContent: {
    flex: 1,
    marginTop: -windowWidth / 2,
    paddingHorizontal: 35,
    paddingTop: 35,
  },
});

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import PokeballGradient from "../../assets/Patterns/PokeballGradient.svg";
import Generation from "../../assets/Icons/Generation.svg";
import Sort from "../../assets/Icons/Sort.svg";
import Filter from "../../assets/Icons/Filter.svg";
import { GlobalStyles } from "../ultis/Global";
import CustomSearchInput from "../components/CustomSearchInput";
import { useCallback, useEffect, useRef, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import CustomBottomSheet from "../components/CustomBottomSheet";
import axios from "axios";
import {
  PER_PAGE,
  ROOT_API,
  generationLimit,
  sortTypesList,
} from "../ultis/Const";
import { isPositiveInteger } from "../ultis/ReuseFn";
import debounce from "lodash.debounce";

const windowWidth = Dimensions.get("window").width;
export default function Home({ onLayoutRootView, navigation }) {
  const [displayPokesList, setDisplayPokesList] = useState([]);
  const [endMode, setEndMode] = useState("loading");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [displayMode, setDisplayMode] = useState({
    sort: "Smallest number first",
    filter: { types: [], weaknesses: [], height: [], range: [] },
    generation: 0,
  });
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!refreshing) {
      const debouncedSave = debounce((search) => {
        setDebouncedSearch(search);
      }, 500);
      debouncedSave(search);
      return debouncedSave.cancel;
    }
  }, [search]);

  useEffect(() => {
    setEndMode("loading");
    if (!refreshing) {
      setDisplayPokesList([]);
    } else {
      setPage(1);
      setLoading(true);
    }
  }, [debouncedSearch, displayMode]);

  useEffect(() => {
    const callAPI = async () => {
      if (loading) {
        const queryParams = [];
        if (debouncedSearch.trim().length > 0) {
          queryParams.push(
            isPositiveInteger(debouncedSearch.trim())
              ? `id_like=${debouncedSearch.trim()}`
              : `name_like=${debouncedSearch.trim().toLowerCase()}`
          );
        }

        if (displayMode.generation > 0) {
          const { start, end } = generationLimit[displayMode.generation];
          queryParams.push(`id_gte=${start}&id_lte=${end}`);
        }

        queryParams.push(
          sortTypesList.find((t) => t.name === displayMode.sort).query
        );

        queryParams.push(`_page=${page}`, `_per_page=${PER_PAGE}`);
        const dataUrl = `${ROOT_API}?${queryParams.join("&")}`;
        console.log("Data url:", dataUrl);
        try {
          const res = await axios.get(dataUrl);
          setDisplayPokesList((pre) =>
            refreshing ? res.data : [...pre, ...res.data]
          );
          setEndMode(() => {
            const isDataEmpty = res.data.length === 0;
            const isDisplayListEmpty = displayPokesList.length === 0;
            const isDataLessThanPerPage = res.data.length < PER_PAGE;

            if (isDataEmpty && isDisplayListEmpty) return "no-match";
            if (!isDisplayListEmpty && isDataLessThanPerPage) return "end";

            return "loading";
          });

          setLoading(false);
          setRefreshing(false);
        } catch (error) {
          return console.log(error);
        }
      }
    };

    callAPI();
  }, [loading, page]);

  const renderItem = useCallback(({ item }) => {
    return <PokemonCard pokemon={item} navigation={navigation} />;
  }, []);

  const onEndReached = useCallback(() => {
    if (endMode === "loading") {
      setPage((pre) => (displayPokesList.length === 0 ? 1 : pre + 1));
      setLoading(true);
    }
  }, [endMode, displayPokesList]);

  const renderFooter = useCallback(() =>
    endMode === "loading" ? <ActivityIndicator size={"large"} /> : null
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearch("");
    setDebouncedSearch("");
    setDisplayMode({
      sort: "Smallest number first",
      filter: { types: [], weaknesses: [], height: [], range: [] },
      generation: 0,
    });
  }, []);

  const bottomSheetRef = useRef(null);
  const [mode, setMode] = useState("");
  const handleOpenPress = useCallback((str) => {
    setMode(str);
    bottomSheetRef.current?.collapse();
  }, []);

  const flatListRef = useRef();
  const handleScrollToTop = useCallback(() => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  }, []);

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
        <CustomSearchInput search={search} setSearch={setSearch} />
        {endMode === "no-match" ? (
          <Text>No pokemon match</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={displayPokesList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={15}
            onEndReached={onEndReached}
            ListFooterComponent={renderFooter}
            ListFooterComponentStyle={{ marginVertical: 20 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
      <Pressable style={styles.scrollTop} onPress={handleScrollToTop}>
        <Image source={require("../../assets/scroll-top.png")} />
      </Pressable>
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
    marginBottom: 15,
    marginTop: 20,
  },
  homeContent: {
    flex: 1,
    marginTop: -windowWidth / 2,
    paddingHorizontal: 35,
    paddingTop: 20,
  },
  scrollTop: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 20,
  },
});

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
  CARD_HEIGHT,
  LIMIT,
  ROOT_API,
  filterHeightList,
  filterWeightList,
  generationLimit,
  sortTypesList,
} from "../ultis/Const";
import { isPositiveInteger } from "../ultis/ReuseFn";
import debounce from "lodash.debounce";

const windowWidth = Dimensions.get("window").width;
export default function Home({ onLayoutRootView, navigation }) {
  const [displayPokesList, setDisplayPokesList] = useState([]);
  const [endMode, setEndMode] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [displayMode, setDisplayMode] = useState({
    search: "",
    sort: "Smallest number first",
    filter: {
      types: [],
      weaknesses: [],
      heights: [],
      weights: [],
      range: {
        start: 0,
        end: 649,
      },
    },
    generations: [],
  });

  const [debounceDisplayMode, setDebounceDisplayMode] = useState({
    search: "",
    sort: "Smallest number first",
    filter: {
      types: [],
      weaknesses: [],
      heights: [],
      weights: [],
      range: {
        start: 0,
        end: 649,
      },
    },
    generations: [],
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!refreshing) {
      const debouncedSave = debounce((displayMode) => {
        setDebounceDisplayMode(displayMode);
      }, 500);
      debouncedSave(displayMode);
      return debouncedSave.cancel;
    }
  }, [displayMode]);

  useEffect(() => {
    setEndMode("loading");
    if (!refreshing) {
      setDisplayPokesList([]);
    } else {
      setPage(1);
      setLoading(true);
    }
  }, [debounceDisplayMode]);

  useEffect(() => {
    const callAPI = async () => {
      if (loading) {
        const queryParams = [];
        if (debounceDisplayMode.search.trim().length > 0) {
          queryParams.push(
            isPositiveInteger(debounceDisplayMode.search.trim())
              ? `id_like=${debounceDisplayMode.search.trim()}`
              : `name_like=${debounceDisplayMode.search.trim().toLowerCase()}`
          );
        }

        if (debounceDisplayMode.generations.length > 0) {
          const { start, end } =
            generationLimit[debounceDisplayMode.generations[0]];
          queryParams.push(`id_gte=${start}&id_lte=${end}`);
        }

        if (debounceDisplayMode.filter.heights.length > 0) {
          queryParams.push(
            filterHeightList.find(
              (h) => h.name === debounceDisplayMode.filter.heights[0]
            ).query
          );
        }

        if (debounceDisplayMode.filter.weights.length > 0) {
          queryParams.push(
            filterWeightList.find(
              (w) => w.name === debounceDisplayMode.filter.weights[0]
            ).query
          );
        }

        queryParams.push(
          sortTypesList.find((t) => t.name === debounceDisplayMode.sort).query
        );

        queryParams.push(`_page=${page}`, `_limit=${LIMIT}`);
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
            const isDataLessThanPerPage = res.data.length < LIMIT;

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
    setDisplayMode({
      search: "",
      sort: "Smallest number first",
      filter: {
        types: [],
        weaknesses: [],
        heights: [],
        weights: [],
        range: {
          start: 0,
          end: 649,
        },
      },
      generations: [],
    });
    setDebounceDisplayMode({
      search: "",
      sort: "Smallest number first",
      filter: {
        types: [],
        weaknesses: [],
        heights: [],
        weights: [],
        range: {
          start: 0,
          end: 649,
        },
      },
      generations: [],
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
        <CustomSearchInput
          search={displayMode.search}
          setSearch={(search) => setDisplayMode((pre) => ({ ...pre, search }))}
        />
        {endMode === "no-match" ? (
          <Text>No pokemon match</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={displayPokesList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
              length: CARD_HEIGHT,
              offset: CARD_HEIGHT * index,
              index,
            })}
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

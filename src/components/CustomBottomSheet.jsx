// CustomBottomSheet.jsx
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../ultis/Global";
import GenerationItem from "./GenerationItem";

const CustomBottomSheet = forwardRef(
  ({ mode = "", displayMode, setDisplayMode }, ref) => {
    const styles = StyleSheet.create({
      bottomSheet: {
        flex: 1,
        marginLeft: 25,
        marginRight: mode === "Filter" ? 0 : 25,
      },
      gensContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 17,
        paddingTop: 20,
      },
    });

    const snapPoints = useMemo(() => {
      switch (mode) {
        case "Filter":
          return ["47%", "95%"];
        case "Sort":
          return ["47%", "60%"];
        case "Generation":
          return ["47%", "80%"];
        default:
          return ["50%", "90%"];
      }
    }, [mode]);

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough={true}
        />
      ),
      []
    );

    const generations = [
      { name: 1, pokemonsId: [1, 4, 7] },
      { name: 2, pokemonsId: [152, 155, 158] },
      { name: 3, pokemonsId: [252, 255, 258] },
      { name: 4, pokemonsId: [387, 390, 393] },
      { name: 5, pokemonsId: [495, 498, 501] },
    ];

    const onGenerationSelected = (generation) => {
      setDisplayMode((pre) => ({
        ...pre,
        generation: pre.generation.includes(generation)
          ? pre.generation.filter((g) => g !== generation)
          : [...pre.generation, generation],
      }));
    };

    const renderContent = () => {
      switch (mode) {
        case "Generation":
          return (
            <>
              <Text style={GlobalStyles.pokemonName}>Generations</Text>
              <Text style={GlobalStyles.description}>
                Use search for generations to explore your Pokémon!
              </Text>
              <View style={styles.gensContainer}>
                {generations.map((g, i) => (
                  <GenerationItem
                    selected={displayMode.generation.includes(g.name)}
                    key={i}
                    generation={g}
                    onGenerationSelected={() => {
                      onGenerationSelected(g.name);
                    }}
                  />
                ))}
              </View>
            </>
          );
        case "Sort":
          return (
            <>
              <Text style={GlobalStyles.pokemonName}>Sort</Text>
            </>
          );
        case "Filter":
          return (
            <>
              <Text style={GlobalStyles.pokemonName}>Filters</Text>
            </>
          );
        default:
          return (
            <>
              <Text style={GlobalStyles.pokemonName}></Text>
            </>
          );
      }
    };

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          top: -20,
          width: 70,
          backgroundColor: "#fff",
        }}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.bottomSheet}>{renderContent()}</View>
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;

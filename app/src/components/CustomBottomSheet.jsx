// CustomBottomSheet.jsx
import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../ultis/Global";
import Generation from "./generation/Generation";
import Sort from "./sort/Sort";
import Filter from "./filter/Filter";

const CustomBottomSheet = forwardRef(
  ({ mode = "", displayMode, setDisplayMode }, ref) => {

    const snapPoints = useMemo(() => {
      switch (mode) {
        case "Filter":
          return ["47%", "90%"];
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

    const renderContent = () => {
      switch (mode) {
        case "Generation":
          return (
            <Generation
              setDisplayMode={setDisplayMode}
              selectedGenerations={displayMode.generations}
            />
          );
        case "Sort":
          return (
            <Sort
              setDisplayMode={setDisplayMode}
              selectedSortType={displayMode.sort}
            />
          );
        case "Filter":
          return (
            <>
              <Filter 
              setDisplayMode={setDisplayMode}
              selectedFilter={displayMode.filter}/>
            </>
          );
        default:
          return (
            <>
              <Text style={GlobalStyles.pokemonName}>BottomSheet</Text>
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
        <View style={[styles.bottomSheet]}>
          {renderContent()}
        </View>
      </BottomSheet>
    );
  }
);

export default CustomBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    paddingHorizontal: 25,
    overflow: 'visible'
  },
});

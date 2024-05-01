import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useCallback } from "react";
import { GlobalStyles } from "../../ultis/Global";
import { HEIGHTS, TYPES, WEIGHTS } from "../../ultis/Const";

import Bug from "../../../assets/Vectors/Types/Bug.svg";
import Dark from "../../../assets/Vectors/Types/Dark.svg";
import Dragon from "../../../assets/Vectors/Types/Dragon.svg";
import Electric from "../../../assets/Vectors/Types/Electric.svg";
import Fairy from "../../../assets/Vectors/Types/Fairy.svg";
import Fighting from "../../../assets/Vectors/Types/Fighting.svg";
import Fire from "../../../assets/Vectors/Types/Fire.svg";
import Flying from "../../../assets/Vectors/Types/Flying.svg";
import Ghost from "../../../assets/Vectors/Types/Ghost.svg";
import Grass from "../../../assets/Vectors/Types/Grass.svg";
import Ground from "../../../assets/Vectors/Types/Ground.svg";
import Ice from "../../../assets/Vectors/Types/Ice.svg";
import Normal from "../../../assets/Vectors/Types/Normal.svg";
import Poison from "../../../assets/Vectors/Types/Poison.svg";
import Psychic from "../../../assets/Vectors/Types/Psychic.svg";
import Rock from "../../../assets/Vectors/Types/Rock.svg";
import Steel from "../../../assets/Vectors/Types/Steel.svg";
import Water from "../../../assets/Vectors/Types/Water.svg";

import UnselectedBug from "../../../assets/Vectors/UnselectedTypes/Bug.svg";
import UnselectedDark from "../../../assets/Vectors/UnselectedTypes/Dark.svg";
import UnselectedDragon from "../../../assets/Vectors/UnselectedTypes/Dragon.svg";
import UnselectedElectric from "../../../assets/Vectors/UnselectedTypes/Electric.svg";
import UnselectedFairy from "../../../assets/Vectors/UnselectedTypes/Fairy.svg";
import UnselectedFighting from "../../../assets/Vectors/UnselectedTypes/Fighting.svg";
import UnselectedFire from "../../../assets/Vectors/UnselectedTypes/Fire.svg";
import UnselectedFlying from "../../../assets/Vectors/UnselectedTypes/Flying.svg";
import UnselectedGhost from "../../../assets/Vectors/UnselectedTypes/Ghost.svg";
import UnselectedGrass from "../../../assets/Vectors/UnselectedTypes/Grass.svg";
import UnselectedGround from "../../../assets/Vectors/UnselectedTypes/Ground.svg";
import UnselectedIce from "../../../assets/Vectors/UnselectedTypes/Ice.svg";
import UnselectedNormal from "../../../assets/Vectors/UnselectedTypes/Normal.svg";
import UnselectedPoison from "../../../assets/Vectors/UnselectedTypes/Poison.svg";
import UnselectedPsychic from "../../../assets/Vectors/UnselectedTypes/Psychic.svg";
import UnselectedRock from "../../../assets/Vectors/UnselectedTypes/Rock.svg";
import UnselectedSteel from "../../../assets/Vectors/UnselectedTypes/Steel.svg";
import UnselectedWater from "../../../assets/Vectors/UnselectedTypes/Water.svg";

import UnselectedShort from "../../../assets/Vectors/UnselectedHeights/Short.svg";
import UnselectedMedium from "../../../assets/Vectors/UnselectedHeights/Medium.svg";
import UnselectedTall from "../../../assets/Vectors/UnselectedHeights/Tall.svg";

import Short from "../../../assets/Vectors/Heights/Short.svg";
import Medium from "../../../assets/Vectors/Heights/Medium.svg";
import Tall from "../../../assets/Vectors/Heights/Tall.svg";

import UnselectedLightWeight from "../../../assets/Vectors/UnselectedWeights/Light.svg";
import UnselectedNormalWeight from "../../../assets/Vectors/UnselectedWeights/Normal.svg";
import UnselectedHeavyWeight from "../../../assets/Vectors/UnselectedWeights/Heavy.svg";

import LightWeight from "../../../assets/Vectors/Weights/Light.svg";
import NormalWeight from "../../../assets/Vectors/Weights/Normal.svg";
import HeavyWeight from "../../../assets/Vectors/Weights/Heavy.svg";

import { ScrollView } from "react-native-gesture-handler";
import { getBackgroundColor } from "../../ultis/ReuseFn";

export default function FilterItem({ mode, setTypes, selectedTypes }) {
  const UnselectedTypeIcons = {
    Bug: UnselectedBug,
    Dark: UnselectedDark,
    Dragon: UnselectedDragon,
    Electric: UnselectedElectric,
    Fairy: UnselectedFairy,
    Fighting: UnselectedFighting,
    Fire: UnselectedFire,
    Flying: UnselectedFlying,
    Ghost: UnselectedGhost,
    Grass: UnselectedGrass,
    Ground: UnselectedGround,
    Ice: UnselectedIce,
    Normal: UnselectedNormal,
    Poison: UnselectedPoison,
    Psychic: UnselectedPsychic,
    Rock: UnselectedRock,
    Steel: UnselectedSteel,
    Water: UnselectedWater,
  };

  const TypeIcons = {
    Bug,
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Flying,
    Ghost,
    Grass,
    Ground,
    Ice,
    Normal,
    Poison,
    Psychic,
    Rock,
    Steel,
    Water,
  };

  const UnselectedHeightIcons = {
    Short: UnselectedShort,
    Medium: UnselectedMedium,
    Tall: UnselectedTall,
  };

  const HeightIcons = {
    Short,
    Medium,
    Tall,
  };

  const UnselectedWeightIcons = {
    Light: UnselectedLightWeight,
    Normal: UnselectedNormalWeight,
    Heavy: UnselectedHeavyWeight,
  };

  const WeightIcons = {
    Light: LightWeight,
    Normal: NormalWeight,
    Heavy: HeavyWeight,
  };

  const rederFilter = useCallback(() => {
    switch (mode) {
      case "Types": {
        return TYPES.map((t, i) => {
          const selected = selectedTypes.includes(t);
          const dynamicStyles = StyleSheet.create({
            typeContainer: {
              backgroundColor: selected ? getBackgroundColor(t) : "white",
            },
          });
          const Type = selected ? TypeIcons[t] : UnselectedTypeIcons[t];
          return (
            <Pressable
              key={i}
              style={[styles.typeContainer, dynamicStyles.typeContainer]}
              onPress={() => setTypes(t)}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
            >
              <Type width={30} height={30} />
            </Pressable>
          );
        });
      }
      case "Weaknesses": {
        return TYPES.map((t, i) => {
          const selected = selectedTypes.includes(t);
          const dynamicStyles = StyleSheet.create({
            typeContainer: {
              backgroundColor: selected ? getBackgroundColor(t) : "white",
            },
          });
          const Type = selected ? TypeIcons[t] : UnselectedTypeIcons[t];
          return (
            <Pressable
              key={i}
              style={[styles.typeContainer, dynamicStyles.typeContainer]}
              onPress={() => setTypes(t)}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
            >
              <Type width={30} height={30} />
            </Pressable>
          );
        });
      }
      case "Heights": {
        return HEIGHTS.map((h, i) => {
          const selected = selectedTypes.includes(h);
          const dynamicStyles = StyleSheet.create({
            typeContainer: {
              backgroundColor: selected ? getBackgroundColor(h) : "white",
            },
          });
          const Height = selected ? HeightIcons[h] : UnselectedHeightIcons[h];
          return (
            <Pressable
              key={i}
              style={[styles.typeContainer, dynamicStyles.typeContainer]}
              onPress={() => setTypes(h)}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
            >
              <Height width={30} height={30} />
            </Pressable>
          );
        });
      }
      case "Weights": {
        return WEIGHTS.map((w, i) => {
          const selected = selectedTypes.includes(w);
          const dynamicStyles = StyleSheet.create({
            typeContainer: {
              backgroundColor: selected ? getBackgroundColor(w) : "white",
            },
          });
          const Weight = selected ? WeightIcons[w] : UnselectedWeightIcons[w];
          return (
            <Pressable
              key={i}
              style={[styles.typeContainer, dynamicStyles.typeContainer]}
              onPress={() => setTypes(w)}
              android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
            >
              <Weight width={30} height={30} />
            </Pressable>
          );
        });
      }
      default:
        return <Text>Filter</Text>;
    }
  }, [mode, selectedTypes]);
  return (
    <View style={{ overflow: "visible" }}>
      <Text style={GlobalStyles.filterTitle}>{mode}</Text>
      <View style={{ overflow: "visible" }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={styles.typesWrapper}
        >
          {rederFilter()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  typesWrapper: {
    overflow: "visible",
    columnGap: 10,
    marginTop: 10,
  },
  typeContainer: {
    padding: 10,
    borderRadius: 55 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, Text } from "react-native";
import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

export default function NumberRange() {
  const [values, setValues] = useState([1, 649]);

  return (
    <>
      <View
        style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
      >
        <MultiSlider
          values={values}
          sliderLength={280}
          onValuesChange={setValues}
          step={1}
          min={1}
          max={649}
          markerStyle={{
            height: 20, // make it bigger
            width: 20,
            borderRadius: 10,
            backgroundColor: 'blue', // change color
          }}
          pressedMarkerStyle={{
            backgroundColor: 'darkblue', // change color when pressed
          }}
          trackStyle={{
            backgroundColor: 'gray',
            height: 10, // make track bigger
          }}
          selectedStyle={{
            backgroundColor: 'blue', // change color of selected part
          }}
        />
      </View>
      <Text>Min Value: {values[0]}</Text>
      <Text>Max Value: {values[1]}</Text>
    </>
  );
}

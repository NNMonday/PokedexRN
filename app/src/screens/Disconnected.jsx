import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Disconnected() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/disconnected.png")} />
      <Text style={styles.noInternet}>No Internet :(</Text>
      <Text style={styles.advice}>
        Please check your internet, you are offline now
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  noInternet: {
    color: "#00b8e2",
    fontSize: 30,
  },
  advice: {
    color: "gray",
    fontSize: 10,
    marginTop: 10,
  },
});

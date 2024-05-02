import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import PokemonDetail from "./src/screens/PokemonDetail";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, Text, View } from "react-native";
import Disconnected from "./src/screens/Disconnected";
import { useNetInfo } from "@react-native-community/netinfo";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const { isConnected } = useNetInfo();

  const [fontsLoaded, fontError] = useFonts({
    "SF-Pro-Display-Bold": require("./assets/fonts/SF-Pro-Display-Bold.otf"),
    "SF-Pro-Display-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Pro-Display-Medium": require("./assets/fonts/SF-Pro-Display-Medium.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Font loading error</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
              <Stack.Screen
                name="Home"
                options={{
                  headerShown: false,
                }}
              >
                {(props) => (
                  <Home {...props} onLayoutRootView={onLayoutRootView} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="PokemonDetail"
                component={PokemonDetail}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
      {!isConnected && <Disconnected />}
    </>
  );
}

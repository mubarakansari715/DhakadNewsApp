import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./navigation/TabNavigation";
import IntroScreen from "./intro/IntroScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="tab" component={TabNavigation} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

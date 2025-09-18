import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./navigation/TabNavigation";
import IntroScreen from "./intro/IntroScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="tab" component={TabNavigation} />
      <Stack.Screen name="newsdetails" component={NewsDetailsScreen} />
      <Stack.Screen name="searchscreen" component={SearchScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
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

/**
 * EXPO_PUBLIC_NEWS_API_KEY=pub_a915886abd1948669d7499d9aaa138d1
 * EXPO_PUBLIC_NEWS_API_KEY=pub_eb50854c630f4b89b372a47cc5c3fc94
 */

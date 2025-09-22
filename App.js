import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./navigation/TabNavigation";
import IntroScreen from "./intro/IntroScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NewsDetailsScreen from "./screens/NewsDetailsScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AuthStore } from "./store/AuthStore";
import { userLogin } from "./store/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import Loader from "./components/Loader";

const Stack = createNativeStackNavigator();

function RootStack() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        dispatch(userLogin(true));
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLogin ? (
        <>
          <Stack.Screen name="intro" component={IntroScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="tab" component={TabNavigation} />
          <Stack.Screen name="newsdetails" component={NewsDetailsScreen} />
          <Stack.Screen name="searchscreen" component={SearchScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={AuthStore}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

/**
 * EXPO_PUBLIC_NEWS_API_KEY=pub_a915886abd1948669d7499d9aaa138d1
 * EXPO_PUBLIC_NEWS_API_KEY=pub_eb50854c630f4b89b372a47cc5c3fc94
 */

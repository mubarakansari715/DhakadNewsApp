import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { icon } from "../constants/Icons";
import { Colors } from "../constants/Colors";
import DiscoverScreen from "../screens/DiscoverScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: icon.index,
        }}
      />

      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ tabBarIcon: icon.discover }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: icon.settings,
        }}
      />
    </Tab.Navigator>
  );
}

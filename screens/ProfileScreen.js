import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/Colors";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userEmail");

      // Update Redux state
      dispatch(userLogin(false));

      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Logout failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function SearchView({ onPress, placeholder = "Search..." }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.searchbarStyle}>
        <Ionicons name="search" size={24} color={Colors.lightGrey} />
        <Text style={styles.placeholderText}>{placeholder}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  searchbarStyle: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  placeholderText: {
    fontSize: 18,
    flex: 1,
    color: Colors.lightGrey,
  },
});

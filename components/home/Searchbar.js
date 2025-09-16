import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function Searchbar({ searchText, placeholder = "Search..." }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchbarStyle}>
        <Ionicons name="search" size={24} color={Colors.lightGrey} />
        <TextInput
          style={styles.textInputStyle}
          autoCapitalize="none"
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGrey}
          onChangeText={(value) => {
            searchText(value);
          }}
        />
      </View>
    </View>
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
    paddingVertical: 4,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textInputStyle: {
    fontSize: 18,
    flex: 1,
    color: Colors.darkGrey,
  },
});

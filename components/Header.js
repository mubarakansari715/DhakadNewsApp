import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://avatar.iran.liara.run/public" }}
        style={styles.userImageStyle}
      />
      <Text style={styles.usernameStyle}>Mubarak Ansari</Text>
      <Ionicons name="notifications-outline" size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImageStyle: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  usernameStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: 1.2,
    color: Colors.darkGrey,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
});

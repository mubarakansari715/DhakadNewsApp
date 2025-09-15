import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export default function Loader({ ...props }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.tint} {...props} />
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap:10
  },
});

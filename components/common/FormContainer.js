import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/Colors";

const { height } = Dimensions.get("screen");

export default function FormContainer({ children, style, maxHeight }) {
  return (
    <View style={[styles.container, style, maxHeight && { maxHeight }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
});

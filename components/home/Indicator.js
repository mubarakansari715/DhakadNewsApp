import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { Colors } from "../../constants/Colors";

export default function Indicator({ items, pageIndex }) {
  return (
    <View style={styles.container}>
      {items?.map((item, index) => {
        const isActive = pageIndex === index;
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: isActive ? Colors.tint : Colors.lightGrey,
              },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#333",
    height: 8,
    width: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});

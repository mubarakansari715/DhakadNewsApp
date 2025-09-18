import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";
import { Colors } from "../../constants/Colors";

const { height } = Dimensions.get("screen");

export default function AnimatedContainer({
  children,
  style,
  animationType = "fadeIn",
  duration = 1000,
  delay = 0,
  maxHeight,
}) {
  const getAnimation = () => {
    switch (animationType) {
      case "fadeInDown":
        return FadeInDown.duration(duration).delay(delay);
      case "fadeInRight":
        return FadeInRight.duration(duration).delay(delay);
      case "fadeInUp":
        return FadeInUp.duration(duration).delay(delay);
      default:
        return FadeIn.duration(duration).delay(delay);
    }
  };

  return (
    <Animated.View
      style={[styles.container, style, maxHeight && { maxHeight }]}
      entering={getAnimation()}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

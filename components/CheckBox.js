import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function CheckBox({ itemTitle, selected, onPress }) {
  const mainContainer = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        selected ? "rgba(239, 142, 82, 0.1)" : "transparent",
        {
          duration: 150,
        }
      ),

      borderColor: withTiming(selected ? Colors.tint : Colors.darkGrey, {
        duration: 150,
      }),
      paddingStart: withTiming(selected ? 12 : 16, { duration: 150 }),
      paddingRight: withTiming(selected ? 12 : 16, { duration: 150 }),
    };
  }, [selected]);

  const titleAnimation = useAnimatedStyle(() => {
    return {
      color: withTiming(selected ? Colors.tint : Colors.darkGrey, {
        duration: 150,
      }),
    };
  }, [selected]);

  return (
    <Animated.View
      style={[styles.container, mainContainer]}
      onTouchEnd={onPress}
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.labelStyle, titleAnimation]}>
        {itemTitle}
      </Animated.Text>
      {selected && (
        <Animated.View
          style={[styles.iconSelectedStyle]}
          entering={FadeIn.duration(150)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={24} color={Colors.tint} />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderWidth: 1,
    // borderColor: Colors.darkGrey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 15,
    // paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: "600",
  },

  iconSelectedStyle: {
    paddingStart: 5,
  },
});

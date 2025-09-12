import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import Indicator from "./Indicator";

const { width } = Dimensions.get("screen");
export default function BrakingNewsItem({ item, index, scrollX }) {
  const rnStyle = useAnimatedStyle(() => {
    return {
      //get the previous and next item on the view of the active item,
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, rnStyle]} key={item.article_id}>
      <Image
        source={{
          uri: item.image_url,
        }}
        style={styles.imageStyle}
      />
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
        style={styles.linearGradientBackground}
      >
        <View style={styles.textOverly}>
          <View style={styles.sourceContainer}>
            {item.source_icon && (
              <Image
                source={{ uri: item.source_icon }}
                style={styles.sourceIconStyle}
              />
            )}

            <Text style={styles.sourceTitleStyle}>{item.source_name}</Text>
          </View>
          <Text style={styles.titleStyle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: width - 40,
    height: 180,
    borderRadius: 20,
  },
  linearGradientBackground: {
    position: "absolute",
    left: 20,
    right: 0,
    top: 0,
    borderRadius: 20,
    width: width - 40,
    height: 180,
  },
  textOverly: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    gap: 10,
  },
  titleStyle: {
    color: Colors.white,
    fontSize: 16,
  },

  sourceIconStyle: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  sourceTitleStyle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  sourceContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

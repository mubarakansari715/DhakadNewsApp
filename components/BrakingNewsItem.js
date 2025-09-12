import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const { width } = Dimensions.get("screen");
export default function BrakingNewsItem({ item, index }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image_url }} style={styles.imageStyle} />
      <View style={styles.textOverly}>
        <Text style={styles.titleStyle}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width - width * 0.1, // 5% margin on each side (responsive)
    marginHorizontal: width * 0.05, // 5% of screen width as margin
  },
  imageStyle: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  textOverly: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  titleStyle: {
    color: Colors.white,
    fontSize: 16,
  },
});

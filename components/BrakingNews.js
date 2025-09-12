import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import React, { useRef, useEffect } from "react";
import BrakingNewsItem from "./BrakingNewsItem";
import { Colors } from "../constants/Colors";

const { width } = Dimensions.get("screen");

export default function BrakingNews({ newsList }) {
  //   console.log("newsList", newsList);
  console.log("newsList length:", newsList?.length);

  if (!newsList || newsList.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Braking News</Text>
      <View style={styles.sliderWraper}>
        <FlatList
          keyExtractor={(item, index) => item.article_id || index.toString()}
          data={newsList}
          renderItem={({ item, index }) => (
            <BrakingNewsItem item={item} index={index} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  sliderWraper: {
    justifyContent: "center",
  },
  titleStyle: {
    paddingStart: 10,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 10,
    fontWeight: "500",
  },
});

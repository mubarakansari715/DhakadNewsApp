import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import BrakingNewsItem from "./BrakingNewsItem";
import { Colors } from "../../constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import Indicator from "./Indicator";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

const { width } = Dimensions.get("screen");
export const HeightOfCarosel = 258;

export default function BrakingNews({ newsList }) {
  // Show empty state if no data
  if (!newsList || newsList.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No news available</Text>
        </View>
      </View>
    );
  }

  const progress = useSharedValue(0);
  const ref = React.useRef(null);

  const onPressPagination = (index) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const { width: screenWidth } = Dimensions.get("window");

  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "basic-layouts", name: "parallax" }}
      style={{ alignItems: "center" }}
    >
      <View>
        <Carousel
          ref={ref}
          autoPlay={true}
          autoPlayInterval={2000}
          data={newsList}
          height={HeightOfCarosel}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={screenWidth}
          style={{
            width: screenWidth,
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.83,
            parallaxScrollingOffset: 110,
          }}
          onProgressChange={progress}
          renderItem={({ item, index }) => (
            <BrakingNewsItem item={item} index={index} />
          )}
        />
      </View>

      <Pagination.Basic
        progress={progress}
        data={newsList}
        dotStyle={{
          backgroundColor: Colors.darkGrey,
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        activeDotStyle={{
          backgroundColor: Colors.tint,
          width: 8,
          height: 8,
          borderRadius: 4,
        }}
        containerStyle={{ gap: 5, marginBottom: 10 }}
        onPress={onPressPagination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 10,
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

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.black,
    textAlign: "center",
  },
});

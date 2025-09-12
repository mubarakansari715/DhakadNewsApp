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
import { Colors } from "../constants/Colors";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Indicator from "./Indicator";

const { width } = Dimensions.get("screen");

export default function BrakingNews({ newsList }) {
  const [data, setData] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const scrollX = useSharedValue(0);
  const ref = useRef();

  // Indicator management
  const updateIndicator = (viewableItems) => {
    if (!viewableItems?.length || !data?.length) {
      console.log("No viewable items or no data");
      return;
    }

    const currentIndex = viewableItems[0].index;
    if (currentIndex === undefined || currentIndex === null) {
      console.log("Invalid index");
      return;
    }

    // Use data.length for the modulo calculation since that's what's displayed
    const pageNumber = currentIndex % data.length;

    if (pageNumber >= 0 && pageNumber < data.length) {
      setPaginationIndex(pageNumber);
    } else {
      console.log(`❌ Invalid page number: ${pageNumber}`);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    updateIndicator(viewableItems);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Initialize data when newsList changes
  useEffect(() => {
    if (newsList && newsList.length > 0) {
      setData(newsList);
      setPaginationIndex(0);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [newsList]);

  const scrollHandler = (e) => {
    scrollX.value = e.nativeEvent.contentOffset.x;

    // Manual indicator update based on scroll position
    const scrollXValue = e.nativeEvent.contentOffset.x;
    const screenWidth = Dimensions.get("window").width;
    const currentIndex = Math.round(scrollXValue / screenWidth);
    const pageNumber = currentIndex % newsList.length;

    if (pageNumber >= 0 && pageNumber < newsList.length) {
      setPaginationIndex(pageNumber);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Breaking News</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.tint} />
          <Text style={styles.loadingText}>Loading latest news...</Text>
        </View>
      </View>
    );
  }

  // Show empty state if no data
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Breaking News</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No news available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Braking News</Text>
      <View style={styles.sliderWraper}>
        <FlatList
          ref={ref}
          keyExtractor={(item, index) => `list_item${index}`}
          data={data}
          renderItem={({ item, index }) => (
            <BrakingNewsItem item={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        <Indicator items={newsList} pageIndex={paginationIndex} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.black,
    textAlign: "center",
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

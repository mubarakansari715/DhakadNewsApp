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
  useSharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import Indicator from "./Indicator";

const { width } = Dimensions.get("screen");

export default function BrakingNews({ newsList }) {
  const [data, setData] = useState([]);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const scrollX = useSharedValue(0);
  const ref = useRef();
  const interval = useRef();

  // Initialize data when newsList changes
  useEffect(() => {
    if (newsList && newsList.length > 0) {
      setData(newsList);
      setPaginationIndex(0);
    }
  }, [newsList]);

  // Simple scroll handler for animations
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Handle page changes when scroll ends
  const handleMomentumScrollEnd = (event) => {
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    const pageNumber = currentIndex % newsList.length;

    if (pageNumber >= 0 && pageNumber < newsList.length) {
      setPaginationIndex(pageNumber);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && newsList.length > 1) {
      interval.current = setInterval(() => {
        setPaginationIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % newsList.length;
          // Actually scroll the FlatList
          ref.current?.scrollToOffset({
            offset: nextIndex * width,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000); // 3 seconds interval
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, newsList.length]);

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
        <Animated.FlatList
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
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onEndReachedThreshold={0.5}
          onEndReached={() => setData([...data, ...newsList])}
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

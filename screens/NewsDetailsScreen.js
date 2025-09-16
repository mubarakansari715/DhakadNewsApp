import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Colors } from "../constants/Colors";
import Loader from "../components/Loader";

export default function NewsDetailsScreen({ navigation, route }) {
  const [newsDetails, setNewsDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "News Details",
      headerBackTitleVisible: false,
      headerRight: () => <Ionicons name="heart-outline" size={30} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (route?.params?.article_id) {
      console.log("Selected Article ID:", route.params.article_id);
      getBrakingNews();
    } else {
      console.warn("No article_id found in route params.");
    }
  }, [route?.params?.article_id]);

  const getBrakingNews = async () => {
    try {
      setIsLoading(true);

      const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&id=${route?.params?.article_id}`;
      const response = await axios.get(url, {
        timeout: 10000, // 10 second timeout
      });

      console.log("API Response:", response.data);

      if (
        response &&
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        // API returns an array, so we take the first item
        const article = response.data.results[0];
        console.log("Article data:", article);
        setNewsDetails(article);
      } else {
        throw new Error("No article found or invalid response format from API");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader size={"large"} />
      ) : newsDetails ? (
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.imageStyle}
              source={{ uri: newsDetails.image_url }}
            />
            <Text style={styles.titleStyle}>{newsDetails.title}</Text>
            <View style={styles.infoContainer}>
              <Text>{newsDetails.pubDate}</Text>
              <View style={styles.sourceContainer}>
                {newsDetails.source_url ? (
                  <Image
                    source={{ uri: newsDetails.source_icon }}
                    style={styles.infoIconStyle}
                    onError={() => console.log("Failed to load source icon")}
                  />
                ) : (
                  <Ionicons
                    name="newspaper-outline"
                    size={20}
                    color={Colors.darkGrey}
                  />
                )}
                <Text style={styles.sourceText}>{newsDetails.source_name}</Text>
              </View>
            </View>
            <Text style={styles.descriptionStyle}>
              {newsDetails.description}
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.centerContainer}>
          <Text>No article data available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  imageStyle: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "600",
  },
  descriptionStyle: {
    fontSize: 15,
    color: Colors.darkGrey,
  },
  infoIconStyle: {
    width: 24,
    height: 24,
    borderRadius: 25,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sourceContainer: {
    flexDirection: "row",
    gap: 5,
  },
  sourceText: {
    color: Colors.darkGrey,
  },
});

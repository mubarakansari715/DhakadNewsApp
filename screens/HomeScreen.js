import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import BrakingNews from "../components/BrakingNews";
import { Colors } from "../constants/Colors";

export default function HomeScreen() {
  const [brakingNews, setBrakingNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getBrakingNews = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage("");

      const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=5&image=1&removeDuplicate=1`;
      const response = await axios.get(url, {
        timeout: 10000, // 10 second timeout
      });

      if (response && response.data && response.data.results) {
        setBrakingNews(response.data.results);
        console.log(
          "Successfully fetched",
          response.data.results.length,
          "news items"
        );
      } else {
        throw new Error("Invalid response format from API");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasError(true);

      if (
        error.message.includes("Network Error") ||
        error.code === "NETWORK_ERROR"
      ) {
        setErrorMessage(
          "Network connection error. Please check your internet connection."
        );
      } else {
        setErrorMessage("Failed to load news. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    getBrakingNews();
  };

  useEffect(() => {
    getBrakingNews();
  }, []);

  // Show error state
  if (hasError) {
    return (
      <View style={styles.container}>
        <Header />
        <Searchbar />
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorTitle}>Unable to Load News</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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

  return (
    <View style={styles.container}>
      <Header />
      <Searchbar />
      <BrakingNews newsList={brakingNews} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 12,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: Colors.black,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
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
});

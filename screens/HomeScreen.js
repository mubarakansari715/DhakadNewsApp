import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import BrakingNews from "../components/BrakingNews";

export default function HomeScreen() {
  const [brakingNews, setBrakingNews] = useState([]);

  const getBrakingNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=5&image=1`;
      const response = await axios.get(url);
      if (response && response.data) {
        setBrakingNews(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    getBrakingNews();
  }, []);

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
});

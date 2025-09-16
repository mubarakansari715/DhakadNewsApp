import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NewsList from "../components/home/NewsList";
import Loader from "../components/Loader";

export default function SearchScreen({ navigation, route }) {
  const [searchNewsList, setSearchNewsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let query = "";
  let category = "";
  let country = "";
  if (route?.params?.q) {
    query = `&q=${route?.params?.q}`;
  }
  if (route?.params?.category) {
    category = `&category=${route?.params?.category}`;
  }
  if (route?.params?.country) {
    country = `&country=${route?.params?.country}`;
  }

  const fetchSearchNews = async () => {
    try {
      setIsLoading(true);

      const url = `https://newsdata.io/api/1/latest?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&language=en&size=5&image=1&removeDuplicate=1${query}${category}${country}`;
      console.log("API calling :: ", url);

      const response = await axios.get(url, {
        timeout: 10000,
      });

      if (response && response.data) {
        console.log(response.data.results);
        setSearchNewsList(response.data.results);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchNews();
  }, [route?.params?.q, route?.params?.category, route?.params?.country]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Search",
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader size={"large"} />
      ) : searchNewsList.length ? (
        <NewsList newsList={searchNewsList} />
      ) : (
        <View style={styles.nodataContainer}>
          <Text style={styles.nodataText}>No Data</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nodataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nodataText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

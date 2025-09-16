import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Searchbar from "../components/home/Searchbar";
import CheckBox from "../components/CheckBox";
import useCategoryFilter from "../hook/useCategoryFilter";
import useContryFilter from "../hook/useContryFilter";
import { Colors } from "../constants/Colors";

export default function DiscoverScreen({ navigation }) {
  const { newsList, toggleCategory } = useCategoryFilter();
  const { countryList, toggleCountry } = useContryFilter();

  // For API data
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelecteCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const filterDataHandling = () => {
    console.log("search data ", searchQuery);
    console.log("Category", selectedCategory);
    console.log("country", selectedCountry);

    if (searchQuery || selectedCategory || selectedCountry) {
      navigation.navigate("searchscreen", {
        q: searchQuery,
        category: selectedCategory,
        country: selectedCountry,
      });
    } else {
      Alert.alert("Empty", "Please select any");
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar searchText={setSearchQuery} />
      <Text>Category</Text>
      <View style={styles.listContainer}>
        {newsList.map((item) => (
          <CheckBox
            key={item.id}
            itemTitle={item.title}
            selected={item.selected}
            onPress={() => {
              toggleCategory(item.id);
              setSelecteCategory(item.slug);
            }}
          />
        ))}
      </View>
      <Text>Country</Text>
      <View style={styles.listContainer}>
        {countryList.map((item) => (
          <CheckBox
            key={item.code}
            itemTitle={item.name}
            selected={item.selected}
            onPress={() => {
              toggleCountry(item.code);
              setSelectedCountry(item.code);
            }}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={filterDataHandling}
        >
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 10,
    gap: 10,
    flexWrap: "wrap",
  },
  buttonContainer: {
    padding: 10,
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: Colors.tint,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
  },
});

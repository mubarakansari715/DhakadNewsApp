import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "../../constants/Colors";
import newsCategoryList from "../../constants/CategoriesList";

const { width } = Dimensions.get("window");

export default function Categories({ selectedCategory }) {
  const scrollRef = useRef();
  const itemRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectedItem = (index) => {
    const selected = itemRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 80, y: 0, animated: true });
    });

    selectedCategory(newsCategoryList[index].slug);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Tradding Right Now</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollStyle}
      >
        {newsCategoryList.map((item, index) => {
          return (
            <TouchableOpacity
              ref={(el) => (itemRef.current[index] = el)}
              activeOpacity={0.7}
              style={[
                styles.textWraper,
                activeIndex === index && styles.activeButtonStyle,
              ]}
              key={index}
              onPress={() => handleSelectedItem(index)}
            >
              <Text
                style={[
                  styles.unSelectedButtonStyle,
                  activeIndex === index && styles.selectedTextStyle,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 10 },
  titleStyle: {
    paddingStart: 10,
    fontSize: 18,
    color: Colors.black,
    marginBottom: 10,
    fontWeight: "500",
  },
  scrollStyle: {
    gap: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  textWraper: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.darkGrey,
  },
  activeButtonStyle: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  unSelectedButtonStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkGrey,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
});

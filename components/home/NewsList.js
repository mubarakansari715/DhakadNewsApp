import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function NewsList({ newsList }) {
  const navigation = useNavigation();
  const navigationScreen = (id) => {
    navigation.navigate("newsdetails", {
      article_id: id,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {newsList.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => navigationScreen(item.article_id)}
            >
              <View style={styles.itemViewContainer}>
                <Image
                  style={styles.imageStyle}
                  source={{ uri: item.image_url }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.labelCategoryStyle}>{item.category}</Text>
                  <Text style={styles.textStyle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View style={styles.sourceContainer}>
                    <Image
                      source={{ uri: item.source_icon }}
                      style={styles.sourceImageStyle}
                    />
                    <Text style={styles.sourceTitleStyle}>
                      {item.source_name}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  itemViewContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: "#DAD9D9FF",
  },
  imageStyle: {
    width: 110,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
    paddingVertical: 8,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    flexWrap: "wrap",
    lineHeight: 22,
  },
  labelCategoryStyle: {
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  sourceContainer: {
    flexDirection: "row",
    gap: 10,
  },
  sourceImageStyle: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceTitleStyle: {
    color: Colors.darkGrey,
    fontSize: 16,
    fontWeight: "600",
  },
});

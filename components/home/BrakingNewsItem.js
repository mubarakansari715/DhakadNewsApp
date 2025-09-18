import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { HeightOfCarosel } from "./BrakingNews";

const { width } = Dimensions.get("screen");
export default function BrakingNewsItem({ item }) {
  const navigation = useNavigation();
  const navigationScreen = () => {
    navigation.navigate("newsdetails", {
      article_id: item.article_id,
    });
  };

  return (
    <Pressable onPress={navigationScreen}>
      <View style={styles.container} key={item.article_id}>
        <Image
          source={{
            uri: item.image_url,
          }}
          style={styles.imageStyle}
        />
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.linearGradientBackground}
        >
          <View style={styles.textOverly}>
            <View style={styles.sourceContainer}>
              {item.source_icon && (
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.sourceIconStyle}
                />
              )}

              <Text style={styles.sourceTitleStyle}>{item.source_name}</Text>
            </View>
            <Text style={styles.titleStyle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: width - 40,
    height: 258,
    borderRadius: 20,
  },
  linearGradientBackground: {
    position: "absolute",
    left: 20,
    right: 0,
    top: 0,
    borderRadius: 20,
    width: width - 40,
    height: 258,
  },
  textOverly: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 15,
    gap: 10,
  },
  titleStyle: {
    color: Colors.white,
    fontSize: 16,
  },

  sourceIconStyle: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  sourceTitleStyle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  sourceContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

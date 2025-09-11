import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../constants/Colors";
import Animated, {
  FadeInRight,
  FadeInUp,
  SlideInLeft,
  BounceIn,
  FadeInDown,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function IntroScreen({ navigation }) {
  const handlingNextScreen = () => {
    navigation.replace("tab");
  };

  // Animation values
  //   const fadeAnim = useSharedValue(0);
  //   const scaleAnim = useSharedValue(0.8);
  //   const buttonScale = useSharedValue(1);

  //   // Animated styles
  //   const titleAnimatedStyle = useAnimatedStyle(() => {
  //     return {
  //       opacity: fadeAnim.value,
  //       transform: [{ scale: scaleAnim.value }],
  //     };
  //   });

  //   const buttonAnimatedStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{ scale: buttonScale.value }],
  //     };
  //   });

  //   // Start animations on component mount
  //   useEffect(() => {
  //     // Fade in and scale up the title
  //     fadeAnim.value = withTiming(1, { duration: 1000 });
  //     scaleAnim.value = withTiming(1, { duration: 1000 });

  //     // Add a subtle pulse animation to the button
  //     buttonScale.value = withRepeat(
  //       withSequence(
  //         withTiming(1.05, { duration: 1000 }),
  //         withTiming(1, { duration: 1000 })
  //       ),
  //       -1,
  //       true
  //     );
  //   }, []);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/getting-started.jpg")}
      >
        <View style={styles.wraper}>
          <Animated.Text
            style={styles.textTitle}
            entering={FadeInRight.duration(1000).delay(200)}
          >
            Stay updated!
          </Animated.Text>
          <Animated.Text
            style={styles.textSubTitle}
            entering={FadeInUp.duration(800).delay(600)}
          >
            Get braking news and personalized updates direclty to your feed.
          </Animated.Text>
          <Animated.View entering={FadeInDown.duration(1000).delay(1000)}>
            <TouchableOpacity
              style={styles.button}
              onPress={handlingNextScreen}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wraper: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 80,
    marginHorizontal: 20,
    gap: 10,
  },
  button: {
    backgroundColor: Colors.tint,
    height: 55,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    height: 55,
    fontWeight: "400",
    lineHeight: 55,
  },
  textTitle: {
    color: Colors.white,
    lineHeight: 36,
    textAlign: "center",
    letterSpacing: 1.5,
    fontWeight: "600",
    fontSize: 20,
  },
  textSubTitle: {
    color: Colors.white,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: 1.2,
    fontWeight: "400",
    fontSize: 15,
  },
});

import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeInUp } from "react-native-reanimated";
import FormContainer from "../components/common/FormContainer";
import CustomInput from "../components/common/CustomInput";
import CustomButton from "../components/common/CustomButton";
import AnimatedContainer from "../components/common/AnimatedContainer";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux
  const dispatch = useDispatch();

  const loginHandling = async () => {
    if (email && password) {
      try {
        // Save login state to AsyncStorage
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("userEmail", email);

        // Update Redux state
        dispatch(userLogin(true));
      } catch (error) {
        console.error("Login error:", error);
        Alert.alert("Error", "Login failed. Please try again.");
      }
    } else {
      Alert.alert("Alert", "Please enter the Email and Password");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.container}>
        <AnimatedContainer
          animationType="fadeInDown"
          duration={1000}
          delay={200}
          style={styles.containerImage}
        >
          <FontAwesome name="newspaper-o" size={100} color={Colors.gray} />
          <Animated.Text
            style={styles.textTitleContainer}
            entering={FadeInRight.duration(800).delay(400)}
          >
            Dhakad News
          </Animated.Text>
        </AnimatedContainer>

        <FormContainer maxHeight={height - 200}>
          <Text style={styles.titleStyle}>Login Page</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={() => Keyboard.dismiss()}
            />

            <Animated.View entering={FadeInUp.duration(1000).delay(600)}>
              <CustomButton
                title="Login"
                onPress={loginHandling}
                style={styles.button}
              />
            </Animated.View>

            <Animated.View entering={FadeInRight.duration(1000).delay(800)}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.signupContainer}
              >
                <Text style={styles.signupText}>Signup account?</Text>
              </TouchableOpacity>
            </Animated.View>

            <View style={{ marginBottom: 20 }} />
          </ScrollView>
        </FormContainer>
      </View>
    </KeyboardAvoidingView>
  );
}
const { height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.tint,
    justifyContent: "flex-end",
  },
  containerImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitleContainer: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1.5,
    color: Colors.gray,
  },
  titleStyle: {
    paddingVertical: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
  },
  button: {
    marginTop: 10,
  },
  signupContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: Colors.gray,
  },
});

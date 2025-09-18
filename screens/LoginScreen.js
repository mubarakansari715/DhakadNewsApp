import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from "react-native-reanimated";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandling = () => {
    if (email && password) {
      navigation.navigate("tab");
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
        <Animated.View
          style={styles.containerImage}
          entering={FadeInDown.duration(1000).delay(200)}
        >
          <FontAwesome name="newspaper-o" size={100} color={Colors.gray} />
          <Animated.Text
            style={styles.textTitleContainer}
            entering={FadeInRight.duration(800).delay(400)}
          >
            Dhakad News
          </Animated.Text>
        </Animated.View>
        <View style={styles.boxContainer}>
          <Text style={styles.titleStyle}>Login Page</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <Text style={styles.inputTextTitle}>Email</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Enter your email"
                placeholderTextColor={Colors.gray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputSubContainer}>
              <Text style={styles.inputTextTitle}>Password</Text>
              <TextInput
                style={styles.inputTextStyle}
                placeholder="Enter you password"
                placeholderTextColor={Colors.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>
            <Animated.View entering={FadeInUp.duration(1000).delay(600)}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={loginHandling}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
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
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

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
  boxContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  titleStyle: {
    paddingVertical: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
  },
  inputContainer: { gap: 20 },
  inputSubContainer: {
    gap: 5,
  },
  inputTextTitle: {
    fontSize: 16,
    color: Colors.darkGrey,
  },
  inputTextStyle: {
    borderColor: Colors.darkGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 17,
  },
  button: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.white,
  },
  signupContainer: {
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: Colors.gray,
  },
});

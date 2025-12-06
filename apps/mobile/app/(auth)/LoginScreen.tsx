import { useAuth } from "@/hooks/use-auth";
import { useAuthAnimations } from "@/hooks/use-auth-animations";
import { LoginRequest } from "@/interfaces";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { authStyles } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    login,
    error: authError,
    clearError,
    isLoading: authLoading,
  } = useAuth();

  const { logoFadeAnim, logoScaleAnim, formSlideAnim, formFadeAnim } =
    useAuthAnimations();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
      };
      return await login(loginData);
    },
    onSuccess: (success) => {
      if (success) {
        reset();
        router.push("/HomeScreen");
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const handleSignIn = (data: LoginFormData) => {
    clearError();
    loginMutation.mutate(data);
  };

  const isLoading = authLoading || loginMutation.isPending;

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        style={authStyles.safeArea}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            style={[
              authStyles.imageContainer,
              {
                opacity: logoFadeAnim,
                transform: [{ scale: logoScaleAnim }],
              },
            ]}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={[
              authStyles.bottomCard,
              {
                opacity: formFadeAnim,
                transform: [{ translateY: formSlideAnim }],
              },
            ]}
          >
            <Text style={authStyles.title}>Welcome back</Text>
            <Text style={authStyles.subtitle}>
              Enter your email and password to access your account.
            </Text>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      authStyles.inputContainer,
                      errors.email && { borderColor: "#ff3b30" },
                    ]}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color="#888"
                      style={authStyles.inputIcon}
                    />
                    <TextInput
                      placeholder="you@example.com"
                      placeholderTextColor="#999"
                      style={authStyles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text style={{ color: "#ff3b30", fontSize: 12, marginTop: 4 }}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Password</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={[
                      authStyles.inputContainer,
                      errors.password && { borderColor: "#ff3b30" },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#888"
                      style={authStyles.inputIcon}
                    />
                    <TextInput
                      placeholder="Your password"
                      placeholderTextColor="#999"
                      style={[authStyles.input, authStyles.passwordInput]}
                      secureTextEntry={!showPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={authStyles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={{ color: "#ff3b30", fontSize: 12, marginTop: 4 }}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            <View style={authStyles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => router.push("/ForgotPasswordScreen")}
              >
                <Text style={authStyles.forgotPasswordText}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>

            {authError && (
              <View
                style={{
                  backgroundColor: "#fff5f5",
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 16,
                  borderLeftWidth: 4,
                  borderLeftColor: "#ff3b30",
                }}
              >
                <Text style={{ color: "#ff3b30", fontSize: 14 }}>
                  {authError.message}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[authStyles.primaryButton, isLoading && { opacity: 0.6 }]}
              onPress={handleSubmit(handleSignIn)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={authStyles.primaryButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <View style={authStyles.separator}>
              <View style={authStyles.separatorLine} />
              <Text style={authStyles.separatorText}>or continue with</Text>
              <View style={authStyles.separatorLine} />
            </View>

            <View style={authStyles.socialButtons}>
              <TouchableOpacity style={authStyles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={authStyles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={authStyles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#000000" />
                <Text style={authStyles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/RegisterScreen")}
            >
              <Text style={authStyles.footerText}>
                Don&apos;t have an account?{" "}
                <Text style={authStyles.footerLink}>Create account</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

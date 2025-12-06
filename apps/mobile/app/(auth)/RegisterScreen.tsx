import { useAuth } from "@/hooks/use-auth";
import { useAuthAnimations } from "@/hooks/use-auth-animations";
import { RegisterRequest } from "@/interfaces";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
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

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const registerData: RegisterRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: `+27${data.phone}`,
      };
      return await register(registerData);
    },
    onSuccess: (success, variables) => {
      if (success) {
        reset();
        router.replace({
          pathname: "/OTPVerificationScreen",
          params: { email: variables.email, type: "verify" },
        });
      }
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });

  const handleSignUp = (data: RegisterFormData) => {
    clearError();
    registerMutation.mutate(data);
  };

  const isLoading = authLoading || registerMutation.isPending;

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
            <Text style={authStyles.title}>Create your account</Text>
            <Text style={authStyles.subtitle}>
              Join us and start your journey today
            </Text>

            <View style={authStyles.row}>
              <View style={authStyles.halfInputWrapper}>
                <Text style={authStyles.label}>First name</Text>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        authStyles.inputContainer,
                        errors.firstName && { borderColor: "#ff3b30" },
                      ]}
                    >
                      <Ionicons
                        name="person-outline"
                        size={18}
                        color="#888"
                        style={authStyles.inputIcon}
                      />
                      <TextInput
                        placeholder="Jack"
                        placeholderTextColor="#999"
                        style={authStyles.input}
                        autoCapitalize="words"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                  )}
                />
                {errors.firstName && (
                  <Text
                    style={{ color: "#ff3b30", fontSize: 12, marginTop: 4 }}
                  >
                    {errors.firstName.message}
                  </Text>
                )}
              </View>
              <View style={authStyles.halfInputWrapper}>
                <Text style={authStyles.label}>Last name</Text>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        authStyles.inputContainer,
                        errors.lastName && { borderColor: "#ff3b30" },
                      ]}
                    >
                      <Ionicons
                        name="person-outline"
                        size={18}
                        color="#888"
                        style={authStyles.inputIcon}
                      />
                      <TextInput
                        placeholder="Smith"
                        placeholderTextColor="#999"
                        style={authStyles.input}
                        autoCapitalize="words"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </View>
                  )}
                />
                {errors.lastName && (
                  <Text
                    style={{ color: "#ff3b30", fontSize: 12, marginTop: 4 }}
                  >
                    {errors.lastName.message}
                  </Text>
                )}
              </View>
            </View>

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
                      placeholder="j.smith@example.com"
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
              <Text style={authStyles.label}>
                Phone number <Text style={{ color: "#999" }}>(optional)</Text>
              </Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={[authStyles.inputContainer]}>
                    <Ionicons
                      name="call-outline"
                      size={18}
                      color="#888"
                      style={authStyles.inputIcon}
                    />
                    <TextInput
                      placeholder="0787735258"
                      placeholderTextColor="#999"
                      style={authStyles.input}
                      keyboardType="phone-pad"
                      maxLength={10}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />
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
                      placeholder="At least 8 characters"
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

            {/* API Error Display */}
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
              onPress={handleSubmit(handleSignUp)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Text style={authStyles.primaryButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={authStyles.separator}>
              <View style={authStyles.separatorLine} />
              <View style={authStyles.separatorLine} />
            </View>

            <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
              <Text style={authStyles.footerText}>
                Already have an account?{" "}
                <Text style={authStyles.footerLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

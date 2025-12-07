import { useAuth } from "@/hooks/use-auth";
import { useAuthAnimations } from "@/hooks/use-auth-animations";
import { forgotPasswordSchema, type ForgotPasswordData } from "@talentry/validation";
import { authStyles, colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = () => {
  const {
    forgotPassword,
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
    getValues,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      return await forgotPassword({ email: data.email });
    },
    onSuccess: (success) => {
      if (success) {
        router.push({
          pathname: "/OTPVerificationScreen",
          params: { email: getValues("email") },
        });
      }
    },
    onError: (error: any) => {
      console.error("Forgot password mutation error:", error);
    },
  });

  const handleSubmitForm = (data: ForgotPasswordData) => {
    clearError();
    forgotPasswordMutation.mutate(data);
  };

  const isLoading = authLoading || forgotPasswordMutation.isPending;

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        translucent={false}
      />
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
            <Text style={authStyles.title}>Reset your password</Text>
            <Text style={styles.helperText}>
              No worries! Enter your email and we&apos;ll send you a code to
              reset it.
            </Text>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Email address</Text>
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
                      color={colors.textMuted}
                      style={authStyles.inputIcon}
                    />
                    <TextInput
                      placeholder="you@example.com"
                      placeholderTextColor={colors.textPlaceholder}
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
                <Text style={authStyles.errorText}>{errors.email.message}</Text>
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
              onPress={handleSubmit(handleSubmitForm)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.buttonText} />
              ) : (
                <Text style={authStyles.primaryButtonText}>
                  Send reset code
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backLink}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color={colors.text} />
              <Text style={styles.backLinkText}>Back to Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  backLinkText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;

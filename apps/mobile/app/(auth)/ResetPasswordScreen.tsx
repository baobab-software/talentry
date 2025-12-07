import { useAuth } from "@/hooks/use-auth";
import { useAuthAnimations } from "@/hooks/use-auth-animations";
import { authStyles, colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

const ResetPasswordScreen = () => {
  const params = useLocalSearchParams<{
    resetToken?: string;
    email?: string;
  }>();

  const resetTokenParam = Array.isArray(params.resetToken)
    ? params.resetToken[0]
    : params.resetToken;
  const resetToken = resetTokenParam ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const { resetPassword, isLoading, error, clearError } = useAuth();

  const { logoFadeAnim, logoScaleAnim, formSlideAnim, formFadeAnim } =
    useAuthAnimations();

  const handleFieldChange = (
    field: "password" | "confirmPassword",
    value: string
  ) => {
    if (field === "password") {
      setPassword(value);
    } else {
      setConfirmPassword(value);
    }

    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }

    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!resetToken) {
      Alert.alert("Error", "Reset token is missing. Please try again.", [
        {
          text: "OK",
          onPress: () => router.replace("/ForgotPasswordScreen"),
        },
      ]);
      return;
    }

    if (validateForm()) {
      console.log("Resetting password with token:", resetToken);

      const result = await resetPassword({
        token: resetToken,
        newPassword: password,
        confirmPassword: confirmPassword,
      });

      if (result.success) {
        Alert.alert(
          "Success",
          result.message ||
            "Password has been reset successfully. Please log in with your new password.",
          [
            {
              text: "OK",
              onPress: () => router.replace("/LoginScreen"),
            },
          ]
        );
      }
    }
  };

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
            <Text style={authStyles.title}>Create a new password</Text>
            <Text style={styles.helperText}>
              Choose a strong password you haven&apos;t used before.
            </Text>

            {error && (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color={colors.error} />
                <Text style={authStyles.errorText}>{error.message}</Text>
              </View>
            )}

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>New password</Text>
              <View
                style={[
                  authStyles.inputContainer,
                  errors.password && authStyles.inputError,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={colors.textMuted}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  placeholder="Minimum 8 characters"
                  placeholderTextColor={colors.textPlaceholder}
                  style={[authStyles.input, authStyles.passwordInput]}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => handleFieldChange("password", text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={authStyles.eyeIcon}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={authStyles.errorText}>{errors.password}</Text>
              )}
            </View>

            <View style={authStyles.inputWrapper}>
              <Text style={authStyles.label}>Confirm password</Text>
              <View
                style={[
                  authStyles.inputContainer,
                  errors.confirmPassword && authStyles.inputError,
                ]}
              >
                <Ionicons
                  name="shield-checkmark-outline"
                  size={18}
                  color={colors.textMuted}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  placeholder="Re-enter password"
                  placeholderTextColor={colors.textPlaceholder}
                  style={[authStyles.input, authStyles.passwordInput]}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={(text) =>
                    handleFieldChange("confirmPassword", text)
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={authStyles.eyeIcon}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={authStyles.errorText}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                authStyles.primaryButton,
                isLoading && authStyles.buttonDisabled,
              ]}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.buttonText} />
              ) : (
                <Text style={authStyles.primaryButtonText}>Reset password</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backLink}
              onPress={() => router.replace("/LoginScreen")}
            >
              <Ionicons name="log-in-outline" size={16} color={colors.text} />
              <Text style={styles.backLinkText}>Return to Sign In</Text>
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
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.errorBackground || "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
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

export default ResetPasswordScreen;

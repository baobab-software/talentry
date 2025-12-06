import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/use-auth";
import { useAuthAnimations } from "@/hooks/use-auth-animations";
import { authStyles, colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

const OtpVerificationScreen = () => {
  const router = useRouter();
  const { email, type } = useLocalSearchParams<{
    email: string;
    type?: string;
  }>();
  const {
    verifyAccount,
    verifyOTP,
    forgotPassword,
    error: authError,
    clearError,
    isLoading: authLoading,
  } = useAuth();
  const { checkAuth } = useAuthContext();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { logoFadeAnim, logoScaleAnim, formSlideAnim, formFadeAnim } =
    useAuthAnimations();

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(
      () => setTimer((prev) => Math.max(prev - 1, 0)),
      1000
    );
    return () => clearInterval(interval);
  }, [timer]);

  const verifyMutation = useMutation({
    mutationFn: async (otp: string) => {
      if (type === "verify") {
        return await verifyAccount(email, otp);
      } else {
        return await verifyOTP({ email, otp });
      }
    },
    onSuccess: async (result) => {
      if (type === "verify" && result.success) {
        await checkAuth();
        router.replace("/OnboardingScreen");
      } else if (type === "reset" && result.success) {
        router.push({
          pathname: "/ResetPasswordScreen",
          params: {
            email,
            resetToken: result.token,
          },
        });
      } else {
        setCode(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    },
    onError: () => {
      setCode(["", "", "", "", "", ""]);
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    },
  });

  const resendOTPMutation = useMutation({
    mutationFn: async () => {
      return await forgotPassword({ email });
    },
    onSuccess: (success) => {
      if (success) {
        setTimer(60);
        setCanResend(false);
        clearError();
      }
    },
    onError: () => {},
  });

  const handleCodeChange = (value: string, index: number) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    const updated = [...code];
    updated[index] = sanitized;
    setCode(updated);
    clearError();

    if (sanitized && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    { nativeEvent }: { nativeEvent: { key: string } },
    index: number
  ) => {
    if (nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    verifyMutation.mutate(code.join(""));
  };

  const handleResend = () => {
    if (!canResend || resendOTPMutation.isPending) {
      return;
    }
    clearError();
    setCode(["", "", "", "", "", ""]);
    resendOTPMutation.mutate();
  };

  const isCodeComplete = code.every((digit) => digit !== "");
  const isLoading = authLoading || verifyMutation.isPending;

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
            <Text style={authStyles.title}>Enter the 6-digit code</Text>
            <Text style={styles.helperText}>
              Enter the code we sent to {email}. It expires shortly, so
              don&apos;t wait too long.
            </Text>

            <View style={styles.otpContainer}>
              {code.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    focusedIndex === index && styles.otpInputFocused,
                    authError && styles.otpInputError,
                  ]}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  maxLength={1}
                  value={value}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                />
              ))}
            </View>

            {authError && (
              <View style={styles.errorContainer}>
                <Text style={authStyles.errorText}>{authError.message}</Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                authStyles.primaryButton,
                (!isCodeComplete || isLoading) && { opacity: 0.6 },
              ]}
              onPress={handleVerify}
              disabled={!isCodeComplete || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.buttonText} />
              ) : (
                <Text style={authStyles.primaryButtonText}>
                  Verify &amp; continue
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn&apos;t receive it?</Text>
              <TouchableOpacity
                disabled={!canResend || resendOTPMutation.isPending}
                onPress={handleResend}
              >
                <Text
                  style={[
                    styles.resendButton,
                    (!canResend || resendOTPMutation.isPending) &&
                      styles.resendDisabled,
                  ]}
                >
                  {resendOTPMutation.isPending
                    ? "Sending..."
                    : !canResend
                      ? `Resend in ${timer}s`
                      : "Resend code"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backLink}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={16} color={colors.text} />
              <Text style={styles.backLinkText}>Use a different email</Text>
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  otpInputFocused: {
    borderColor: colors.text,
    backgroundColor: colors.white,
  },
  otpInputError: {
    borderColor: colors.borderError,
  },
  errorContainer: {
    marginBottom: 16,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 16,
  },
  resendText: {
    fontSize: 14,
    color: colors.textLight,
  },
  resendButton: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  resendDisabled: {
    color: colors.textMuted,
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 24,
  },
  backLinkText: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default OtpVerificationScreen;

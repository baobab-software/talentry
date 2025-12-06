import { useAuthAnimations } from "@/hooks/use-auth-animations";
import { router } from "expo-router";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface OnboardingScreenProps {
  onComplete: () => void | Promise<void>;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const { logoFadeAnim, formSlideAnim, formFadeAnim } = useAuthAnimations();

  const handleGetStarted = async () => {
    if (onComplete) {
      await onComplete();
    }
    router.push("/RegisterScreen");
  };

  const handleLogin = async () => {
    if (onComplete) {
      await onComplete();
    }
    router.push("/LoginScreen");
  };

  return (
    <View style={styles.safeArea}>
      <Animated.Image
        source={require("../assets/images/background/onboarding.jpg")}
        style={[
          styles.backgroundImage,
          {
            opacity: logoFadeAnim,
          },
        ]}
      />

      <View style={styles.container}>
        <Animated.View
          style={[
            styles.bottomCard,
            {
              opacity: formFadeAnim,
              transform: [{ translateY: formSlideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Find your dream job</Text>

          <Text style={styles.subtitle}>
            Discover opportunities, connect with employers, and advance your
            career—your journey starts here.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLogin}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  bottomCard: {
    backgroundColor: "rgba(26, 26, 26, 0.85)",
    paddingVertical: 40,
    paddingHorizontal: 25,
    borderRadius: 30,
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#b0b0b0",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },

  primaryButton: {
    backgroundColor: "#FFB800",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#FFB800",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  primaryButtonText: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "700",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 0,
    paddingVertical: 16,
    borderRadius: 12,
  },

  secondaryButtonText: {
    textAlign: "center",
    color: "#1a1a1a",
    fontWeight: "600",
    fontSize: 16,
  },
});

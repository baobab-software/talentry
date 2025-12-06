import { useAuthContext } from "@/contexts/AuthContext";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

const RootLayoutNav = () => {
  const pathname = usePathname();
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthContext();

  const authRoutes = [
    "/LoginScreen",
    "/RegisterScreen",
    "/ForgotPasswordScreen",
    "/OTPVerificationScreen",
    "/ResetPasswordScreen",
  ];

  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));
  const isLandingPage = pathname === "/" || pathname === "";

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isOnLandingPage = pathname === "/";

    if (isAuthenticated) {
      if (inAuthGroup || isOnLandingPage) {
        router.replace("/HomeScreen");
      }
    } else if (!isAuthenticated && !inAuthGroup && !isOnLandingPage) {
      router.replace("/LoginScreen");
    }
  }, [isAuthenticated, segments, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style="dark" backgroundColor="#ffffff" hidden={false} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor="#ffffff"
        hidden={isAuthRoute || isLandingPage}
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default RootLayoutNav;

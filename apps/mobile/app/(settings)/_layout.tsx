import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsScreen" options={{ title: "Settings" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      <Stack.Screen
        name="account/AccountScreen"
        options={{ title: "Account" }}
      />
      <Stack.Screen
        name="communications/CommunicationsScreen"
        options={{ title: "Communications" }}
      />
      <Stack.Screen
        name="privacy/PrivacyScreen"
        options={{ title: "Privacy" }}
      />
      <Stack.Screen
        name="security/SecurityScreen"
        options={{ title: "Security" }}
      />
    </Stack>
  );
};

export default SettingsLayout;

import { Stack } from "expo-router";

const SettingsProfileLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="JobPreferenceScreen" />
      <Stack.Screen name="PersonalInfoScreen" />
      <Stack.Screen name="PrivacyScreen" />
      <Stack.Screen name="ProfileScreen" />
      <Stack.Screen name="QualificationsScreen" />
    </Stack>
  );
};

export default SettingsProfileLayout;

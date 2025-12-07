import { Ionicons } from "@expo/vector-icons";

export interface SettingItem {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

export interface SettingsSection {
  title?: string;
  items: SettingItem[];
}

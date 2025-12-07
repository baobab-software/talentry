import { colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  title: string;
  icon: string;
  route: string;
  description: string;
  completeness?: number;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  title,
  icon,
  route,
  description,
  completeness,
}) => {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push(route as any)}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Navigate to ${title}`}
      accessibilityHint="Double tap to open"
    >
      <View style={styles.menuItemContent}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color={colors.buttonPrimary} />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          <Text style={styles.menuItemDescription}>{description}</Text>
        </View>
        {completeness !== undefined && (
          <View style={styles.completenessIndicator}>
            <Text style={styles.completenessText}>{completeness}%</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: colors.textMuted,
  },
  completenessIndicator: {
    backgroundColor: colors.buttonPrimary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  completenessText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
});

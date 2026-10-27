import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";
import { layout } from "@/constant/layout";
import { StyleSheet } from "react-native";
import { ThemeType } from "@/types/theme-types";

export default function TabsLayout() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }} >
      <Tabs.Screen name="home" options={{
        title: 'Home',

        headerShown: false,
        tabBarIcon: () => (
          <Ionicons name="home" size={24} color={colorScheme === "dark" ? layout.colors.primary : layout.colors.gray} />
        )
      }} />

      <Tabs.Screen name="profile/page" options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: () => (
          <Ionicons name="person" size={24} color={colorScheme === "dark" ? layout.colors.primary : layout.colors.gray} />
        )
      }} />

      <Tabs.Screen name="settings" options={{
        title: 'Settings',
        headerShown: false,
        tabBarIcon: () => (
          <Ionicons name="settings" size={24} color={colorScheme === "dark" ? layout.colors.primary : layout.colors.gray} />
        )
      }} />
      <Tabs.Screen name="models" options={{
        title: 'Models',
        headerShown: false,
        tabBarButton: () => null,
        tabBarItemStyle: { display: 'none' },
        // href: null,
      }} />
      <Tabs.Screen name="profile/edit/page"
        options={{
          title: 'Edit Profile',
          headerShown: false,
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' },
        }} />

    </Tabs>
  );
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    marginBottom: "-5%",
    backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
  }
});
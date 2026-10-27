import Header from "@/components/base/header";
import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
export default function EditProfile() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Header title="Edit Profile" />
    </SafeAreaView>
  )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
  },
});
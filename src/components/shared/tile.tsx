import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { View, Text, StyleSheet } from "react-native";

type FeatureTileProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
  };
  
export default function FeatureTile({ icon, label, value }: FeatureTileProps) {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    return (
      <View style={styles.tile}>
        {icon}
        <Text style={styles.tileLabel}>{label}</Text>
        <Text style={styles.tileValue}>{value}</Text>
      </View>
    );
  }

  const getStyles = (theme: ThemeType) => StyleSheet.create({
    tile: {
        // 3 колонки с зазором 12
        width: "31%",
        flexGrow: 1,
        backgroundColor: "#1A1C1E",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        gap: 6,
      },
      tileLabel: {
        fontFamily: layout.fonts.poppins.poppinsMedium,
        fontSize: 10,
        color: "#B5B5B5",
      },
      tileValue: {
        fontFamily: layout.fonts.poppins.poppinsSemiBold,
        fontSize: 12,
        color: layout.colors.white,
      },
  });
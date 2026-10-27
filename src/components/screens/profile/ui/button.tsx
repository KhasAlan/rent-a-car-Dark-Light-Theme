import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";

import { Pressable, StyleSheet, Text } from "react-native";


interface ButtonProps {
    onPress: () => void;
    children: React.ReactNode;
}

export default function Button({ onPress, children }: ButtonProps) {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    return (
        <Pressable onPress={onPress} style={styles.button}>
            {children}
        </Pressable>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    button: {
        backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#F9B401",
        
    },
});
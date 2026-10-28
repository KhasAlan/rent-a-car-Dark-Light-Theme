
import Brands from "@/components/shared/brands";
import Models from "@/components/shared/models";
import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModelsScreen() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const [selectedSlug, setSelectedSlug] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Models</Text>
            </View>

            <View style={styles.modelsContainer}>
                <Brands setSelectedSlug={setSelectedSlug} />

                <View style={styles.modelsList}>
                    <Models selectedSlug={selectedSlug} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const getStyles = (theme: ThemeType) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                theme === "dark"
                    ? layout.colors.black
                    : layout.colors.white,
            paddingHorizontal: 16,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
        },
        headerTitle: {
            fontFamily: layout.fonts.poppins.poppinsSemiBold,
            fontSize: 20,
            color:
                theme === "dark"
                    ? layout.colors.primary
                    : layout.colors.black,
        },
        modelsContainer: {
            flex: 1,
            gap: 24,
        },
        modelsList: {
            flex: 1,
        },
    });


import Brands from "@/components/shared/brands";
import Models from "@/components/shared/models";
import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ModelsScreen() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const { selectedSlug: initialSlug} = useLocalSearchParams<{ selectedSlug?: string}>();

    const [selectedSlug, setSelectedSlug] = useState(initialSlug ?? "");

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Models</Text>
            </View>

            <View style={styles.modelsContainer}>
                <View>
                    <Brands setSelectedSlug={setSelectedSlug}/>
                </View>
                <View>
                    <Models selectedSlug={selectedSlug} />
                </View>
            </View>

        </SafeAreaView>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontFamily: layout.fonts.poppins.poppinsSemiBold,
        fontSize: 20,
        color: theme === "dark" ? layout.colors.primary : layout.colors.black,
    },
    modelsContainer: {
        gap: 24,
    },
});
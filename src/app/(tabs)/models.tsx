
import Brands from "@/components/shared/brands";
import Models from "@/components/shared/models";
import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ModelsScreen(){
    const {colorScheme} = useTheme();
    const colors = layout.colors[colorScheme];
    const styles = getStyles(colors);


        const { selectedSlug: initialSlug } =
            useLocalSearchParams<{ selectedSlug?: string}>();
        const [selectedSlug, setSelectedSlug] = useState(initialSlug ?? "");


        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Models</Text>
                </View>


                <View style={styles.modelsContainer}>
                    <View>
                        <Brands setSelectedSlug={setSelectedSlug} />
                    </View>


                    <View>
                        <Models selectedSlug={selectedSlug} />
                    </View>
                </View>
            </SafeAreaView>
        );
}


const getStyles = (colors: typeof layout.colors.light) => 
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: 16,
        },


        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        headerTitle: {
            fontFamily: layout.fonts.poppins.poppinsBold,
            fontSize: 20,
            color: colors.text
        },

        modelsContainer: {
            gap: 24,
        },
    });

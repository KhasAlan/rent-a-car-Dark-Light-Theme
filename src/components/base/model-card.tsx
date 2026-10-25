import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { Car } from "@/types/car.type";
import { ThemeType } from "@/types/theme-types";
import {
    Image,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
interface ModelCardProps {
    model: Car;
}

export default function ModelCard({ model }: ModelCardProps) {
    const { colorScheme } = useTheme();//eto ubrat ?


    const styles = getStyles(colorScheme);

    const width = useWindowDimensions().width;

        return (
            <View style={[styles.modelCard, { width: width - 32 }]}>
            <View style={styles.modelCardTitle}>
                <View style={styles.modelCardBrandName}>
                    <Text style={styles.modelCardBrand}>{model.brand}</Text>
                    <Text style={styles.modelCardModel}>{model.model}</Text>
                </View>
                <Text style={styles.modelPricePerDay}>${model.pricePerDay}</Text>
            </View>
            <Image source={{ uri: model.image }} style={styles.modelCardImage} />

        </View>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    modelCard: {
        position: "relative",
        padding: 18,
        borderRadius: 16,
        backgroundColor: theme === "dark"
            ? layout.colors.dark.surface
            : layout.colors.light.surface,
        minHeight: 200,
    },
    modelCardTitle: {
        flex: 1,
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    modelCardBrandName: {
        gap:0,
    },
    modelCardBrand: {
        fontFamily: layout.fonts.poppins.poppinsBold,
        color: theme === "dark" ? layout.colors.dark.text  : layout.colors.light.text,
    },
    modelCardModel: {
        fontFamily: layout.fonts.poppins.poppinsSemiBold,
        fontSize: 12,

        color: theme === "dark" ? layout.colors.dark.secondaryText
        : layout.colors.light.secondaryText
    },


    

    modelPricePerDay: {
        fontFamily: layout.fonts.poppins.poppinsBold,
         color: theme === "dark" ? layout.colors.dark.text : layout.colors.light.text,
    },

   
    modelCardImage: {},

    
});
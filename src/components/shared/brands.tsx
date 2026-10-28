
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
} from "react-native";
import { carLogos } from "@/mock/car-logo";
import { CarBrand } from "@/types/car.type";
import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";

interface BrandsProps {
    setSelectedSlug: (slug: string) => void;
}

export default function Brands({ setSelectedSlug }: BrandsProps) {
    const { colorScheme } = useTheme();
    const colors = layout.colors[colorScheme];
    const styles = getStyles(colors);

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {carLogos.map((brand: CarBrand) => (
                <Pressable
                    key={brand.slug}
                    style={styles.brand}
                    onPress={() => setSelectedSlug(brand.slug)}
                >
                    <Image
                        source={{ uri: brand.image.thumb }}
                        style={styles.image}
                    />
                </Pressable>
            ))}
        </ScrollView>
    );
}

const getStyles = (colors: typeof layout.colors.light) =>
    StyleSheet.create({
        container: {
            gap: 12,
            paddingLeft: 14,
        },
        brand: {
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            backgroundColor: colors.surface,
            alignItems: "center",
            justifyContent: "center",
            padding: 12,
        },
        image: {
            width: 60,
            height: 50,
        },
    });

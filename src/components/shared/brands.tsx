import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { carLogos } from "@/mock/car-logo";
import { CarBrand } from "@/types/car.type";
import { useState } from "react";

interface BrandsProps {
    setSelectedSlug: (slug: string) => void;
}


export default function Brands({ setSelectedSlug }: BrandsProps) {

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            {carLogos.map((brand: CarBrand) => (
                <Pressable key={brand.slug} style={styles.brand} onPress={() => setSelectedSlug(brand.slug)}>
                    <Image source={{ uri: brand.image.thumb }} style={styles.image} />
                </Pressable>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        paddingLeft: 14,
    },
    brand: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "#fff",
        boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.1)",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    image: {
        width: 60,
        height: 50,
    },
})
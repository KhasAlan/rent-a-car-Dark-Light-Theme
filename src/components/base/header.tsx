import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderProps {
    title?: string;
}

export default function Header({ title }: HeaderProps) {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: top + 16 }]}>
            <StatusBar style="light" />
            <Pressable onPress={() => router.back()} >
                <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
            <View/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        padding: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
});
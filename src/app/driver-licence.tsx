
    import { layout } from "@/constant/layout";
    import { useTheme } from "@/hooks/use-theme";
    import { ThemeType } from "@/types/theme-types";
    import * as ImagePicker from "expo-image-picker";
    import { router } from "expo-router";
    import { useState } from "react";
    import {
        Alert,
        Image,
        Pressable,
        ScrollView,
        StyleSheet,
        Text,
        TextInput,
        View,
    } from "react-native";
    import { Ionicons } from "@expo/vector-icons";
    import { SafeAreaView } from "react-native-safe-area-context";

    export default function DriverLicenceScreen() {
        const { colorScheme } = useTheme();
        const styles = getStyles(colorScheme);

        const [licenceNumber, setLicenceNumber] = useState("");
        const [expiryDate, setExpiryDate] = useState("");
        const [imageUri, setImageUri] = useState<string | null>(null);

        const chooseImage = async () => {
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                Alert.alert("Permission required", "Allow access to your photos.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        };

        const takePhoto = async () => {
            const permission =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
                Alert.alert("Permission required", "Allow access to your camera.");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        };

        const handleUpload = () => {
            Alert.alert("Upload licence", "Choose how to add your licence photo.", [
                { text: "Take a photo", onPress: takePhoto },
                { text: "Choose from gallery", onPress: chooseImage },
                { text: "Cancel", style: "cancel" },
            ]);
        };

        const handleCheckout = () => {
            if (!licenceNumber.trim() || !expiryDate.trim() || !imageUri) {
                Alert.alert(
                    "Missing information",
                    "Enter your licence number and expiry date, then add a photo."
                );
                return;
            }

            Alert.alert("Success", "Driving licence information completed.");
        };

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} hitSlop={12}>
                        <Ionicons
                            name="chevron-back"
                            size={28}
                            color={styles.title.color as string}
                        />
                    </Pressable>
                    <Text style={styles.title}>Information</Text>
                    <View style={{ width: 28 }} />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <View style={styles.progress}>
                            <View style={styles.dot} />
                            <View style={styles.line} />
                            <View style={styles.dot} />
                        </View>

                        <Text style={styles.sectionTitle}>Driving Licence</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Licence Number"
                            placeholderTextColor="#999999"
                            value={licenceNumber}
                            onChangeText={setLicenceNumber}
                            autoCapitalize="characters"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Expiry Date (DD/MM/YYYY)"
                            placeholderTextColor="#999999"
                            value={expiryDate}
                            onChangeText={setExpiryDate}
                            keyboardType="numbers-and-punctuation"
                        />

                        <Text style={styles.uploadTitle}>
                            Upload Your Licence Photo
                        </Text>

                        <Pressable
                            style={styles.uploadArea}
                            onPress={handleUpload}
                        >
                            {imageUri ? (
                                <Image
                                    source={{ uri: imageUri }}
                                    style={styles.preview}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Ionicons
                                    name="camera-outline"
                                    size={76}
                                    color={layout.colors.primary}
                                />
                            )}

                            <Text style={styles.hint}>
                                {imageUri
                                    ? "Tap to change photo"
                                    : "Take a photo or choose from gallery"}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.checkout}
                            onPress={handleCheckout}
                        >
                            <Text style={styles.checkoutText}>Check out</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    const getStyles = (theme: ThemeType) =>
        StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor:
                    theme === "dark" ? layout.colors.black : layout.colors.white,
            },
            header: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 14,
            },
            title: {
                fontFamily: layout.fonts.poppins.poppinsSemiBold,
                fontSize: 20,
                color:
                    theme === "dark" ? layout.colors.white : layout.colors.black,
            },
            scrollContent: {
                flexGrow: 1,
                paddingHorizontal: 16,
                paddingBottom: 20,
            },
            card: {
                flex: 1,
                backgroundColor:
                    theme === "dark"
                        ? layout.colors.dark.surface
                        : layout.colors.light.surface,
                borderTopLeftRadius: 48,
                borderTopRightRadius: 48,
                paddingHorizontal: 24,
                paddingTop: 34,
                paddingBottom: 24,
            },
            progress: {
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 36,
            },
            dot: {
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: layout.colors.primary,
            },
            line: {
                flex: 1,
                height: 3,
                backgroundColor: layout.colors.primary,
            },
            sectionTitle: {
                fontFamily: layout.fonts.poppins.poppinsBold,
                fontSize: 22,
                color:
                    theme === "dark"
                        ? layout.colors.dark.text
                        : layout.colors.light.text,
                marginBottom: 18,
            },
            input: {
                height: 58,
                borderWidth: 1,
                borderColor: "#D9D9D9",
                borderRadius: 9,
                paddingHorizontal: 16,
                marginBottom: 24,
                fontSize: 16,
                color:
                    theme === "dark"
                        ? layout.colors.dark.text
                        : layout.colors.light.text,
            },
            uploadTitle: {
                fontFamily: layout.fonts.poppins.poppinsBold,
                fontSize: 17,
                textAlign: "center",
                color:
                    theme === "dark"
                        ? layout.colors.dark.text
                        : layout.colors.light.text,
                marginTop: 24,
                marginBottom: 18,
            },
            uploadArea: {
                minHeight: 230,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 22,
            },
            preview: {
                width: "100%",
                height: 190,
                borderRadius: 12,
            },
            hint: {
                fontSize: 12,
                marginTop: 12,
                textAlign: "center",
                color: "#888888",
            },
            checkout: {
                height: 52,
                borderRadius: 28,
                backgroundColor: layout.colors.primary,
                alignItems: "center",
                justifyContent: "center",
                marginTop: "auto",
            },
            checkoutText: {
                fontFamily: layout.fonts.poppins.poppinsBold,
                fontSize: 16,
                color: "#FFFFFF",
            },
        });

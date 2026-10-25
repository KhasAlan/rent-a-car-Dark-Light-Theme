import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { SymbolView } from "expo-symbols";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from "react-native";


import { router } from "expo-router";
import { signUpSchema, SignUpSchema } from "./auth.schema";

const USER_STORAGE_KEY = "user";
const USER_AUTH_STORAGE_KEY = "user_auth";

export default function SignUpForm() {
    const { width, height } = useWindowDimensions();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {  name: "", email: "", password: "", confirmPassword: "" },
    });

    const onSubmit = async ({ confirmPassword, ...user }: SignUpSchema) => {
        try {
            await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            await AsyncStorage.setItem(USER_AUTH_STORAGE_KEY, JSON.stringify(true));
            reset();
            Alert.alert("Success", "Account created");
            router.replace("/auth/sign-in");
        } catch (error) {
            console.error("Sign up failed:", error);
            Alert.alert("Error", "Could not create your account. Please try again.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar style="light" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                bounces={false}
            >
                <View
                    style={[
                        styles.headerBackground,
                        {
                            height: height * 0.55,
                            left: -width * 0.25,
                            right: -width * 0.25,
                            borderBottomLeftRadius: width,
                            borderBottomRightRadius: width,
                        },
                    ]}
                />

                <View style={[styles.logoContainer, { height: height * 0.42 }]}>
                    <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Sign up to join</Text>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.field}>
                                <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                                    <SymbolView
                                        name={{ ios: "person.fill", android: "person", web: "person" }}
                                        size={20}
                                        tintColor="#B5B5B5"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Name"
                                        placeholderTextColor="#B5B5B5"
                                        autoCapitalize="words"
                                        autoComplete="name"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.field}>
                                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                    <SymbolView
                                        name={{ ios: "envelope", android: "mail", web: "mail" }}
                                        size={20}
                                        tintColor="#B5B5B5"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email Address"
                                        placeholderTextColor="#B5B5B5"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.field}>
                                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                    <SymbolView
                                        name={{ ios: "lock.fill", android: "lock", web: "lock" }}
                                        size={20}
                                        tintColor="#B5B5B5"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="#B5B5B5"
                                        secureTextEntry
                                        autoCapitalize="none"
                                        autoComplete="new-password"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                                {errors.password && (
                                    <Text style={styles.errorText}>{errors.password.message}</Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={styles.field}>
                                <View
                                    style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}
                                >
                                    <SymbolView
                                        name={{ ios: "lock.fill", android: "lock", web: "lock" }}
                                        size={20}
                                        tintColor="#B5B5B5"
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#B5B5B5"
                                        secureTextEntry
                                        autoCapitalize="none"
                                        autoComplete="new-password"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>
                                {errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                                )}
                            </View>
                        )}
                    />

              <Pressable
           style={({ pressed }) => [
        styles.button,
        styles.primaryButton,
        pressed && styles.pressed,
    ]}
    onPress={() => {
        void handleSubmit(onSubmit)();
    }}
    disabled={isSubmitting}
>
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Sign up</Text>
                        )}
                    </Pressable>

                    <Text style={styles.divider}>or</Text>

                    <Pressable
                        style={({ pressed }) => [styles.button, styles.facebookButton, pressed && styles.pressed]}
                    >
                        <Text style={styles.facebookIcon}>f</Text>
                        <Text style={styles.buttonText}>Sign up with facebook</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    headerBackground: {
        position: "absolute",
        top: 0,
        backgroundColor: "#000000",
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
    },
    logo: {
        width: 220,
        height: 220,
        resizeMode: "contain",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 56,
        marginHorizontal: 36,
        marginTop: -80,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#C4C4C4",
        textAlign: "center",
        marginBottom: 18,
    },
    field: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        borderWidth: 1,
        borderColor: "#C4C4C4",
        borderRadius: 24,
        paddingHorizontal: 24,
        gap: 14,
    },
    inputError: {
        borderColor: "#E5484D",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 15,
        color: "#333333",
    },
    errorText: {
        color: "#E5484D",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 24,
    },
    button: {
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    primaryButton: {
        backgroundColor: "#EFB83F",
    },
    facebookButton: {
        backgroundColor: "#3F5498",
    },
    pressed: {
        opacity: 0.8,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "500",
    },
    facebookIcon: {
        position: "absolute",
        left: 28,
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
    },
    divider: {
        textAlign: "center",
        color: "#C4C4C4",
        fontSize: 14,
        marginVertical: 22,
    },
});

  import { USER_AUTH_STORAGE_KEY } from "@/components/auth/ui/sign-in-form";
  import Header from "@/components/base/header";
  import Button from "@/components/screens/profile/ui/button";
  import { layout } from "@/constant/layout";
  import { useTheme } from "@/hooks/use-theme";
  import { ThemeType } from "@/types/theme-types";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { router } from "expo-router";
  import { StatusBar } from "expo-status-bar";
  import { Pressable, StyleSheet, Text, View } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  export default function Profile() {

    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    const clearStorage = async () => {
      try {
      await AsyncStorage.setItem(USER_AUTH_STORAGE_KEY, JSON.stringify(false));
      router.replace("/auth/sign-in");
      } catch (e) {
        console.error('Failed to clear async storage.', e);
      }
    };

    const handleEditProfile = () => {
      router.push("/profile/edit/page");
    }



    return (

      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <Header title="Profile" />
        <View style={styles.buttonContainer}>

          <Button onPress={handleEditProfile}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Button>

          <Button onPress= {() => router.push("/driver-licence")}>
            <Text style={styles.buttonText}>Driver License</Text>
          </Button>

          <Button onPress={clearStorage}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Button>
        </View>
      </SafeAreaView>

    );
  }

  const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: 24,
      paddingHorizontal: 16,
      gap: 16,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === "dark" ? layout.colors.primary : layout.colors.black,
    },
  });
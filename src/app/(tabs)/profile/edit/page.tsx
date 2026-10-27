import Header from "@/components/base/header";
import { layout } from "@/constant/layout";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme-types";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

export default function EditProfile() {
  const { colorScheme } = useTheme();
  const styles = getStyles(colorScheme);
  const { top } = useSafeAreaInsets();

  const [avatar, setAvatar] = useState<string | null>(null);

  const getPhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.granted) {
      const resultCamera = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })
      if (!resultCamera.canceled) {
        setAvatar(resultCamera.assets[0].uri);
      }
    }
  }

  const getGallery = async () => {
    const resultGallery = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!resultGallery.canceled) {
      setAvatar(resultGallery.assets[0].uri);
    }
  }

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    // Show action sheet for select camera or gallery
    Alert.alert(
      'Upload Avatar',
      "Choose an option",
      [
        {
          text: 'Take photo',
          onPress: getPhoto
        },
        {
          text: 'Choose from gallery',
          onPress: getGallery
        },
        {
          text: 'Cancel',
          style: 'cancel',
        }
      ],
      { cancelable: true }
    )

  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <Header />

      {/* Rounded avatar with border */}
      <View style={[styles.avatarContainer, { marginTop: top + 20 }]}>
        <View style={styles.avatarOverlay}>
          <Image source={avatar ? { uri: avatar } : require('@/assets/images/avatar.avif')} style={styles.avatar} />
          <Pressable style={styles.cameraButton} onPress={pickImage}>
            <Ionicons name="camera" size={24} color="black" />
          </Pressable>
        </View>

      </View>

    </SafeAreaView>
  )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
  },
  avatarContainer: {
    position: 'absolute',
    top: '0%',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: layout.colors.primary,
    backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
    alignSelf: "center",
  },
  avatarOverlay: {
    position: 'relative'
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 4,
    borderWidth: 1,
    borderColor: layout.colors.primary,
  },
});
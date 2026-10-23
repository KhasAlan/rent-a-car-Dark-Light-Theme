import Brands from '@/components/shared/brands';
import Models from '@/components/shared/models';
import { layout } from '@/constant/layout';
import { useTheme } from '@/hooks/use-theme';
import { ThemeType } from '@/types/theme-types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const { colorScheme } = useTheme()
  const styles = getStyles(colorScheme)

  const [selectedSlug, setSelectedSlug] = useState("");


  return (
    <View
      style={styles.contentContainer}
    >

      <View style={[styles.container, { paddingTop: top + 16 }]}>
        <StatusBar style="light" />
        <View style={styles.inputContainer}>
          <Ionicons name="search" size={24} color="#B5B5B5" />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#B5B5B5"
            autoCapitalize="words"
            autoComplete="name"
          />
        </View>

        <View />
      </View>
      <View style={styles.brandsContainer}>
        <Text style={styles.brandsTitle}> Brands</Text>
        <Brands setSelectedSlug={setSelectedSlug} />
      </View>


      <View style={styles.modelsHeader}>
        <Text style={styles.modelsTitle}>Hot Deals</Text>
        <Pressable onPress={() => router.push('/(tabs)/models')}>
          <Text style={styles.viewAllText}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.modelsContainer}>
        <Models selectedSlug={selectedSlug}  />
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 64,
    marginBottom: 64,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    color: "#000",
  },
  brandsContainer: {
    marginTop: -64,
  },
  brandsTitle: {
    fontFamily: layout.fonts.poppins.poppinsSemiBold,
    fontSize: 20,
    color: "#fff",
    marginBottom: 8,
    marginLeft: 14,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: theme === "dark" ? layout.colors.black : layout.colors.white,
  },
  modelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modelsHeader: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  modelsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: theme === "dark" ? layout.colors.white : layout.colors.black,
  },
  viewAllText: {
    fontFamily: layout.fonts.poppins.poppinsRegular,
    fontSize: 16,
    color: layout.colors.primary,
  },
});
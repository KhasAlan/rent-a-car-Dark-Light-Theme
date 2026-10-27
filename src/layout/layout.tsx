import { oswaldFont, poppinsFont } from "@/constant/fonts";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

export default function LayoutContent (){


 const [loaded, error] = useFonts({...poppinsFont, ...oswaldFont})

 useEffect(() => {
  if (loaded || error) {
    SplashScreen.hideAsync();
  }
}, [loaded, error]);

if (!loaded && !error) {
  return null;
}

if (error) {
  return <Text>Error loading fonts</Text>;
}

  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="auth/sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="car-details/[id]/page" options={{ headerShown: false }} />
    </Stack>
  )
}
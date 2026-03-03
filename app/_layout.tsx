import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/theme";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useInitialAuth } from "../hooks/useInitialAuth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    InterBlack: require("../assets/fonts/Inter-Black.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    InterExtraBold: require("../assets/fonts/Inter-ExtraBold.ttf"),
    InterExtraLight: require("../assets/fonts/Inter-ExtraLight.ttf"),
    InterLight: require("../assets/fonts/Inter-Light.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
    InterThin: require("../assets/fonts/Inter-Thin.ttf"),
  });

  const [poppinsLoaded, poppinsError] = useFonts({
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (interError || poppinsError) throw interError || poppinsError;
  }, [interError, poppinsError]);

  useEffect(() => {
    if (interLoaded && poppinsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, poppinsLoaded]);

  if (!interLoaded || !poppinsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const { user, loading } = useAuth();
  const { isInitialAuthChecked } = useInitialAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading || !isInitialAuthChecked) return;

    const inAuthGroup = segments[0] === "(auth)";

    // Only redirect when auth state doesn't match current route (prevents remount loop)
    if (!user && !inAuthGroup) {
      router.replace("/(auth)/LoginScreen");
    } else if (user && inAuthGroup) {
      router.replace("/(app)");
    }
  }, [user, loading, isInitialAuthChecked, segments, router]);

  if (loading || !isInitialAuthChecked) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.screen,
    gap: 16,
  },
  loadingText: {
    color: colors.title,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
});
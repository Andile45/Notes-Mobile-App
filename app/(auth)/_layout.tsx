import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthLayout() {
  const { user } = useAuth();
  const router = useRouter();

  // Protected routing: logged-in users must not see login/register pages
  useEffect(() => {
    if (user) {
      router.replace("/(app)");
    }
  }, [user, router]);

  return (
    <Stack>
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
    </Stack>
  );
}


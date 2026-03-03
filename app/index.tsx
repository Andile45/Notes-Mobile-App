import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useInitialAuth } from "../hooks/useInitialAuth";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { isInitialAuthChecked } = useInitialAuth();

  useEffect(() => {
    if (loading || !isInitialAuthChecked) return;
    router.replace(user ? "/(app)" : "/(auth)/LoginScreen");
  }, [user, loading, isInitialAuthChecked, router]);

  return null;
}

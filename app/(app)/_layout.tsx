import { colors, common } from "../../constants/theme";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { NoteProvider } from "../../contexts/NoteContext";

export default function AppLayout() {
  const { logout } = useAuth();

  const headerRightLogout = () => (
    <TouchableOpacity style={styles.headerSecondary} onPress={logout}>
      <Text style={styles.headerSecondaryText}>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <CategoryProvider>
      <NoteProvider>
        <Stack
          screenOptions={{
            headerTintColor: colors.title,
            headerStyle: { backgroundColor: colors.screen },
            headerTitleStyle: { fontFamily: "Poppins-Regular", fontWeight: "bold", color: colors.title },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Notes",
              headerShown: true,
              headerRight: () => (
                <View style={styles.headerRow}>
                  <Link href="/(app)/screens/AddNoteScreen" asChild>
                    <TouchableOpacity style={styles.headerPrimary}>
                      <Text style={styles.headerPrimaryText}>Add Note</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link href="/(app)/screens/CategoryScreen" asChild>
                    <TouchableOpacity style={styles.headerSecondary}>
                      <Text style={styles.headerSecondaryText}>Categories</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link href="/(app)/screens/ProfileScreen" asChild>
                    <TouchableOpacity style={styles.headerSecondary}>
                      <Text style={styles.headerSecondaryText}>Profile</Text>
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity style={styles.headerDestructive} onPress={logout}>
                    <Text style={styles.headerDestructiveText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <Stack.Screen name="(app)/screens/ProfileScreen" options={{ title: "Profile", headerRight: headerRightLogout }} />
          <Stack.Screen name="(app)/screens/CategoryScreen" options={{ title: "Categories", headerRight: headerRightLogout }} />
          <Stack.Screen name="(app)/screens/AddNoteScreen" options={{ title: "Add Note", headerRight: headerRightLogout }} />
          <Stack.Screen name="(app)/screens/NoteDetailScreen" options={{ title: "Note Details" }} />
          <Stack.Screen name="(app)/screens/EditNoteScreen" options={{ title: "Edit Note", headerRight: headerRightLogout }} />
        </Stack>
      </NoteProvider>
    </CategoryProvider>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    gap: 6,
  },
  headerPrimary: {
    ...common.primaryButton,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  headerPrimaryText: {
    ...common.primaryButtonText,
    fontSize: 14,
  },
  headerSecondary: {
    backgroundColor: colors.secondaryBg,
    borderWidth: 2,
    borderColor: colors.secondaryBorder,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerSecondaryText: {
    color: colors.secondaryText,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  headerDestructive: {
    backgroundColor: colors.destructive,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerDestructiveText: {
    color: colors.destructiveText,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { CategoryProvider } from "../../contexts/CategoryContext";
import { NoteProvider } from "../../contexts/NoteContext";

export default function AppLayout() {
  const { logout } = useAuth();

  return (
    <CategoryProvider>
      <NoteProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Notes",
              headerShown: true,
              headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <Link href="/(app)/screens/AddNoteScreen" asChild>
                    <TouchableOpacity style={styles.headerButton}>
                      <Text style={styles.headerButtonText}>Add Note</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link href="/(app)/screens/CategoryScreen" asChild>
                    <TouchableOpacity style={styles.headerButton}>
                      <Text style={styles.headerButtonText}>Categories</Text>
                    </TouchableOpacity>
                  </Link>
                  <Link href="/(app)/screens/ProfileScreen" asChild>
                    <TouchableOpacity style={styles.headerButton}>
                      <Text style={styles.headerButtonText}>Profile</Text>
                    </TouchableOpacity>
                  </Link>
                  <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
                    <Text style={styles.headerButtonText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="(app)/screens/ProfileScreen"
            options={{
              title: "Profile",
              headerRight: () => (
                <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
                  <Text style={styles.headerButtonText}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(app)/screens/CategoryScreen"
            options={{
              title: "Categories",
              headerRight: () => (
                <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
                  <Text style={styles.headerButtonText}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(app)/screens/AddNoteScreen"
            options={{
              title: "Add Note",
              headerRight: () => (
                <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
                  <Text style={styles.headerButtonText}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(app)/screens/NoteDetailScreen"
            options={{
              title: "Note Details",
              headerRight: () => (
                <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
                  <Text style={styles.headerButtonText}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="(app)/screens/EditNoteScreen"
            options={{
              title: "Edit Note",
              headerRight: () => (
                <TouchableOpacity style={[styles.headerButton, styles.logoutButton]} onPress={logout}>
                  <Text style={styles.headerButtonText}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </NoteProvider>
    </CategoryProvider>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB', // Default button color
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  logoutButton: {
    backgroundColor: '#E74C3C', // Red color for logout button
  },
});
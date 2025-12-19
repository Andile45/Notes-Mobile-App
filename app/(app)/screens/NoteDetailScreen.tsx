import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, Link, router } from 'expo-router';
import { useNotes } from '../../../contexts/NoteContext';
import { Alert } from 'react-native';

const NoteDetailScreen: React.FC = () => {
  const { noteId } = useLocalSearchParams();
  const { notes, deleteNote } = useNotes();
  const note = notes.find((n) => n.id === noteId);

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            if (note) {
              await deleteNote(note.id);
              router.back();
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Note Not Found' }} />
        <Text style={styles.errorText}>Note not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: note.title || 'Note Details',
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <Link href={{ pathname: "/(app)/screens/EditNoteScreen", params: { noteId: note.id } }} asChild>
                <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#3498DB' }]}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#E74C3C' }]} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Text style={styles.title}>{note.title || 'No Title'}</Text>
      <Text style={styles.category}>Category: {note.category}</Text>
      <Text style={styles.date}>Added: {new Date(note.dateAdded).toLocaleDateString()}</Text>
      {note.dateAdded !== note.dateUpdated && (
        <Text style={styles.date}>Updated: {new Date(note.dateUpdated).toLocaleDateString()}</Text>
      )}
      <View style={styles.separator} />
      <Text style={styles.text}>{note.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F2F5', // Light Gray background
  },
  title: {
    fontSize: 28, // Larger title
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50', // Darker text for emphasis
    fontFamily: 'Poppins-Regular',
  },
  category: {
    fontSize: 16,
    color: '#7F8C8D', // Muted gray
    marginBottom: 5,
    fontFamily: 'Inter-Regular',
  },
  date: {
    fontSize: 14,
    color: '#95A5A6', // Lighter gray
    marginBottom: 5,
    fontFamily: 'Inter-Regular',
  },
  separator: {
    height: 1,
    backgroundColor: '#DCDCDC', // Lighter separator
    marginVertical: 15,
  },
  text: {
    fontSize: 18,
    color: '#34495E', // Slightly darker text
    lineHeight: 26,
    fontFamily: 'Inter-Regular',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Inter-Regular',
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
});

export default NoteDetailScreen;


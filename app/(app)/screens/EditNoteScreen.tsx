import { Picker } from '@react-native-picker/picker';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCategories } from '../../../contexts/CategoryContext';
import { useNotes } from '../../../contexts/NoteContext';

const EditNoteScreen: React.FC = () => {
  const { noteId } = useLocalSearchParams();
  const { notes, updateNote } = useNotes();
  const { categories } = useCategories();

  const noteToEdit = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [text, setText] = useState(noteToEdit?.text || '');
  const [selectedCategory, setSelectedCategory] = useState(noteToEdit?.category || '');

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setText(noteToEdit.text);
      setSelectedCategory(noteToEdit.category);
    }
  }, [noteToEdit]);

  const handleUpdateNote = async () => {
    if (noteToEdit && text.trim() && selectedCategory) {
      await updateNote(noteToEdit.id, title.trim(), text.trim(), selectedCategory);
      Alert.alert('Success', 'Note updated successfully!');
      router.back();
    } else {
      Alert.alert('Error', 'Please enter note text and select a category.');
    }
  };

  if (!noteToEdit) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Note Not Found' }} />
        <Text style={styles.errorText}>Note not found for editing!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Note' }} />
      <Text style={styles.title}>Edit Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Title (Optional)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Note Text"
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
      />
      <Text style={styles.pickerLabel}>Category:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleUpdateNote}>
          <Text style={styles.buttonText}>Update Note</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32, // Larger title
    fontWeight: 'bold',
    marginBottom: 30, // More space below title
    textAlign: 'center',
    color: '#2C3E50', // Darker text for emphasis
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 55, // Taller input fields
    borderColor: '#DCDCDC', // Lighter border
    borderWidth: 1,
    borderRadius: 12, // More rounded corners
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    color: '#34495E',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  textArea: {
    height: 150, // Taller text area
    paddingTop: 15,
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  pickerLabel: {
    fontSize: 18, // Larger label
    color: '#2C3E50',
    marginBottom: 10,
    fontWeight: '500',
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  pickerContainer: {
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
  },
  picker: {
    height: 55, // Match input height
    color: '#34495E',
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
  buttonContainer: {
    backgroundColor: '#4CAF50', // Green button
    borderRadius: 12,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular', // Apply Poppins font
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Inter-Regular', // Apply Inter font
  },
});

export default EditNoteScreen;


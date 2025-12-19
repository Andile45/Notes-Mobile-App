import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { useNotes } from '../../../contexts/NoteContext';
import { useCategories } from '../../../contexts/CategoryContext';
import { Picker } from '@react-native-picker/picker';

const AddNoteScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addNote } = useNotes();
  const { categories } = useCategories();

  const handleAddNote = async () => {
    if (text.trim() && selectedCategory) {
      await addNote(title.trim(), text.trim(), selectedCategory);
      Alert.alert('Success', 'Note added successfully!');
      router.back(); // Go back to the previous screen (notes list)
    } else {
      Alert.alert('Error', 'Please enter note text and select a category.');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Add New Note' }} />
      <Text style={styles.title}>Add New Note</Text>
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
        <TouchableOpacity onPress={handleAddNote}>
          <Text style={styles.buttonText}>Add Note</Text>
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
});

export default AddNoteScreen;


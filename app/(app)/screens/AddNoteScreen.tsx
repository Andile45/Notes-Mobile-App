import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { colors, common } from '../../../constants/theme';
import { useCategories } from '../../../contexts/CategoryContext';
import { useNotes } from '../../../contexts/NoteContext';

const AddNoteScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addNote } = useNotes();
  const { categories } = useCategories();

  const canSubmit = text.trim().length > 0 && selectedCategory.length > 0;

  const handleAddNote = async () => {
    if (!canSubmit) return;
    await addNote(title.trim(), text.trim(), selectedCategory);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Success', 'Note added successfully!');
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: 'Add New Note' }} />
      <Text style={styles.title}>Add New Note</Text>
      <TextInput
        style={styles.input}
        placeholder="Title (Optional)"
        placeholderTextColor={colors.muted}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Note Text"
        placeholderTextColor={colors.muted}
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
      />
      <Text style={styles.pickerLabel}>Category</Text>
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
      {!canSubmit && (
        <Text style={styles.hint}>Enter note text and select a category to add.</Text>
      )}
      <TouchableOpacity
        style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
        onPress={handleAddNote}
        disabled={!canSubmit}
      >
        <Text style={styles.primaryButtonText}>Add Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    ...common.title,
  },
  input: {
    ...common.input,
  },
  textArea: {
    height: 140,
    paddingTop: 14,
  },
  pickerLabel: {
    fontSize: 16,
    color: colors.title,
    marginBottom: 8,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: colors.card,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  picker: {
    height: 52,
    color: colors.body,
    fontFamily: 'Poppins-Regular',
  },
  hint: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  primaryButton: {
    ...common.primaryButton,
    marginTop: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    ...common.primaryButtonText,
  },
});

export default AddNoteScreen;


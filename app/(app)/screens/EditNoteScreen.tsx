import * as Haptics from 'expo-haptics';
import { Picker } from '@react-native-picker/picker';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, common } from '../../../constants/theme';
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

  const canSubmit = text.trim().length > 0 && selectedCategory.length > 0;

  const handleUpdateNote = async () => {
    if (!noteToEdit || !canSubmit) return;
    await updateNote(noteToEdit.id, title.trim(), text.trim(), selectedCategory);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Success', 'Note updated successfully!');
    router.back();
  };

  if (!noteToEdit) {
    return (
      <View style={[styles.container, { padding: 24, justifyContent: 'center' }]}>
        <Stack.Screen options={{ title: 'Note Not Found' }} />
        <Text style={styles.errorText}>Note not found for editing.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ title: 'Edit Note' }} />
      <Text style={styles.title}>Edit Note</Text>
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
        <Text style={styles.hint}>Enter note text and select a category to save.</Text>
      )}
      <TouchableOpacity
        style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
        onPress={handleUpdateNote}
        disabled={!canSubmit}
      >
        <Text style={styles.primaryButtonText}>Update Note</Text>
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
  primaryButton: {
    ...common.primaryButton,
    marginTop: 8,
  },
  primaryButtonText: {
    ...common.primaryButtonText,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  hint: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  errorText: {
    fontSize: 17,
    color: colors.destructive,
    textAlign: 'center',
    marginTop: 40,
    fontFamily: 'Poppins-Regular',
  },
});

export default EditNoteScreen;


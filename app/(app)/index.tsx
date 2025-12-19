import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCategories } from '../../contexts/CategoryContext';
import { Note, useNotes } from '../../contexts/NoteContext';

const NotesListScreen: React.FC = () => {
  const { notes } = useNotes();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('descending'); // 'ascending' or 'descending'
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>([]);

  useEffect(() => {
    let currentNotes = notes;

    if (selectedCategory !== 'All') {
      currentNotes = currentNotes.filter(note => note.category === selectedCategory);
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      currentNotes = currentNotes.filter(
        (note) =>
          (note.title && note.title.toLowerCase().includes(searchLower)) ||
          note.text.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    currentNotes.sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
    });

    setDisplayedNotes(currentNotes);
  }, [notes, selectedCategory, searchText, sortOrder]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notes</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterSortContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="All Categories" value="All" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={sortOrder}
            onValueChange={(itemValue) => setSortOrder(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sort by Date (Newest First)" value="descending" />
            <Picker.Item label="Sort by Date (Oldest First)" value="ascending" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={displayedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/screens/NoteDetailScreen", params: { noteId: item.id } }} asChild>
            <TouchableOpacity style={styles.noteItem}>
              <Text style={styles.noteTitle}>{item.title || 'No Title'}</Text>
              <Text style={styles.noteCategory}>Category: {item.category}</Text>
              <Text style={styles.noteDate}>Added: {new Date(item.dateAdded).toLocaleDateString()}</Text>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No notes yet. Add one!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F2F5', // Light Gray Background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2C3E50', // Darker Blue-Gray for emphasis
    fontFamily: 'Poppins-Regular',
  },
  searchInput: {
    height: 48,
    borderColor: '#DCDCDC', // Lighter border
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#34495E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    fontFamily: 'Inter-Regular',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    borderColor: '#DCDCDC',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    height: 50,
    color: '#34495E',
    fontFamily: 'Inter-Regular',
  },
  noteItem: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#2C3E50',
    fontFamily: 'Poppins-Regular',
  },
  noteCategory: {
    fontSize: 15,
    color: '#7F8C8D',
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },
  noteDate: {
    fontSize: 13,
    color: '#95A5A6',
    marginTop: 6,
    fontFamily: 'Inter-Regular',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
    color: '#7F8C8D',
    fontFamily: 'Inter-Regular',
  },
});

export default NotesListScreen;


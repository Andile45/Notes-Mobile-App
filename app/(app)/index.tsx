import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, common } from '../../constants/theme';
import { useCategories } from '../../contexts/CategoryContext';
import { Note, useNotes } from '../../contexts/NoteContext';

function formatNoteDate(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dDay = new Date(d);
  dDay.setHours(0, 0, 0, 0);
  if (dDay.getTime() === today.getTime()) return 'Today';
  if (dDay.getTime() === yesterday.getTime()) return 'Yesterday';
  const diffDays = Math.floor((today.getTime() - dDay.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return `${diffDays} days ago`;
  return d.toLocaleDateString();
}

const NotesListScreen: React.FC = () => {
  const { notes } = useNotes();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('descending');
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>([]);

  useEffect(() => {
    let currentNotes = notes;

    if (selectedCategory !== 'All') {
      currentNotes = currentNotes.filter(note => note.category === selectedCategory);
    }

    if (searchText.trim()) {
      // Match every single word in the search query (each word must appear in title or text)
      const searchWords = searchText.trim().toLowerCase().split(/\s+/).filter(Boolean);
      currentNotes = currentNotes.filter((note) => {
        const titleLower = (note.title || '').toLowerCase();
        const textLower = (note.text || '').toLowerCase();
        const noteContent = `${titleLower} ${textLower}`;
        return searchWords.every((word) => noteContent.includes(word));
      });
    }

    // Apply sorting
    currentNotes.sort((a, b) => {
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
    });

    setDisplayedNotes(currentNotes);
  }, [notes, selectedCategory, searchText, sortOrder]);

  const hasActiveFilters = searchText.trim() !== '' || selectedCategory !== 'All';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Notes</Text>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={22} color={colors.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          placeholderTextColor={colors.muted}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText('')}
            style={styles.searchClear}
            accessibilityLabel="Clear search"
          >
            <Ionicons name="close-circle" size={22} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>

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
            <TouchableOpacity style={styles.noteItem} activeOpacity={0.7}>
              <View style={styles.noteItemHeader}>
                <Text style={styles.noteTitle} numberOfLines={1}>{item.title || 'No Title'}</Text>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>{item.category}</Text>
                </View>
              </View>
              <Text style={styles.notePreview} numberOfLines={2}>{item.text || 'No content'}</Text>
              <Text style={styles.noteDate}>{formatNoteDate(item.dateAdded)}</Text>
            </TouchableOpacity>
          </Link>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="document-text-outline" size={56} color={colors.muted} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>
              {hasActiveFilters ? "No notes match your search or filters." : "No notes yet."}
            </Text>
            {hasActiveFilters ? (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => {
                  setSearchText('');
                  setSelectedCategory('All');
                }}
              >
                <Text style={styles.emptyButtonText}>Clear filters</Text>
              </TouchableOpacity>
            ) : (
              <Link href="/(app)/screens/AddNoteScreen" asChild>
                <TouchableOpacity style={styles.emptyButtonPrimary}>
                  <Text style={styles.emptyButtonTextPrimary}>Add your first note</Text>
                </TouchableOpacity>
              </Link>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...common.screen,
  },
  title: {
    ...common.title,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 15,
    backgroundColor: colors.card,
    paddingHorizontal: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: colors.body,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  searchClear: {
    padding: 4,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  pickerWrapper: {
    flex: 1,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: colors.card,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  picker: {
    height: 50,
    color: colors.body,
    fontFamily: 'Poppins-Regular',
  },
  noteItem: {
    ...common.card,
    marginBottom: 14,
    padding: 18,
  },
  noteItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  noteTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.title,
  },
  categoryPill: {
    backgroundColor: colors.screen,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  categoryPillText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.muted,
  },
  notePreview: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.body,
    lineHeight: 20,
    marginBottom: 8,
    opacity: 0.9,
  },
  noteDate: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.muted,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 17,
    color: colors.muted,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  emptyButton: {
    ...common.secondaryButton,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyButtonText: {
    ...common.secondaryButtonText,
  },
  emptyButtonPrimary: {
    ...common.primaryButton,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyButtonTextPrimary: {
    color: colors.primaryText,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default NotesListScreen;


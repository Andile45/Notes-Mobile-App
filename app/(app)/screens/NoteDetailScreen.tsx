import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack, Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, common } from '../../../constants/theme';
import { useNotes } from '../../../contexts/NoteContext';
import { ConfirmModal } from '../../../components/ConfirmModal';

function formatDetailDate(dateStr: string): string {
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

const NoteDetailScreen: React.FC = () => {
  const { noteId } = useLocalSearchParams();
  const { notes, deleteNote } = useNotes();
  const note = notes.find((n) => n.id === noteId);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteConfirm = async () => {
    if (note) {
      await deleteNote(note.id);
      router.back();
    }
  };

  if (!note) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Note Not Found' }} />
        <View style={styles.errorWrap}>
          <Ionicons name="document-outline" size={48} color={colors.muted} style={styles.errorIcon} />
          <Text style={styles.errorText}>Note not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ConfirmModal
        visible={deleteModalVisible}
        title="Delete Note"
        message="Are you sure you want to delete this note? This cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModalVisible(false)}
        variant="destructive"
      />
      <Stack.Screen
        options={{
          title: note.title || 'Note',
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <View style={styles.headerRow}>
              <Link href={{ pathname: "/(app)/screens/EditNoteScreen", params: { noteId: note.id } }} asChild>
                <TouchableOpacity style={styles.headerPrimary}>
                  <Text style={styles.headerPrimaryText}>Edit</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.headerDestructive} onPress={() => setDeleteModalVisible(true)}>
                <Text style={styles.headerDestructiveText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metaRow}>
          <View style={styles.categoryPill}>
            <Ionicons name="folder-outline" size={14} color={colors.primary} />
            <Text style={styles.categoryPillText}>{note.category}</Text>
          </View>
          <Text style={styles.dateText}>
            {formatDetailDate(note.dateAdded)}
            {note.dateAdded !== note.dateUpdated && ` · Updated ${formatDetailDate(note.dateUpdated)}`}
          </Text>
        </View>
        <Text style={styles.title}>{note.title || 'Untitled'}</Text>
        <View style={styles.bodyWrap}>
          <Text style={styles.body}>{note.text}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: colors.title,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    gap: 6,
  },
  categoryPillText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.title,
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: colors.muted,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: colors.title,
    marginBottom: 20,
    lineHeight: 32,
  },
  bodyWrap: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    ...common.card,
    marginBottom: 0,
  },
  body: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.body,
    lineHeight: 26,
  },
  errorWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: colors.muted,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    gap: 8,
  },
  headerPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerPrimaryText: {
    color: colors.primaryText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  headerDestructive: {
    backgroundColor: colors.destructive,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerDestructiveText: {
    color: colors.destructiveText,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});

export default NoteDetailScreen;

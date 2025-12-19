import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

export interface Note {
  id: string;
  userId: string; // To link notes to a specific user
  title: string;
  text: string;
  dateAdded: string;
  dateUpdated: string;
  category: string;
}

interface NoteContextType {
  notes: Note[];
  addNote: (title: string, text: string, category: string) => Promise<void>;
  updateNote: (id: string, title: string, text: string, category: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNotesByCategory: (category: string) => Note[];
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth();

  const NOTES_STORAGE_KEY = `@notes_${user?.email}`;

  useEffect(() => {
    if (user) {
      loadNotes();
    } else {
      setNotes([]);
    }
  }, [user]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes", error);
    }
  };

  const saveNotes = async (notesToSave: Note[]) => {
    try {
      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesToSave));
    } catch (error) {
      console.error("Failed to save notes", error);
    }
  };

  const addNote = async (title: string, text: string, category: string) => {
    if (!user) return;
    const newNote: Note = {
      id: Date.now().toString(),
      userId: user.email,
      title,
      text,
      dateAdded: new Date().toISOString(),
      dateUpdated: new Date().toISOString(),
      category,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  const updateNote = async (id: string, title: string, text: string, category: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, text, category, dateUpdated: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  const deleteNote = async (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    await saveNotes(updatedNotes);
  };

  const getNotesByCategory = (category: string) => {
    return notes.filter(note => note.category === category);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNotesByCategory }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};


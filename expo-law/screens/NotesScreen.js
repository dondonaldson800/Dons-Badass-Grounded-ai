/**
 * SECURE NOTES SCREEN
 * Encrypted local storage for case/client notes
 * Includes PANIC BUTTON for emergency data wipe
 */

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LawContext } from '../App';

const NotesScreen = () => {
  const { theme, notes, addNote, clearAllData } = useContext(LawContext);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNote = () => {
    if (!noteTitle.trim() || !noteContent.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    addNote({
      title: noteTitle,
      content: noteContent,
    });

    setNoteTitle('');
    setNoteContent('');
    setIsAdding(false);
    Alert.alert('Success', 'Note saved securely');
  };

  const handlePanicButton = () => {
    Alert.alert(
      '⚠️ EMERGENCY DATA WIPE',
      'This will PERMANENTLY delete ALL secure notes. This cannot be undone.\n\nAre you absolutely sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'WIPE ALL DATA',
          style: 'destructive',
          onPress: () => {
            clearAllData();
            Alert.alert('Complete', 'All data has been permanently deleted');
          },
        },
      ]
    );
  };

  const renderNote = ({ item }) => (
    <View style={[styles.noteCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.noteHeader}>
        <Text style={[styles.noteTitle, { color: theme.colors.primary }]}>
          {item.title}
        </Text>
        <Text style={[styles.noteDate, { color: '#999' }]}>
          {new Date(item.timestamp).toLocaleDateString()}
        </Text>
      </View>
      <Text style={[styles.noteContent, { color: theme.colors.text }]}>
        {item.content}
      </Text>
      <View style={[styles.encryptedBadge, { backgroundColor: '#4CAF50' }]}>
        <Text style={styles.badgeText}>🔒 Encrypted</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Security Warning Banner */}
      <View style={[styles.securityBanner, { backgroundColor: '#2a3d2a' }]}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={[styles.securityText, { color: '#4CAF50' }]}>
          All notes are encrypted and stored locally on your device only
        </Text>
      </View>

      {/* Add Note Button */}
      {!isAdding && (
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setIsAdding(true)}
        >
          <Text style={styles.addButtonText}>+ Add New Note</Text>
        </TouchableOpacity>
      )}

      {/* Add Note Form */}
      {isAdding && (
        <View style={[styles.addForm, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderBottomColor: theme.colors.border }]}
            placeholder="Note Title (e.g., Client Name, Case #)"
            placeholderTextColor="#999"
            value={noteTitle}
            onChangeText={setNoteTitle}
          />
          <TextInput
            style={[styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Note content..."
            placeholderTextColor="#999"
            value={noteContent}
            onChangeText={setNoteContent}
            multiline
            numberOfLines={6}
          />
          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: '#666' }]}
              onPress={() => {
                setIsAdding(false);
                setNoteTitle('');
                setNoteContent('');
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleAddNote}
            >
              <Text style={[styles.buttonText, { color: '#000' }]}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Notes List */}
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={[styles.emptyText, { color: '#999' }]}>
              No secure notes yet
            </Text>
          </View>
        }
      />

      {/* PANIC BUTTON - Emergency Data Wipe */}
      <TouchableOpacity
        style={[styles.panicButton, { backgroundColor: '#FF3B30' }]}
        onPress={handlePanicButton}
      >
        <Text style={styles.panicIcon}>⚠️</Text>
        <Text style={styles.panicText}>EMERGENCY: Clear All Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addForm: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  textArea: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  noteCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  noteDate: {
    fontSize: 12,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  encryptedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  panicButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panicIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  panicText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NotesScreen;
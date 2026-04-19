/**
 * LEGAL TERMINOLOGY DATABASE
 * Searchable A-Z Legal Terms with Definitions
 */

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LawContext } from '../App';

// Sample Legal Terms Database (expand this)
const LEGAL_TERMS = [
  { id: '1', term: 'Affidavit', definition: 'A written statement confirmed by oath or affirmation, for use as evidence in court.' },
  { id: '2', term: 'Bail', definition: 'The temporary release of an accused person awaiting trial, sometimes on condition that a sum of money is paid.' },
  { id: '3', term: 'Contempt of Court', definition: 'The offense of being disobedient to or disrespectful toward a court of law and its officers.' },
  { id: '4', term: 'Defendant', definition: 'An individual, company, or institution sued or accused in a court of law.' },
  { id: '5', term: 'Equity', definition: 'The value of the shares issued by a company or the value of a property minus debt.' },
  { id: '6', term: 'Felony', definition: 'A crime regarded in the US and many other judicial systems as more serious than a misdemeanor.' },
  { id: '7', term: 'Habeas Corpus', definition: 'A writ requiring a person under arrest to be brought before a judge or into court.' },
  { id: '8', term: 'Indictment', definition: 'A formal charge or accusation of a serious crime.' },
  { id: '9', term: 'Jurisdiction', definition: 'The official power to make legal decisions and judgments.' },
  { id: '10', term: 'Litigation', definition: 'The process of taking legal action.' },
  { id: '11', term: 'Misdemeanor', definition: 'A minor wrongdoing or a crime less serious than a felony.' },
  { id: '12', term: 'Negligence', definition: 'Failure to take proper care in doing something, especially leading to damage or injury.' },
  { id: '13', term: 'Ordinance', definition: 'A piece of legislation enacted by a municipal authority.' },
  { id: '14', term: 'Plaintiff', definition: 'A person who brings a case against another in a court of law.' },
  { id: '15', term: 'Precedent', definition: 'An earlier event or action that is regarded as an example or guide to be considered in similar circumstances.' },
  // Add 485 more terms to reach 500+
];

const TerminologyScreen = () => {
  const { theme } = useContext(LawContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);

  const filteredTerms = LEGAL_TERMS.filter((item) =>
    item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTerm = ({ item }) => (
    <TouchableOpacity
      style={[styles.termCard, { 
        backgroundColor: selectedTerm?.id === item.id ? theme.colors.primary : theme.colors.card,
        borderColor: theme.colors.border 
      }]}
      onPress={() => setSelectedTerm(item)}
    >
      <Text style={[styles.termTitle, { 
        color: selectedTerm?.id === item.id ? '#000' : theme.colors.primary 
      }]}>
        {item.term}
      </Text>
      {selectedTerm?.id === item.id && (
        <Text style={[styles.termDefinition, { 
          color: selectedTerm?.id === item.id ? '#000' : theme.colors.text 
        }]}>
          {item.definition}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search legal terms..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Results Count */}
      <View style={styles.statsBar}>
        <Text style={[styles.statsText, { color: '#999' }]}>
          {filteredTerms.length} terms found
        </Text>
      </View>

      {/* Terms List */}
      <FlatList
        data={filteredTerms}
        renderItem={renderTerm}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyIcon]}>📚</Text>
            <Text style={[styles.emptyText, { color: '#999' }]}>
              No terms found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  statsBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statsText: {
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  termCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  termTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  termDefinition: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
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
});

export default TerminologyScreen;

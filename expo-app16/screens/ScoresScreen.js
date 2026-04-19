/**
 * SCORES SCREEN - Sports News
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SportsNewsContext } from '../App';

const ScoresScreen = ({ navigation }) => {
  const { theme } = useContext(SportsNewsContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hero}>📊</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Scores
        </Text>
        <Text style={[styles.subtitle, { color: '#CCC' }]}>
          Live scores and sports updates
        </Text>

        {/* Feature Cards */}
        <View style={styles.grid}>
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Feature 1
            </Text>
            <Text style={[styles.cardText, { color: '#CCC' }]}>
              Sports News feature description
            </Text>
          </View>
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Feature 2
            </Text>
            <Text style={[styles.cardText, { color: '#CCC' }]}>
              Sports News feature description
            </Text>
          </View>
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Feature 3
            </Text>
            <Text style={[styles.cardText, { color: '#CCC' }]}>
              Sports News feature description
            </Text>
          </View>
          <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Feature 4
            </Text>
            <Text style={[styles.cardText, { color: '#CCC' }]}>
              Sports News feature description
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Take Action</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  hero: { fontSize: 64, textAlign: 'center', marginVertical: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 32, textAlign: 'center', fontWeight: '600' },
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardText: { fontSize: 14, lineHeight: 20 },
  
  button: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScoresScreen;

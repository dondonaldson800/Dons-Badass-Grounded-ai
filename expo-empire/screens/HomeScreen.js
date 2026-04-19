/**
 * HOME SCREEN - General Framework
 * Dashboard for multi-functional utility
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { EmpireContext } from '../App';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(EmpireContext);

  const quickActions = [
    { id: 1, title: 'AI Chat', icon: '💬', screen: 'AI', color: '#2E5BFF' },
    { id: 2, title: 'Tools', icon: '🛠️', screen: 'Tools', color: '#4CAF50' },
    { id: 3, title: 'Settings', icon: '⚙️', screen: 'Settings', color: '#FFA726' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            🏰 EMPIRE GENERAL
          </Text>
          <Text style={[styles.heroSubtitle, { color: '#999' }]}>
            The Steel Frame of Your Digital Empire
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Access
          </Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.actionCard, { backgroundColor: theme.colors.card }]}
                onPress={() => navigation.navigate(action.screen)}
              >
                <Text style={styles.actionIcon}>{action.icon}</Text>
                <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
                  {action.title}
                </Text>
                <View style={[styles.actionIndicator, { backgroundColor: action.color }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Empire Status
          </Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <Text style={styles.statValue}>4</Text>
              <Text style={[styles.statLabel, { color: '#999' }]}>Active Apps</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <Text style={styles.statValue}>∞</Text>
              <Text style={[styles.statLabel, { color: '#999' }]}>Possibilities</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  hero: {
    alignItems: 'center',
    marginVertical: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 48) / 2,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3544',
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionIndicator: {
    width: 32,
    height: 3,
    borderRadius: 2,
    marginTop: 4,
  },
  statsContainer: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3544',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E5BFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
  },
});

export default HomeScreen;

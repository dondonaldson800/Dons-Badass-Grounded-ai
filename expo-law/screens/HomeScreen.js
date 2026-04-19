/**
 * HOME SCREEN - Law App
 * Persistent Legal Disclaimer + Quick Actions
 */

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { LawContext } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(LawContext);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const acceptDisclaimer = async () => {
    await AsyncStorage.setItem('@law_disclaimer_accepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* PERSISTENT LEGAL DISCLAIMER - Always visible at bottom */}
      <View style={[styles.disclaimerBar, { backgroundColor: '#3d2810', borderTopColor: theme.colors.primary }]}>
        <Text style={[styles.disclaimerIcon]}>⚠️</Text>
        <Text style={[styles.disclaimerText, { color: theme.colors.text }]}>
          This app is for informational purposes only and does not constitute legal advice.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.heroIcon]}>⚖️</Text>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            EMPIRE LAW
          </Text>
          <Text style={[styles.heroSubtitle, { color: '#999' }]}>
            Professional Legal Utility
          </Text>
        </View>

        {/* Quick Access */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Terms')}
          >
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
              Legal Terminology
            </Text>
            <Text style={[styles.actionDesc, { color: '#999' }]}>
              Searchable A-Z database
            </Text>
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.badgeText}>500+ Terms</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={() => navigation.navigate('Notes')}
          >
            <Text style={styles.actionIcon}>🔒</Text>
            <Text style={[styles.actionTitle, { color: theme.colors.text }]}>
              Secure Notes
            </Text>
            <Text style={[styles.actionDesc, { color: '#999' }]}>
              Encrypted local storage
            </Text>
            <View style={[styles.badge, { backgroundColor: '#4CAF50' }]}>
              <Text style={styles.badgeText}>Private</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Professional Features
          </Text>
          <View style={[styles.featureItem]}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Local-only data storage (no cloud)
            </Text>
          </View>
          <View style={[styles.featureItem]}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Comprehensive legal terminology database
            </Text>
          </View>
          <View style={[styles.featureItem]}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Case/client note organization
            </Text>
          </View>
          <View style={[styles.featureItem]}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={[styles.featureText, { color: theme.colors.text }]}>
              Emergency data wipe capability
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* First-time Disclaimer Modal */}
      <Modal
        visible={showDisclaimer}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={styles.modalIcon}>⚖️</Text>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Legal Disclaimer
            </Text>
            <Text style={[styles.modalText, { color: theme.colors.text }]}>
              This application is provided for informational and educational purposes only.
              {'\n\n'}
              It does NOT constitute legal advice, and should not be relied upon as a substitute for consultation with a licensed attorney.
              {'\n\n'}
              By using this app, you acknowledge that you understand this disclaimer.
            </Text>
            <TouchableOpacity
              style={[styles.acceptButton, { backgroundColor: theme.colors.primary }]}
              onPress={acceptDisclaimer}
            >
              <Text style={styles.acceptButtonText}>I Understand & Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  hero: {
    alignItems: 'center',
    marginVertical: 24,
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDesc: {
    fontSize: 14,
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#4CAF50',
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  disclaimerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 2,
    zIndex: 999,
  },
  disclaimerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  modalIcon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  acceptButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

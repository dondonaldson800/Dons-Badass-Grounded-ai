/**
 * HOME SCREEN - Medical App
 * High-contrast accessibility UI
 * Prominent Emergency Info button
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { MedicalContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const { theme, healthLogs } = useContext(MedicalContext);
  const [showDisclaimer, setShowDisclaimer] = React.useState(true);

  const todayLogs = healthLogs.filter(log => {
    const logDate = new Date(log.timestamp).toDateString();
    const today = new Date().toDateString();
    return logDate === today;
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Medical Disclaimer Banner */}
      <View style={[styles.disclaimerBar, { backgroundColor: '#3d2a2a', borderTopColor: '#FF3B30' }]}>
        <Text style={styles.disclaimerIcon}>⚕️</Text>
        <Text style={[styles.disclaimerText, { color: '#FFF' }]}>
          This app does NOT provide medical advice. Always consult a healthcare professional.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🏥</Text>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            EMPIRE MEDICAL
          </Text>
          <Text style={[styles.heroSubtitle, { color: '#CCC' }]}>
            Your Private Health Companion
          </Text>
        </View>

        {/* EMERGENCY INFO BUTTON - Prominent */}
        <TouchableOpacity
          style={[styles.emergencyButton, { backgroundColor: '#FF3B30' }]}
          onPress={() => navigation.navigate('Emergency')}
        >
          <Text style={styles.emergencyIcon}>🚨</Text>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>EMERGENCY INFO</Text>
            <Text style={styles.emergencySubtitle}>
              Allergies • Medications • Emergency Contacts
            </Text>
          </View>
          <Text style={styles.emergencyArrow}>›</Text>
        </TouchableOpacity>

        {/* Today's Summary */}
        <View style={styles.summaryContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Today's Health Summary
          </Text>
          <View style={[styles.summaryCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: '#CCC' }]}>
                Logs Recorded:
              </Text>
              <Text style={[styles.summaryValue, { color: theme.colors.primary }]}>
                {todayLogs.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions - High Contrast Large Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate('DailyLog')}
          >
            <Text style={styles.actionIcon}>📝</Text>
            <Text style={styles.actionText}>Log Symptoms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
            onPress={() => navigation.navigate('History')}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>View History</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Notice */}
        <View style={[styles.privacyNotice, { backgroundColor: '#1a2a3a', borderColor: theme.colors.primary }]}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={[styles.privacyText, { color: '#FFF' }]}>
            All health data is encrypted and stored locally on your device.{'\n'}
            No data is sent to servers or shared with third parties.
          </Text>
        </View>
      </ScrollView>

      {/* First-time Medical Disclaimer Modal */}
      <Modal visible={showDisclaimer} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={styles.modalIcon}>⚕️</Text>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Medical Disclaimer
            </Text>
            <Text style={[styles.modalText, { color: '#FFF' }]}>
              This application is a personal health tracking tool only.
              {'\n\n'}
              It does NOT provide medical diagnosis, treatment, or advice.
              {'\n\n'}
              Always consult qualified healthcare professionals for medical concerns.
              {'\n\n'}
              In case of emergency, call 911 or your local emergency number immediately.
            </Text>
            <TouchableOpacity
              style={[styles.acceptButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowDisclaimer(false)}
            >
              <Text style={styles.acceptButtonText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 100 },
  hero: { alignItems: 'center', marginVertical: 24 },
  heroIcon: { fontSize: 72, marginBottom: 12 },
  heroTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  heroSubtitle: { fontSize: 18, fontWeight: '600' },
  
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  emergencyIcon: { fontSize: 40, marginRight: 16 },
  emergencyTextContainer: { flex: 1 },
  emergencyTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  emergencySubtitle: { color: '#FFF', fontSize: 14, opacity: 0.9 },
  emergencyArrow: { color: '#FFF', fontSize: 32, fontWeight: '300' },
  
  summaryContainer: { marginBottom: 32 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 18, fontWeight: '600' },
  summaryValue: { fontSize: 28, fontWeight: 'bold' },
  
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  actionIcon: { fontSize: 48, marginBottom: 12 },
  actionText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  privacyNotice: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  privacyIcon: { fontSize: 24, marginRight: 12 },
  privacyText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  
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
  disclaimerIcon: { fontSize: 20, marginRight: 8 },
  disclaimerText: { flex: 1, fontSize: 13, fontWeight: 'bold' },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#008080',
  },
  modalIcon: { fontSize: 64, textAlign: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  modalText: { fontSize: 16, lineHeight: 26, marginBottom: 24, textAlign: 'center' },
  acceptButton: { padding: 18, borderRadius: 12, alignItems: 'center' },
  acceptButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;

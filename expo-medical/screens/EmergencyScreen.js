/**
 * EMERGENCY INFO SCREEN
 * Life-saving quick access to allergies, medications, emergency contacts
 */

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { MedicalContext } from '../App';

const EmergencyScreen = () => {
  const { theme, emergencyInfo, updateEmergencyInfo } = useContext(MedicalContext);
  const [isEditing, setIsEditing] = useState(!emergencyInfo);
  
  const [allergies, setAllergies] = useState(emergencyInfo?.allergies || '');
  const [medications, setMedications] = useState(emergencyInfo?.medications || '');
  const [bloodType, setBloodType] = useState(emergencyInfo?.bloodType || '');
  const [emergencyContact, setEmergencyContact] = useState(emergencyInfo?.emergencyContact || '');
  const [emergencyPhone, setEmergencyPhone] = useState(emergencyInfo?.emergencyPhone || '');

  const handleSave = () => {
    const info = {
      allergies,
      medications,
      bloodType,
      emergencyContact,
      emergencyPhone,
    };
    updateEmergencyInfo(info);
    setIsEditing(false);
    Alert.alert('Saved', 'Emergency information updated');
  };

  const handleCallEmergency = () => {
    if (emergencyPhone) {
      Linking.openURL(`tel:${emergencyPhone}`);
    } else {
      Alert.alert('No Contact', 'Please add an emergency contact number');
    }
  };

  const handleCall911 = () => {
    Linking.openURL('tel:911');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* 911 Button - Always visible */}
        <TouchableOpacity
          style={[styles.emergencyButton, { backgroundColor: '#FF3B30' }]}
          onPress={handleCall911}
        >
          <Text style={styles.emergencyIcon}>🚨</Text>
          <Text style={styles.emergencyText}>CALL 911</Text>
        </TouchableOpacity>

        {!isEditing && emergencyInfo ? (
          // Display Mode
          <View>
            <View style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                ⚠️ Allergies
              </Text>
              <Text style={[styles.cardContent, { color: '#FFF' }]}>
                {emergencyInfo.allergies || 'None listed'}
              </Text>
            </View>

            <View style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                💊 Medications
              </Text>
              <Text style={[styles.cardContent, { color: '#FFF' }]}>
                {emergencyInfo.medications || 'None listed'}
              </Text>
            </View>

            <View style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                🩸 Blood Type
              </Text>
              <Text style={[styles.cardContent, { color: '#FFF' }]}>
                {emergencyInfo.bloodType || 'Not specified'}
              </Text>
            </View>

            <View style={[styles.infoCard, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                📞 Emergency Contact
              </Text>
              <Text style={[styles.cardContent, { color: '#FFF' }]}>
                {emergencyInfo.emergencyContact || 'Not specified'}
              </Text>
              <Text style={[styles.cardPhone, { color: theme.colors.primary }]}>
                {emergencyInfo.emergencyPhone || 'No number'}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleCallEmergency}
            >
              <Text style={styles.callButtonText}>
                📞 Call Emergency Contact
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: '#666' }]}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit Info</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Edit Mode
          <View>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Emergency Information
            </Text>

            <Text style={[styles.label, { color: '#CCC' }]}>Allergies</Text>
            <TextInput
              style={[styles.input, { color: '#FFF', borderColor: theme.colors.border }]}
              placeholder="e.g., Penicillin, Peanuts"
              placeholderTextColor="#666"
              value={allergies}
              onChangeText={setAllergies}
              multiline
            />

            <Text style={[styles.label, { color: '#CCC' }]}>Current Medications</Text>
            <TextInput
              style={[styles.input, { color: '#FFF', borderColor: theme.colors.border }]}
              placeholder="e.g., Aspirin 100mg daily"
              placeholderTextColor="#666"
              value={medications}
              onChangeText={setMedications}
              multiline
            />

            <Text style={[styles.label, { color: '#CCC' }]}>Blood Type</Text>
            <TextInput
              style={[styles.input, { color: '#FFF', borderColor: theme.colors.border }]}
              placeholder="e.g., O+, A-, AB+"
              placeholderTextColor="#666"
              value={bloodType}
              onChangeText={setBloodType}
            />

            <Text style={[styles.label, { color: '#CCC' }]}>Emergency Contact Name</Text>
            <TextInput
              style={[styles.input, { color: '#FFF', borderColor: theme.colors.border }]}
              placeholder="Full name"
              placeholderTextColor="#666"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />

            <Text style={[styles.label, { color: '#CCC' }]}>Emergency Contact Phone</Text>
            <TextInput
              style={[styles.input, { color: '#FFF', borderColor: theme.colors.border }]}
              placeholder="Phone number"
              placeholderTextColor="#666"
              value={emergencyPhone}
              onChangeText={setEmergencyPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>💾 Save Emergency Info</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  
  emergencyButton: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emergencyIcon: { fontSize: 40, marginRight: 16 },
  emergencyText: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  
  infoCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  cardContent: { fontSize: 18, lineHeight: 26 },
  cardPhone: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  
  callButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  callButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  
  editButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, marginTop: 16 },
  input: {
    fontSize: 18,
    padding: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  
  saveButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
});

export default EmergencyScreen;
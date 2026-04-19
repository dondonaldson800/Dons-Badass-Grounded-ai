/**
 * DAILY LOG SCREEN
 * Symptom Tracker: Pain, Mood, Energy + Doctor Notes
 * High-contrast accessibility UI with large interactive elements
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
} from 'react-native';
import Slider from '@react-native-community/slider';
import { MedicalContext } from '../App';

const MOOD_OPTIONS = ['😔 Poor', '😐 Fair', '🙂 Good', '😄 Great', '🤩 Excellent'];
const ENERGY_OPTIONS = ['Empty', 'Low', 'Moderate', 'High', 'Peak'];

const DailyLogScreen = ({ navigation }) => {
  const { theme, addLog } = useContext(MedicalContext);
  const [painLevel, setPainLevel] = useState(5);
  const [mood, setMood] = useState(2); // Index
  const [energy, setEnergy] = useState(2); // Index
  const [doctorNotes, setDoctorNotes] = useState('');

  const handleSaveLog = () => {
    if (!doctorNotes.trim()) {
      Alert.alert('Incomplete', 'Please add notes for your doctor');
      return;
    }

    const log = {
      painLevel,
      mood: MOOD_OPTIONS[mood],
      energy: ENERGY_OPTIONS[energy],
      doctorNotes,
    };

    addLog(log);
    
    // Reset form
    setPainLevel(5);
    setMood(2);
    setEnergy(2);
    setDoctorNotes('');
    
    Alert.alert('Saved', 'Daily health log recorded securely', [
      { text: 'View History', onPress: () => navigation.navigate('History') },
      { text: 'Done', style: 'cancel' },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Daily Health Log
        </Text>
        <Text style={[styles.subtitle, { color: '#CCC' }]}>
          Track your symptoms for medical review
        </Text>

        {/* Pain Level Slider */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Pain Level
            </Text>
            <Text style={[styles.valueDisplay, { color: theme.colors.primary }]}>
              {painLevel}/10
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={painLevel}
            onValueChange={setPainLevel}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor="#666"
            thumbTintColor={theme.colors.primary}
          />
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabel, { color: '#999' }]}>No Pain</Text>
            <Text style={[styles.sliderLabel, { color: '#999' }]}>Severe</Text>
          </View>
        </View>

        {/* Mood Selector */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Mood
          </Text>
          <View style={styles.optionsGrid}>
            {MOOD_OPTIONS.map((option, index) => (\n              <TouchableOpacity\n                key={index}\n                style={[\n                  styles.optionButton,\n                  {\n                    backgroundColor: mood === index ? theme.colors.primary : theme.colors.card,\n                    borderColor: theme.colors.border,\n                  },\n                ]}\n                onPress={() => setMood(index)}\n              >\n                <Text\n                  style={[\n                    styles.optionText,\n                    { color: mood === index ? '#FFF' : '#CCC' },\n                  ]}\n                >\n                  {option}\n                </Text>\n              </TouchableOpacity>\n            ))}\n          </View>\n        </View>\n\n        {/* Energy Selector */}\n        <View style={styles.section}>\n          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>\n            Energy Level\n          </Text>\n          <View style={styles.optionsGrid}>\n            {ENERGY_OPTIONS.map((option, index) => (\n              <TouchableOpacity\n                key={index}\n                style={[\n                  styles.optionButton,\n                  {\n                    backgroundColor: energy === index ? theme.colors.secondary : theme.colors.card,\n                    borderColor: theme.colors.border,\n                  },\n                ]}\n                onPress={() => setEnergy(index)}\n              >\n                <Text\n                  style={[\n                    styles.optionText,\n                    { color: energy === index ? '#000' : '#CCC' },\n                  ]}\n                >\n                  {option}\n                </Text>\n              </TouchableOpacity>\n            ))}\n          </View>\n        </View>\n\n        {/* Doctor Notes */}\n        <View style={styles.section}>\n          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>\n            Notes for Doctor\n          </Text>\n          <TextInput\n            style={[\n              styles.textArea,\n              { color: theme.colors.text, borderColor: theme.colors.border },\n            ]}\n            placeholder=\"Describe symptoms, concerns, or changes...\"\n            placeholderTextColor=\"#666\"\n            value={doctorNotes}\n            onChangeText={setDoctorNotes}\n            multiline\n            numberOfLines={6}\n            textAlignVertical=\"top\"\n          />\n        </View>\n\n        {/* Save Button - Large & High Contrast */}\n        <TouchableOpacity\n          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}\n          onPress={handleSaveLog}\n        >\n          <Text style={styles.saveButtonText}>💾 Save Health Log</Text>\n        </TouchableOpacity>\n\n        <View style={[styles.privacyNote, { backgroundColor: theme.colors.card }]}>\n          <Text style={styles.privacyIcon}>🔒</Text>\n          <Text style={[styles.privacyText, { color: '#CCC' }]}>\n            Data encrypted and stored locally\n          </Text>\n        </View>\n      </ScrollView>\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: { flex: 1 },\n  content: { padding: 20, paddingBottom: 40 },\n  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },\n  subtitle: { fontSize: 16, marginBottom: 32, fontWeight: '600' },\n  \n  section: { marginBottom: 32 },\n  sectionHeader: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    marginBottom: 16,\n  },\n  sectionTitle: { fontSize: 20, fontWeight: 'bold' },\n  valueDisplay: { fontSize: 32, fontWeight: 'bold' },\n  \n  slider: { height: 50 },\n  sliderLabels: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    marginTop: 8,\n  },\n  sliderLabel: { fontSize: 14, fontWeight: '600' },\n  \n  optionsGrid: {\n    flexDirection: 'row',\n    flexWrap: 'wrap',\n    marginTop: 12,\n  },\n  optionButton: {\n    paddingVertical: 16,\n    paddingHorizontal: 20,\n    borderRadius: 12,\n    marginRight: 12,\n    marginBottom: 12,\n    borderWidth: 2,\n    minWidth: 100,\n  },\n  optionText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },\n  \n  textArea: {\n    fontSize: 16,\n    padding: 16,\n    borderWidth: 2,\n    borderRadius: 12,\n    minHeight: 150,\n    marginTop: 12,\n  },\n  \n  saveButton: {\n    padding: 20,\n    borderRadius: 16,\n    alignItems: 'center',\n    marginTop: 16,\n  },\n  saveButtonText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },\n  \n  privacyNote: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    padding: 16,\n    borderRadius: 12,\n    marginTop: 24,\n  },\n  privacyIcon: { fontSize: 20, marginRight: 12 },\n  privacyText: { fontSize: 14, fontWeight: '600' },\n});\n\nexport default DailyLogScreen;

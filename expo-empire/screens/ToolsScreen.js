import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { EmpireContext } from '../App';

const ToolsScreen = () => {
  const { theme } = useContext(EmpireContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          🛠️ Utility Tools
        </Text>
        <Text style={[styles.subtitle, { color: '#999' }]}>
          Additional utilities will be added here
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16 },
});

export default ToolsScreen;
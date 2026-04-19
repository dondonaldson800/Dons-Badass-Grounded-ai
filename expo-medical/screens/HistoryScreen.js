import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { MedicalContext } from '../App';

const HistoryScreen = () => {
  const { theme, healthLogs } = useContext(MedicalContext);

  const renderLog = ({ item }) => (
    <View style={[styles.logCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <Text style={[styles.logDate, { color: theme.colors.primary }]}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <View style={styles.logStats}>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: '#CCC' }]}>Pain:</Text>
          <Text style={[styles.statValue, { color: '#FFF' }]}>{item.painLevel}/10</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: '#CCC' }]}>Mood:</Text>
          <Text style={[styles.statValue, { color: '#FFF' }]}>{item.mood}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: '#CCC' }]}>Energy:</Text>
          <Text style={[styles.statValue, { color: '#FFF' }]}>{item.energy}</Text>
        </View>
      </View>
      {item.doctorNotes && (
        <Text style={[styles.notes, { color: '#FFF' }]}>
          Notes: {item.doctorNotes}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={healthLogs}
        renderItem={renderLog}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📈</Text>
            <Text style={[styles.emptyText, { color: '#999' }]}>
              No health logs yet
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  logCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
  },
  logDate: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  logStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  stat: { alignItems: 'center' },
  statLabel: { fontSize: 14, marginBottom: 4, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  notes: { fontSize: 14, marginTop: 8, lineHeight: 20 },
  empty: { alignItems: 'center', paddingVertical: 64 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 18, fontWeight: '600' },
});

export default HistoryScreen;
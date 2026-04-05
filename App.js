import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [inEmpire, setInEmpire] = useState(false);

  if (!inEmpire) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Grounded Empire</Text>
        <TouchableOpacity style={styles.button} onPress={() => setInEmpire(true)}>
          <Text style={styles.buttonText}>Enter Empire</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>COMMAND CENTER</Text>
        <Text style={styles.welcome}>Welcome, Don.</Text>
      </View>
      
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}><Text style={styles.cardText}>App 1: Dropship</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card}><Text style={styles.cardText}>App 2: Coins</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card}><Text style={styles.cardText}>App 3: Cards</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card}><Text style={styles.cardText}>App 4: AI Hub</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginTop: 60 },
  title: { fontSize: 32, color: '#fff', fontWeight: 'bold', marginBottom: 40, letterSpacing: 2 },
  button: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 5 },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  header: { fontSize: 24, color: '#fff', fontWeight: 'bold', letterSpacing: 5 },
  welcome: { fontSize: 18, color: '#0f0', marginTop: 5, fontWeight: '300' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 50 },
  card: { backgroundColor: '#111', width: 160, height: 120, margin: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
  cardText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});

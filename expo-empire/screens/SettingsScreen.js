import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { EmpireContext } from '../App';

const SettingsScreen = () => {
  const { theme, settings, updateSettings } = useContext(EmpireContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>

        <View style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            AdMob Enabled
          </Text>
          <Switch
            value={settings.adMobEnabled}
            onValueChange={(v) => updateSettings({ adMobEnabled: v })}
            trackColor={{ true: theme.colors.primary }}
          />
        </View>

        <View style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Notifications
          </Text>
          <Switch
            value={settings.notifications}
            onValueChange={(v) => updateSettings({ notifications: v })}
            trackColor={{ true: theme.colors.primary }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLabel: { fontSize: 16 },
});

export default SettingsScreen;
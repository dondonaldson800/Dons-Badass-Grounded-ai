/**
 * IMPACT SCREEN
 * Detailed metrics and transparency dashboard
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NonprofitContext } from '../App';

const ImpactScreen = () => {
  const { theme, impact } = useContext(NonprofitContext);

  const progressPercentage = (impact.goalsMet / impact.totalGoals) * 100;

  // Sample historical data (would come from backend in production)
  const monthlyImpact = [
    { month: 'Nov', donations: 12500, volunteers: 42, lives: 280 },
    { month: 'Dec', donations: 15420, volunteers: 47, lives: 312 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          📊 Community Impact
        </Text>
        <Text style={[styles.subtitle, { color: '#CCC' }]}>
          Transparent. Measurable. Real.
        </Text>

        {/* Mission Progress */}
        <View style={[styles.bigCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            🎯 Mission Progress
          </Text>
          <View style={styles.bigStat}>
            <Text style={[styles.bigStatValue, { color: theme.colors.primary }]}>
              {impact.goalsMet}/{impact.totalGoals}
            </Text>
            <Text style={[styles.bigStatLabel, { color: '#CCC' }]}>Goals Achieved</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: '#333' }]}>
            <View 
              style={[
                styles.progressBarFill, 
                { backgroundColor: theme.colors.primary, width: `${progressPercentage}%` }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: '#CCC' }]}>
            {progressPercentage.toFixed(0)}% Complete
          </Text>
        </View>

        {/* Impact Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={[styles.metricCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
            <Text style={styles.metricIcon}>👥</Text>
            <Text style={[styles.metricValue, { color: theme.colors.primary }]}>
              {impact.activeVolunteers}
            </Text>
            <Text style={[styles.metricLabel, { color: '#CCC' }]}>
              Active Volunteers
            </Text>
            <Text style={[styles.metricChange, { color: theme.colors.success }]}>
              ↑ 12% this month
            </Text>
          </View>

          <View style={[styles.metricCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.secondary }]}>
            <Text style={styles.metricIcon}>💰</Text>
            <Text style={[styles.metricValue, { color: theme.colors.secondary }]}>
              ${(impact.totalDonations / 1000).toFixed(1)}K
            </Text>
            <Text style={[styles.metricLabel, { color: '#CCC' }]}>
              Total Donations
            </Text>
            <Text style={[styles.metricChange, { color: theme.colors.success }]}>
              ↑ 23% this month
            </Text>
          </View>
        </View>

        <View style={[styles.livesCard, { backgroundColor: theme.colors.success + '20', borderColor: theme.colors.success }]}>
          <Text style={styles.livesIcon}>❤️</Text>
          <Text style={[styles.livesValue, { color: theme.colors.success }]}>
            {impact.livesImpacted}
          </Text>
          <Text style={[styles.livesLabel, { color: '#FFF' }]}>
            Lives Impacted This Month
          </Text>
        </View>

        {/* Historical Trends */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          📈 Monthly Trends
        </Text>

        {monthlyImpact.map((month, index) => (
          <View
            key={month.month}
            style={[styles.monthCard, { backgroundColor: theme.colors.card }]}
          >
            <Text style={[styles.monthTitle, { color: theme.colors.text }]}>
              {month.month} 2025
            </Text>
            <View style={styles.monthStats}>
              <View style={styles.monthStat}>
                <Text style={[styles.monthStatValue, { color: theme.colors.secondary }]}>
                  ${(month.donations / 1000).toFixed(1)}K
                </Text>
                <Text style={[styles.monthStatLabel, { color: '#CCC' }]}>Donations</Text>
              </View>
              <View style={styles.monthStat}>
                <Text style={[styles.monthStatValue, { color: theme.colors.primary }]}>
                  {month.volunteers}
                </Text>
                <Text style={[styles.monthStatLabel, { color: '#CCC' }]}>Volunteers</Text>
              </View>
              <View style={styles.monthStat}>
                <Text style={[styles.monthStatValue, { color: theme.colors.success }]}>
                  {month.lives}
                </Text>
                <Text style={[styles.monthStatLabel, { color: '#CCC' }]}>Lives</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Transparency Statement */}
        <View style={[styles.transparencyCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            🔍 Transparency Commitment
          </Text>
          <View style={styles.fundingBreakdown}>
            <View style={styles.fundingRow}>
              <View style={[styles.fundingBar, { backgroundColor: theme.colors.primary, width: '85%' }]} />
              <Text style={[styles.fundingText, { color: '#CCC' }]}>85% → Programs</Text>
            </View>
            <View style={styles.fundingRow}>
              <View style={[styles.fundingBar, { backgroundColor: theme.colors.secondary, width: '15%' }]} />
              <Text style={[styles.fundingText, { color: '#CCC' }]}>15% → Operations</Text>
            </View>
          </View>
          <Text style={[styles.transparencyNote, { color: '#CCC' }]}>
            Every dollar is tracked. Monthly reports published publicly.
            Audited annually by independent third party.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 24, fontWeight: '600' },

  bigCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
  },
  cardTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  bigStat: { alignItems: 'center', marginBottom: 20 },
  bigStatValue: { fontSize: 56, fontWeight: 'bold', marginBottom: 8 },
  bigStatLabel: { fontSize: 16, fontWeight: '600' },
  progressBarBg: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: { height: '100%', borderRadius: 6 },
  progressText: { fontSize: 14, fontWeight: '600', textAlign: 'center' },

  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
  },
  metricIcon: { fontSize: 32, marginBottom: 12 },
  metricValue: { fontSize: 32, fontWeight: 'bold', marginBottom: 4 },
  metricLabel: { fontSize: 12, textAlign: 'center', marginBottom: 8, fontWeight: '600' },
  metricChange: { fontSize: 12, fontWeight: 'bold' },

  livesCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
  },
  livesIcon: { fontSize: 48, marginBottom: 12 },
  livesValue: { fontSize: 64, fontWeight: 'bold', marginBottom: 8 },
  livesLabel: { fontSize: 18, fontWeight: '600', textAlign: 'center' },

  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },

  monthCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  monthTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  monthStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  monthStat: { alignItems: 'center' },
  monthStatValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  monthStatLabel: { fontSize: 12, fontWeight: '600' },

  transparencyCard: {
    padding: 20,
    borderRadius: 16,
  },
  fundingBreakdown: { marginVertical: 16 },
  fundingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fundingBar: {
    height: 24,
    borderRadius: 4,
    marginRight: 12,
  },
  fundingText: { fontSize: 15, fontWeight: '600' },
  transparencyNote: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
});

export default ImpactScreen;

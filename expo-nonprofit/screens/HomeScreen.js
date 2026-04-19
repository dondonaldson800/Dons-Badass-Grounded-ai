/**
 * HOME SCREEN - Grounded Giving
 * Community mission overview + quick actions
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { NonprofitContext } from '../App';

const HomeScreen = ({ navigation }) => {
  const { theme, impact } = useContext(NonprofitContext);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `❤️ Join me in supporting Grounded Giving!\n\nWe've impacted ${impact.livesImpacted} lives and counting.\n\nTogether we can do more. #GroundedGiving #CommunityAction`,
        title: 'Support Grounded Giving',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share');
    }
  };

  const progressPercentage = (impact.goalsMet / impact.totalGoals) * 100;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>❤️</Text>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            GROUNDED GIVING
          </Text>
          <Text style={[styles.heroSubtitle, { color: '#CCC' }]}>
            Building Communities, Changing Lives
          </Text>
        </View>

        {/* Mission Progress */}
        <View style={[styles.missionCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
          <Text style={[styles.missionTitle, { color: theme.colors.text }]}>
            🎯 Mission Progress
          </Text>
          <Text style={[styles.missionStat, { color: theme.colors.primary }]}>
            {impact.goalsMet} / {impact.totalGoals} Goals Achieved
          </Text>
          
          {/* Progress Bar */}
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

        {/* Impact Stats */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>
              {impact.activeVolunteers}
            </Text>
            <Text style={[styles.statLabel, { color: '#CCC' }]}>
              Active Volunteers
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.statValue, { color: theme.colors.secondary }]}>
              ${(impact.totalDonations / 1000).toFixed(1)}K
            </Text>
            <Text style={[styles.statLabel, { color: '#CCC' }]}>
              Total Raised
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.statValue, { color: '#4CAF50' }]}>
              {impact.livesImpacted}
            </Text>
            <Text style={[styles.statLabel, { color: '#CCC' }]}>
              Lives Impacted
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Take Action
        </Text>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('Donate')}
        >
          <Text style={styles.actionIcon}>💛</Text>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Support the Cause</Text>
            <Text style={styles.actionSubtitle}>Every dollar makes a difference</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
          onPress={() => navigation.navigate('Volunteer')}
        >
          <Text style={styles.actionIcon}>🤝</Text>
          <View style={styles.actionTextContainer}>
            <Text style={styles.actionTitle}>Volunteer</Text>
            <Text style={styles.actionSubtitle}>Join upcoming events</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: '#444', borderColor: theme.colors.border }]}
          onPress={handleShare}
        >
          <Text style={styles.shareIcon}>📣</Text>
          <Text style={[styles.shareText, { color: theme.colors.text }]}>
            Share Our Mission
          </Text>
        </TouchableOpacity>

        {/* Mission Statement */}
        <View style={[styles.missionStatement, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.missionStatementTitle, { color: theme.colors.text }]}>
            Our Mission
          </Text>
          <Text style={[styles.missionStatementText, { color: '#CCC' }]}>
            Grounded Giving connects communities with meaningful action. 
            Through volunteer coordination, transparent donation tracking, 
            and measurable impact, we empower everyday people to create lasting change.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  hero: { alignItems: 'center', marginVertical: 24 },
  heroIcon: { fontSize: 64, marginBottom: 12 },
  heroTitle: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  heroSubtitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  
  missionCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 2,
  },
  missionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  missionStat: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  
  progressBarBg: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: { fontSize: 14, fontWeight: '600' },
  
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 12, textAlign: 'center', fontWeight: '600' },
  
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  actionIcon: { fontSize: 36, marginRight: 16 },
  actionTextContainer: { flex: 1 },
  actionTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  actionSubtitle: { color: '#FFF', fontSize: 14, opacity: 0.9 },
  actionArrow: { color: '#FFF', fontSize: 32, fontWeight: '300' },
  
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
  },
  shareIcon: { fontSize: 24, marginRight: 12 },
  shareText: { fontSize: 16, fontWeight: 'bold' },
  
  missionStatement: {
    padding: 20,
    borderRadius: 16,
  },
  missionStatementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  missionStatementText: {
    fontSize: 15,
    lineHeight: 24,
  },
});

export default HomeScreen;
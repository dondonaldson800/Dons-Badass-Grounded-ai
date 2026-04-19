/**
 * VOLUNTEER SCREEN
 * Upcoming events + sign-up functionality
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NonprofitContext } from '../App';

const VolunteerScreen = () => {
  const { theme, events, signUpForEvent } = useContext(NonprofitContext);

  const handleSignUp = (event) => {
    if (event.spotsLeft <= 0) {
      Alert.alert('Event Full', 'Sorry, this event is currently at capacity.');
      return;
    }

    Alert.alert(
      'Confirm Sign-Up',
      `Join "${event.title}" on ${event.date}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: '✅ Sign Me Up',
          onPress: () => {
            signUpForEvent(event.id);
            Alert.alert(
              '🤝 You\'re In!',
              `Successfully registered for ${event.title}.\n\nWe'll send you event details and reminders.`
            );
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          🤝 Volunteer Hub
        </Text>
        <Text style={[styles.subtitle, { color: '#CCC' }]}>
          Join upcoming community events
        </Text>

        {/* Events List */}
        {events.map((event) => (
          <View
            key={event.id}
            style={[styles.eventCard, { backgroundColor: theme.colors.card }]}
          >
            {/* Event Header */}
            <View style={styles.eventHeader}>
              <Text style={[styles.eventTitle, { color: theme.colors.text }]}>
                {event.title}
              </Text>
              <View
                style={[
                  styles.spotsBadge,
                  {
                    backgroundColor:
                      event.spotsLeft > 5
                        ? theme.colors.success
                        : event.spotsLeft > 0
                        ? theme.colors.primary
                        : theme.colors.error,
                  },
                ]}
              >
                <Text style={styles.spotsBadgeText}>
                  {event.spotsLeft} spots left
                </Text>
              </View>
            </View>

            {/* Event Details */}
            <View style={styles.eventDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📅</Text>
                <Text style={[styles.detailText, { color: '#CCC' }]}>
                  {event.date}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📍</Text>
                <Text style={[styles.detailText, { color: '#CCC' }]}>
                  {event.location}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>👥</Text>
                <Text style={[styles.detailText, { color: '#CCC' }]}>
                  {event.volunteers} volunteers signed up
                </Text>
              </View>
            </View>

            {/* Sign-Up Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                {
                  backgroundColor:
                    event.spotsLeft > 0 ? theme.colors.primary : '#555',
                },
              ]}
              onPress={() => handleSignUp(event)}
              disabled={event.spotsLeft <= 0}
            >
              <Text style={styles.signUpButtonText}>
                {event.spotsLeft > 0 ? '✋ Sign Me Up' : '❌ Event Full'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Call to Action */}
        <View style={[styles.ctaCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.primary }]}>
          <Text style={[styles.ctaTitle, { color: theme.colors.text }]}>
            💡 Why Volunteer?
          </Text>
          <Text style={[styles.ctaText, { color: '#CCC' }]}>
            Every hour you give transforms lives. From feeding families to mentoring youth,
            your time creates ripples of positive change in our community.
          </Text>
          <View style={styles.benefitsList}>
            <Text style={[styles.benefitItem, { color: theme.colors.primary }]}>✓ Make a direct impact</Text>
            <Text style={[styles.benefitItem, { color: theme.colors.primary }]}>✓ Build connections</Text>
            <Text style={[styles.benefitItem, { color: theme.colors.primary }]}>✓ Learn new skills</Text>
            <Text style={[styles.benefitItem, { color: theme.colors.primary }]}>✓ Track your contribution</Text>
          </View>
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

  eventCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  spotsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  spotsBadgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },

  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: { fontSize: 18, marginRight: 10, width: 24 },
  detailText: { fontSize: 15, fontWeight: '600' },

  signUpButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  ctaCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    marginTop: 8,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ctaText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  benefitsList: {
    marginTop: 8,
  },
  benefitItem: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default VolunteerScreen;

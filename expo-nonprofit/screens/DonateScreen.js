/**
 * DONATE SCREEN
 * Preset donation buttons + payment integration hooks
 */

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react';
import { NonprofitContext } from '../App';

const DONATION_AMOUNTS = [
  { amount: 10, impact: 'Provides meals for 2 families' },
  { amount: 25, impact: 'Supplies school materials for 5 children' },
  { amount: 50, impact: 'Funds a community event' },
  { amount: 100, impact: 'Sponsors a full day program' },
];

const DonateScreen = () => {
  const { theme } = useContext(NonprofitContext);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const handleDonate = async (amount) => {
    // PLACEHOLDER: Stripe/PayPal API integration hook
    // This is where you'd call:
    // const response = await fetch('YOUR_BACKEND/api/create-payment', {
    //   method: 'POST',
    //   body: JSON.stringify({ amount, currency: 'USD' })
    // });
    // const { paymentUrl } = await response.json();
    // Linking.openURL(paymentUrl);
    
    Alert.alert(
      'Payment Integration',
      `Ready to process $${amount} donation.\n\nThis is a placeholder for Stripe/PayPal integration.\n\nIn production, this would redirect to secure payment gateway.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Simulate Success',
          onPress: () => {
            Alert.alert('❤️ Thank You!', `Your $${amount} donation has been recorded (simulated).\n\nYou are making a real difference!`);
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          💛 Support the Cause
        </Text>
        <Text style={[styles.subtitle, { color: '#CCC' }]}>
          Your generosity creates lasting impact
        </Text>

        {/* Preset Donation Buttons */}
        <View style={styles.donationsGrid}>
          {DONATION_AMOUNTS.map((donation) => (
            <TouchableOpacity
              key={donation.amount}
              style={[
                styles.donationCard,
                {
                  backgroundColor:
                    selectedAmount === donation.amount
                      ? theme.colors.primary
                      : theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setSelectedAmount(donation.amount)}
            >
              <Text
                style={[
                  styles.donationAmount,
                  {
                    color:
                      selectedAmount === donation.amount ? '#000' : theme.colors.primary,
                  },
                ]}
              >
                ${donation.amount}
              </Text>
              <Text
                style={[
                  styles.donationImpact,
                  {
                    color:
                      selectedAmount === donation.amount ? '#000' : '#CCC',
                  },
                ]}
              >
                {donation.impact}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Donate Button */}
        {selectedAmount && (
          <TouchableOpacity
            style={[styles.donateButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => handleDonate(selectedAmount)}
          >
            <Text style={styles.donateButtonText}>
              💚 Donate ${selectedAmount}
            </Text>
          </TouchableOpacity>
        )}

        {/* Payment Methods */}
        <View style={[styles.paymentMethodsCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            🔒 Secure Payment Methods
          </Text>
          <View style={styles.paymentIcons}>
            <Text style={styles.paymentIcon}>💳</Text>
            <Text style={[styles.paymentText, { color: '#CCC' }]}>Credit/Debit</Text>
          </View>
          <View style={styles.paymentIcons}>
            <Text style={styles.paymentIcon}>🟦</Text>
            <Text style={[styles.paymentText, { color: '#CCC' }]}>PayPal</Text>
          </View>
          <View style={styles.paymentIcons}>
            <Text style={styles.paymentIcon}>₿</Text>
            <Text style={[styles.paymentText, { color: '#CCC' }]}>Crypto (Coming Soon)</Text>
          </View>
        </View>

        {/* Tax Deductible Notice */}
        <View style={[styles.taxNotice, { backgroundColor: '#2a3d2a', borderColor: '#4CAF50' }]}>
          <Text style={styles.taxIcon}>✅</Text>
          <Text style={[styles.taxText, { color: '#FFF' }]}>
            All donations are tax-deductible. You will receive a receipt via email.
          </Text>
        </View>

        {/* Transparency Statement */}
        <View style={[styles.transparencyCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            📊 100% Transparency
          </Text>
          <Text style={[styles.transparencyText, { color: '#CCC' }]}>
            Every dollar is tracked and reported. 85% goes directly to programs, 
            15% covers operational costs. View our impact dashboard for real-time updates.
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
  subtitle: { fontSize: 16, marginBottom: 32, fontWeight: '600' },
  
  donationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  donationCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
  },
  donationAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  donationImpact: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
  
  donateButton: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  donateButtonText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  
  paymentMethodsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentIcon: { fontSize: 24, marginRight: 12 },
  paymentText: { fontSize: 16, fontWeight: '600' },
  
  taxNotice: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
  },
  taxIcon: { fontSize: 20, marginRight: 12 },
  taxText: { flex: 1, fontSize: 14, lineHeight: 20, fontWeight: '600' },
  
  transparencyCard: {
    padding: 20,
    borderRadius: 16,
  },
  transparencyText: {
    fontSize: 15,
    lineHeight: 24,
  },
});

export default DonateScreen;
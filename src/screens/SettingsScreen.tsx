import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CommonHeader from '../components/CommonHeader';

export default function SettingsScreen() {
  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>App settings and preferences</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

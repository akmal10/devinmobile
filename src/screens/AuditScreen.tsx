import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CommonHeader from '../components/CommonHeader';

export default function AuditScreen() {
  const handleBrandLocationPress = () => {
    console.log('Brand/Location selector pressed');
  };

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        onBrandLocationPress={handleBrandLocationPress}
        onAlertsPress={handleAlertsPress}
        selectedBrand="Sample Brand"
        selectedLocation="Sample Location"
        alertsCount={3}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Audit</Text>
        <Text style={styles.subtitle}>Audit management screen</Text>
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

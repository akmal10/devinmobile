import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CommonHeaderProps {
  onBrandLocationPress: () => void;
  onAlertsPress: () => void;
  selectedBrand?: string;
  selectedLocation?: string;
  alertsCount?: number;
}

export default function CommonHeader({
  onBrandLocationPress,
  onAlertsPress,
  selectedBrand = 'Select Brand',
  selectedLocation = 'Select Location',
  alertsCount = 3,
}: CommonHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <TouchableOpacity style={styles.brandLocationPill} onPress={onBrandLocationPress}>
        <Text style={styles.brandText} numberOfLines={1}>
          {selectedBrand}
        </Text>
        <Text style={styles.locationText} numberOfLines={1}>
          {selectedLocation}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.alertsButton} onPress={onAlertsPress}>
        <Ionicons name="notifications-outline" size={24} color="#333" />
        {alertsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {alertsCount > 99 ? '99+' : alertsCount.toString()}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  brandLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    maxWidth: '70%',
    minHeight: 44,
  },
  brandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
    flex: 1,
  },
  alertsButton: {
    position: 'relative',
    padding: 10,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

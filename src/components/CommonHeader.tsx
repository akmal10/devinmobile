import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocation } from '../contexts/LocationContext';
import { Typography } from '../constants/Typography';

interface CommonHeaderProps {
  onAlertsPress: () => void;
  alertsCount?: number;
}

const LOCATIONS = [
  'Mumbai',
  'New York',
  'Los Angeles', 
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose'
];

export default function CommonHeader({
  onAlertsPress,
  alertsCount = 3,
}: CommonHeaderProps) {
  const insets = useSafeAreaInsets();
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsDropdownVisible(false);
  };

  const handleLocationPress = () => {
    setIsDropdownVisible(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.logoSection}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.locationPill} onPress={handleLocationPress}>
        <Text style={styles.locationText} numberOfLines={1}>
          {selectedLocation}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.alertsButton} onPress={onAlertsPress}>
        <Ionicons name="notifications-outline" size={24} color="#2563EB" />
        {alertsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {alertsCount > 99 ? '99+' : alertsCount.toString()}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>Select Location</Text>
            <FlatList
              data={LOCATIONS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedLocation === item && styles.selectedItem
                  ]}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedLocation === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                  {selectedLocation === item && (
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  logo: {
    width: 32,
    height: 32,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 16,
    minHeight: 50,
    justifyContent: 'center',
  },
  locationText: {
    ...Typography.styles.bodyPrimary,
    color: '#2563EB',
    marginRight: 8,
    textAlign: 'center',
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
    backgroundColor: '#FCD34D',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    ...Typography.styles.caption,
    color: '#1F2937',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    maxHeight: 400,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownTitle: {
    ...Typography.styles.h3CardTitle,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44,
  },
  selectedItem: {
    backgroundColor: '#f0f8ff',
  },
  dropdownItemText: {
    ...Typography.styles.bodyPrimary,
    color: '#333',
    flex: 1,
  },
  selectedItemText: {
    ...Typography.styles.bodyPrimary,
    color: '#007AFF',
  },
});

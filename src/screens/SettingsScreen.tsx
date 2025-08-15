import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';
import { useLocation } from '../contexts/LocationContext';
import { Typography } from '../constants/Typography';

export default function SettingsScreen() {
  const { selectedLocation } = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [notifications, setNotifications] = useState({
    newReview: true,
    lowRating: true,
    rankDrop: false,
    billing: true,
  });

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    Alert.alert('Logged Out', 'You have been successfully logged out.');
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    Alert.alert('Saved', 'Notification preferences updated.');
  };

  const handleWhatsAppSupport = () => {
    Linking.openURL('https://wa.me/1234567890');
  };

  const handleHelpCenter = () => {
    Linking.openURL('https://help.example.com');
  };

  const handleUpgradePlan = () => {
    Linking.openURL('https://billing.example.com/upgrade');
  };

  const handleViewInvoices = () => {
    Linking.openURL('https://billing.example.com/invoices');
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingRow = (icon: string, title: string, subtitle?: string, onPress?: () => void, rightComponent?: React.ReactNode) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} disabled={!onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon as any} size={24} color="#2563EB" style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (onPress && <Ionicons name="chevron-forward" size={20} color="#666" />)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Account Section */}
        {renderSectionHeader('Account')}
        <View style={styles.section}>
          <View style={styles.profileCard}>
            <View style={styles.profilePhoto}>
              <Ionicons name="person" size={40} color="#2563EB" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
              <Text style={styles.profilePhone}>+1 (555) 123-4567</Text>
            </View>
          </View>
          {renderSettingRow('log-out', 'Logout', undefined, handleLogout)}
        </View>

        {/* Location Section */}
        {renderSectionHeader('Location')}
        <View style={styles.section}>
          {renderSettingRow('location', 'Current Location', selectedLocation, () => setShowLocationModal(true), 
            <TouchableOpacity style={styles.changeButton} onPress={() => setShowLocationModal(true)}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Plan & Billing Section */}
        {renderSectionHeader('Plan & Billing')}
        <View style={styles.section}>
          <View style={styles.planCard}>
            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>Pro Plan</Text>
              <Text style={styles.planSubtitle}>14 days left in trial</Text>
              <Text style={styles.planSubtitle}>Next charge: Aug 28, 2025</Text>
            </View>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>TRIAL</Text>
            </View>
          </View>
          {renderSettingRow('card', 'Upgrade/Manage Plan', undefined, handleUpgradePlan)}
          {renderSettingRow('receipt', 'View Invoices', undefined, handleViewInvoices)}
        </View>

        {/* Notifications Section */}
        {renderSectionHeader('Notifications')}
        <View style={styles.section}>
          {renderSettingRow('star', 'New Review', 'Get notified when you receive a new review', undefined,
            <Switch
              value={notifications.newReview}
              onValueChange={() => handleNotificationToggle('newReview')}
              trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
              thumbColor="#fff"
            />
          )}
          {renderSettingRow('warning', 'Low-Rating Review', 'Alert for reviews below 3 stars', undefined,
            <Switch
              value={notifications.lowRating}
              onValueChange={() => handleNotificationToggle('lowRating')}
              trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
              thumbColor="#fff"
            />
          )}
          {renderSettingRow('trending-down', 'Rank Drop', 'Notify when your ranking drops', undefined,
            <Switch
              value={notifications.rankDrop}
              onValueChange={() => handleNotificationToggle('rankDrop')}
              trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
              thumbColor="#fff"
            />
          )}
          {renderSettingRow('card', 'Billing Issue', 'Alert for payment problems', undefined,
            <Switch
              value={notifications.billing}
              onValueChange={() => handleNotificationToggle('billing')}
              trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
              thumbColor="#fff"
            />
          )}
        </View>

        {/* Support Section */}
        {renderSectionHeader('Support')}
        <View style={styles.section}>
          {renderSettingRow('logo-whatsapp', 'Chat on WhatsApp', 'Get instant support', handleWhatsAppSupport)}
          {renderSettingRow('help-circle', 'Help Center', 'Browse articles and guides', handleHelpCenter)}
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmLogout}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Location Change Modal */}
      <Modal
        visible={showLocationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Location</Text>
            <Text style={styles.modalText}>This will open the global location selector.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowLocationModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={() => {
                  setShowLocationModal(false);
                  Alert.alert('Location Selector', 'Global location selector would open here.');
                }}
              >
                <Text style={styles.confirmButtonText}>Open Selector</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    ...Typography.styles.h3CardTitle,
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profilePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.styles.h3CardTitle,
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginBottom: 2,
  },
  profilePhone: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...Typography.styles.bodyPrimary,
    color: '#111827',
    marginBottom: 2,
  },
  settingSubtitle: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
  },
  changeButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  changeButtonText: {
    ...Typography.styles.buttonSecondary,
    color: '#fff',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    ...Typography.styles.h3CardTitle,
    color: '#111827',
    marginBottom: 4,
  },
  planSubtitle: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginBottom: 2,
  },
  planBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  planBadgeText: {
    ...Typography.styles.buttonSecondary,
    color: '#92400E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    ...Typography.styles.h3CardTitle,
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    ...Typography.styles.bodyPrimary,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    ...Typography.styles.buttonPrimary,
    color: '#374151',
  },
  confirmButton: {
    backgroundColor: '#DC2626',
  },
  confirmButtonText: {
    ...Typography.styles.buttonPrimary,
    color: '#fff',
  },
});

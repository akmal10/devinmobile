import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

interface FixItemProps {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Med' | 'Low';
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const FixItem: React.FC<FixItemProps> = ({ 
  id, 
  title, 
  description, 
  impact, 
  completed, 
  onToggleComplete, 
  onViewDetails 
}) => {
  const impactColors = {
    High: '#EF4444',
    Med: '#F59E0B',
    Low: '#10B981'
  };

  return (
    <View style={styles.fixCard}>
      <View style={styles.fixHeader}>
        <TouchableOpacity 
          style={[styles.checkbox, completed && styles.checkboxCompleted]}
          onPress={() => onToggleComplete(id)}
        >
          {completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
        <View style={styles.fixContent}>
          <Text style={[styles.fixTitle, completed && styles.fixTitleCompleted]}>{title}</Text>
          <Text style={styles.fixDescription}>{description}</Text>
          <View style={styles.fixFooter}>
            <View style={[styles.impactTag, { backgroundColor: impactColors[impact] + '20' }]}>
              <Text style={[styles.impactText, { color: impactColors[impact] }]}>
                {impact} Impact
              </Text>
            </View>
            <TouchableOpacity onPress={() => onViewDetails(id)} style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function AuditScreen() {
  const [fixes, setFixes] = useState([
    {
      id: '1',
      title: 'Add business description',
      description: 'Your business description is missing. This helps customers understand what you offer.',
      impact: 'High' as const,
      completed: false
    },
    {
      id: '2',
      title: 'Upload more photos',
      description: 'Add at least 5 high-quality photos to showcase your business.',
      impact: 'High' as const,
      completed: false
    },
    {
      id: '3',
      title: 'Verify phone number',
      description: 'Verify your business phone number to improve customer trust.',
      impact: 'Med' as const,
      completed: false
    },
    {
      id: '4',
      title: 'Update business hours',
      description: 'Ensure your business hours are accurate and up-to-date.',
      impact: 'Med' as const,
      completed: false
    },
    {
      id: '5',
      title: 'Add website URL',
      description: 'Link to your website to drive more traffic and conversions.',
      impact: 'Low' as const,
      completed: false
    }
  ]);

  const [completedFixes] = useState([
    {
      id: 'c1',
      title: 'Business category selected',
      description: 'Primary business category has been set.',
      completedAt: '2 days ago'
    },
    {
      id: 'c2',
      title: 'Address verified',
      description: 'Business address has been verified.',
      completedAt: '1 week ago'
    }
  ]);

  const [showCompleted, setShowCompleted] = useState(false);
  const [cooldownTime] = useState('3d 4h'); // Mock cooldown

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const handleRerunAudit = () => {
    Alert.alert('Re-run Audit', 'Audit will be re-run to check for latest changes.');
  };

  const handleToggleComplete = (id: string) => {
    setFixes(prevFixes => 
      prevFixes.map(fix => 
        fix.id === id ? { ...fix, completed: !fix.completed } : fix
      )
    );
    Alert.alert('Success', 'Fix status updated!');
  };

  const handleViewDetails = (id: string) => {
    console.log(`View details for fix: ${id}`);
  };

  const handleViewEditGoogle = () => {
    console.log('Navigate to Business Profile Viewer');
  };

  const activeFixes = fixes.filter(fix => !fix.completed);
  const auditScore = 78;
  const lastRunTime = '2 hours ago';

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Header Summary */}
        <View style={styles.headerSummary}>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{auditScore}</Text>
              <Text style={styles.scoreSubtext}>/100</Text>
            </View>
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreTitle}>Audit Score</Text>
              <Text style={styles.lastRun}>Last run: {lastRunTime}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.rerunButton} onPress={handleRerunAudit}>
            <Ionicons name="refresh" size={16} color="#2563EB" />
            <Text style={styles.rerunButtonText}>Re-run audit</Text>
          </TouchableOpacity>
          {cooldownTime && (
            <View style={styles.cooldownChip}>
              <Ionicons name="time" size={12} color="#6B7280" />
              <Text style={styles.cooldownText}>Available in {cooldownTime}</Text>
            </View>
          )}
        </View>

        {/* Top 5 Fixes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Fixes ({activeFixes.length})</Text>
          {activeFixes.map(fix => (
            <FixItem
              key={fix.id}
              id={fix.id}
              title={fix.title}
              description={fix.description}
              impact={fix.impact}
              completed={fix.completed}
              onToggleComplete={handleToggleComplete}
              onViewDetails={handleViewDetails}
            />
          ))}
        </View>

        {/* Completed Fixes */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.accordionHeader}
            onPress={() => setShowCompleted(!showCompleted)}
          >
            <Text style={styles.accordionTitle}>
              Completed fixes ({completedFixes.length})
            </Text>
            <Ionicons 
              name={showCompleted ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
          {!showCompleted && completedFixes.length > 0 && (
            <Text style={styles.lastCompletedText}>
              Last: {completedFixes[0].title} • {completedFixes[0].completedAt}
            </Text>
          )}
          {showCompleted && (
            <View style={styles.completedList}>
              {completedFixes.map(fix => (
                <View key={fix.id} style={styles.completedItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <View style={styles.completedContent}>
                    <Text style={styles.completedTitle}>{fix.title}</Text>
                    <Text style={styles.completedTime}>{fix.completedAt}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Business Profile Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Profile</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Verification Status</Text>
              <View style={styles.verificationBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.verificationText}>Verified</Text>
              </View>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Primary Category</Text>
              <Text style={styles.profileValue}>Restaurant</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Description</Text>
              <Text style={styles.profileValue}>156/500 characters</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Hours Completeness</Text>
              <Text style={styles.profileValue}>85% complete</Text>
            </View>
            <TouchableOpacity style={styles.editGoogleButton} onPress={handleViewEditGoogle}>
              <Ionicons name="open-outline" size={16} color="#2563EB" />
              <Text style={styles.editGoogleButtonText}>View & Edit on Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  headerSummary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  scoreSubtext: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  scoreInfo: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  lastRun: {
    fontSize: 14,
    color: '#6B7280',
  },
  rerunButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  rerunButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginLeft: 6,
  },
  cooldownChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  cooldownText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  fixCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  fixHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  fixContent: {
    flex: 1,
  },
  fixTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  fixTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  fixDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  fixFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  impactTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  detailsButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  lastCompletedText: {
    fontSize: 14,
    color: '#6B7280',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  completedList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  completedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  completedContent: {
    marginLeft: 12,
    flex: 1,
  },
  completedTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  completedTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  profileValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
    marginLeft: 4,
  },
  editGoogleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  editGoogleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginLeft: 6,
  },
});

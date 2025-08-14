import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
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

const CircularProgress = ({ score }: { score: number }) => {
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / 100) * circumference;

  return (
    <View style={styles.circularProgressContainer}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2563EB"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.circularProgressText}>
        <Text style={styles.scoreNumber}>{score}</Text>
        <Text style={styles.scoreLabel}>Good</Text>
      </View>
    </View>
  );
};

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
  const auditScore = 85;
  const lastRunTime = 'Jul 20, 2025';

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Audit Score Card */}
        <View style={styles.auditScoreCard}>
          <Text style={styles.cardTitle}>Audit Score Card</Text>
          
          <CircularProgress score={auditScore} />
          
          <Text style={styles.lastAuditDate}>
            Last Audit Date = {lastRunTime}
          </Text>
          
          <TouchableOpacity style={styles.runNewAuditButton} onPress={handleRerunAudit}>
            <Text style={styles.runNewAuditButtonText}>Run New Audit</Text>
          </TouchableOpacity>
          
          <Text style={styles.nextAuditText}>
            Next audit allowed in 5 days
          </Text>
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
  auditScoreCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2563EB',
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  circularProgressContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  circularProgressText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  lastAuditDate: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 20,
    fontWeight: '500',
  },
  runNewAuditButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  runNewAuditButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  nextAuditText: {
    fontSize: 14,
    color: '#6B7280',
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

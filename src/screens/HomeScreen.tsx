import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import CommonHeader from '../components/CommonHeader';
import DateFilter from '../components/DateFilter';
import { useDate } from '../contexts/DateContext';
import { Typography } from '../constants/Typography';

interface CircularProgressProps {
  score: number;
}

interface RecommendationCardProps {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  icon: string;
  iconColor: string;
  onReadMore: (id: string) => void;
  onDismiss: (id: string) => void;
}

interface ActivityItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  timeAgo: string;
  onView?: () => void;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ score }) => {
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = (score / 100) * circumference;

  return (
    <View style={styles.circularProgressContainer}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
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
      </View>
    </View>
  );
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  title,
  description,
  priority,
  icon,
  iconColor,
  onReadMore,
  onDismiss,
}) => {
  return (
    <View style={styles.recommendationCard}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: priority === 'High' ? '#FEE2E2' : priority === 'Medium' ? '#FEF3C7' : '#ECFDF5' }]}>
          <Text style={[styles.priorityText, { color: priority === 'High' ? '#DC2626' : priority === 'Medium' ? '#D97706' : '#059669' }]}>
            {priority}
          </Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>{description}</Text>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.readMoreButton} onPress={() => onReadMore(id)}>
          <Text style={styles.readMoreButtonText}>Read More</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDismiss(id)}>
          <Text style={styles.dismissText}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, timeAgo, onView }) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIconContainer}>
      <Ionicons name={icon} size={16} color="#2563EB" />
    </View>
    <View style={styles.activityContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityTime}>{timeAgo}</Text>
    </View>
    {onView && (
      <TouchableOpacity onPress={onView} style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default function HomeScreen() {
  const { 
    selectedPeriod, 
    setSelectedPeriod, 
    comparisonEnabled, 
    setComparisonEnabled 
  } = useDate();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log('Date period changed to:', period);
  };

  const handleComparisonToggle = (enabled: boolean) => {
    setComparisonEnabled(enabled);
    console.log('Comparison mode:', enabled);
  };

  const handleReadMore = (id: string) => {
    const recommendation = mergedRecommendations.find(r => r.id === id);
    setSelectedRecommendation(recommendation);
    setModalVisible(true);
  };

  const handleDismiss = (id: string) => {
    Alert.alert('Dismissed', `Recommendation ${id} has been dismissed.`);
  };

  const handleReplyPress = () => {
    console.log('Navigate to pending replies');
  };

  const handleActivityView = (activityType: string) => {
    console.log(`View ${activityType} details`);
  };

  const auditScore = 85;
  
  const businessActivityData = [
    {
      id: 'total-views',
      title: 'Total views',
      value: '2,567',
      subtitle: '▲ 20% from april',
      changePositive: true
    },
    {
      id: 'website-visits',
      title: 'Website visits',
      value: '567',
      subtitle: '▲ 20% from april',
      changePositive: true
    },
    {
      id: 'calls',
      title: 'Calls',
      value: '80',
      subtitle: '▲ 20% from april',
      changePositive: true
    }
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 98 },
    { stars: 4, percentage: 1 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 1 }
  ];

  const mergedRecommendations = [
    {
      id: '1',
      title: 'Add business description',
      description: 'Complete your business profile to improve visibility and customer engagement.',
      priority: 'High' as const,
      icon: 'warning',
      iconColor: '#EF4444'
    },
    {
      id: '2',
      title: 'Reply to recent reviews',
      description: 'Respond to 7 pending customer reviews to improve engagement.',
      priority: 'High' as const,
      icon: 'chatbubbles',
      iconColor: '#EF4444'
    },
    {
      id: '3',
      title: 'Improve grid ranking',
      description: 'Focus on downtown area to maintain top ranking position.',
      priority: 'Medium' as const,
      icon: 'map',
      iconColor: '#F59E0B'
    },
    {
      id: '4',
      title: 'Add more photos',
      description: 'Upload 3 more photos to enhance your business profile.',
      priority: 'Medium' as const,
      icon: 'camera',
      iconColor: '#F59E0B'
    }
  ];

  const recentActivityData = [
    {
      icon: 'star' as keyof typeof Ionicons.glyphMap,
      title: 'Received 5★ review',
      timeAgo: '2 hours ago',
      onView: () => handleActivityView('review')
    },
    {
      icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
      title: 'Audit item marked done',
      timeAgo: '4 hours ago',
      onView: () => handleActivityView('audit')
    },
    {
      icon: 'document-text' as keyof typeof Ionicons.glyphMap,
      title: 'Profile description updated',
      timeAgo: '1 day ago',
      onView: () => handleActivityView('profile')
    },
    {
      icon: 'call' as keyof typeof Ionicons.glyphMap,
      title: 'Phone number verified',
      timeAgo: '2 days ago',
      onView: () => handleActivityView('verification')
    },
    {
      icon: 'location' as keyof typeof Ionicons.glyphMap,
      title: 'Grid ranking updated',
      timeAgo: '3 days ago',
      onView: () => handleActivityView('grid')
    }
  ];

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      <DateFilter 
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        comparisonEnabled={comparisonEnabled}
        onComparisonToggle={handleComparisonToggle}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* Widget #1 - GMB Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GMB Profile</Text>
          <View style={styles.gmbProfileWidget}>
            <View style={styles.auditScoreSection}>
              <Text style={styles.widgetSubtitle}>Audit Score</Text>
              <CircularProgress score={auditScore} />
              <Text style={styles.auditScoreText}>Good</Text>
            </View>
            <View style={styles.businessActivitySection}>
              <Text style={styles.widgetSubtitle}>Business Activity</Text>
              {businessActivityData.map((item) => (
                <View key={item.id} style={styles.activityItem}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activityValue}>{item.value}</Text>
                  <Text style={[styles.activitySubtitle, { color: item.changePositive ? '#10B981' : '#EF4444' }]}>
                    {item.subtitle}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Widget #2 - Review */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewWidget}>
            {/* Header with Rating tab and Total Reviews badge */}
            <View style={styles.reviewHeader}>
              <View style={styles.ratingTab}>
                <Text style={styles.ratingTabText}>Rating</Text>
                <Ionicons name="information-circle-outline" size={16} color="#6B7280" style={styles.infoIcon} />
              </View>
              <View style={styles.totalReviewsBadge}>
                <Text style={styles.totalReviewsText}>Total Reviews 145</Text>
              </View>
            </View>

            {/* Large rating display */}
            <View style={styles.ratingDisplayContainer}>
              <Text style={styles.ratingValue}>4.90</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={20} color="#FCD34D" />
                ))}
              </View>
            </View>

            {/* Review breakdown */}
            <View style={styles.ratingBreakdownContainer}>
              <Text style={styles.reviewLabel}>Review</Text>
              
              {ratingBreakdown.map((rating) => (
                <View key={rating.stars} style={styles.ratingRow}>
                  <View style={styles.ratingRowLeft}>
                    <Text style={styles.starNumber}>{rating.stars}</Text>
                    <Ionicons name="star" size={16} color="#FCD34D" />
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                      <View 
                        style={[
                          styles.progressBarFill, 
                          { 
                            width: `${rating.percentage}%`,
                            backgroundColor: rating.percentage > 0 ? '#FCD34D' : '#E5E7EB'
                          }
                        ]} 
                      />
                    </View>
                  </View>
                  <Text style={styles.percentageText}>{rating.percentage} %</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.checkAllReviewsButton} onPress={handleReplyPress}>
              <Text style={styles.checkAllReviewsButtonText}>Check All Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Widget #3 - Grid Ranking Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grid Ranking</Text>
          <View style={styles.gridWidget}>
            <View style={styles.gridProgressBar} />
            <Text style={styles.lastRunDate}>Last run: Jun 19, 2025</Text>
            <View style={styles.gridStats}>
              <View style={styles.mainGridStat}>
                <Text style={styles.gridRankValue}>9.29</Text>
                <Text style={styles.gridRankLabel}>Avg. Map Rank</Text>
              </View>
              <View style={styles.gridChange}>
                <View style={styles.changeContainer}>
                  <Text style={styles.changeValue}>0.1</Text>
                  <Ionicons name="arrow-down" size={16} color="#EF4444" />
                </View>
                <Text style={styles.changeLabel}>Change</Text>
              </View>
            </View>
            <View style={styles.cellStats}>
              <Text style={styles.cellStat}>Best: Rank 1 - Downtown</Text>
              <Text style={styles.cellStat}>Worst: Rank 15 - Suburbs</Text>
            </View>
          </View>
        </View>

        {/* Widget #4 - Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationContainer}>
            {mergedRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                {...recommendation}
                onReadMore={handleReadMore}
                onDismiss={handleDismiss}
              />
            ))}
          </ScrollView>
        </View>

        {/* Widget #5 - Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.modernActivityContainer}>
            {recentActivityData.map((activity, index) => (
              <View key={index} style={styles.modernActivityItem}>
                <View style={styles.activityIconContainer}>
                  <Ionicons name={activity.icon} size={20} color="#2563EB" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.modernActivityTitle}>{activity.title}</Text>
                  <Text style={styles.modernActivityTime}>{activity.timeAgo}</Text>
                </View>
                {activity.onView && (
                  <TouchableOpacity style={styles.modernViewButton} onPress={activity.onView}>
                    <Text style={styles.modernViewButtonText}>View</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Read More Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedRecommendation?.title}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              {selectedRecommendation?.description}
            </Text>
            <Text style={styles.modalDetailText}>
              This recommendation will help improve your business visibility and customer engagement. Follow the suggested actions to see positive results in your analytics.
            </Text>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.styles.h3CardTitle,
    color: '#1F2937',
    marginBottom: 16,
  },
  
  circularProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 8,
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
    ...Typography.styles.chartMainValue,
    color: '#1F2937',
  },

  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    ...Typography.styles.caption,
  },
  cardTitle: {
    ...Typography.styles.bodyPrimary,
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  readMoreButtonText: {
    ...Typography.styles.buttonSecondary,
    color: '#fff',
  },
  dismissText: {
    ...Typography.styles.buttonSecondary,
    color: '#6B7280',
  },

  gmbProfileWidget: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  auditScoreSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  widgetSubtitle: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
    marginBottom: 12,
  },
  auditScoreText: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
  },
  businessActivitySection: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  activityTitle: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
    flex: 1,
  },
  activityValue: {
    ...Typography.styles.bodyPrimary,
    color: '#1F2937',
    marginRight: 8,
  },
  activitySubtitle: {
    ...Typography.styles.caption,
  },
  activityTime: {
    ...Typography.styles.caption,
    color: '#6B7280',
  },
  viewButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewButtonText: {
    ...Typography.styles.caption,
    color: '#374151',
  },

  reviewWidget: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ratingTabText: {
    ...Typography.styles.buttonSecondary,
    color: '#1F2937',
  },
  infoIcon: {
    marginLeft: 8,
  },
  totalReviewsBadge: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalReviewsText: {
    ...Typography.styles.buttonSecondary,
    color: '#fff',
  },
  ratingDisplayContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingValue: {
    fontSize: 48,
    fontFamily: 'Inter_600SemiBold',
    fontWeight: '600' as const,
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 48 * 1.2,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ratingBreakdownContainer: {
    marginBottom: 20,
  },
  reviewLabel: {
    ...Typography.styles.bodyPrimary,
    color: '#1F2937',
    marginBottom: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  starNumber: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
    marginRight: 4,
  },
  progressBarContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
    width: 50,
    textAlign: 'right',
  },
  checkAllReviewsButton: {
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  checkAllReviewsButtonText: {
    ...Typography.styles.buttonPrimary,
    color: '#2563EB',
  },

  gridWidget: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridProgressBar: {
    height: 4,
    backgroundColor: '#2563EB',
    borderRadius: 2,
    marginBottom: 16,
  },
  lastRunDate: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginBottom: 16,
  },
  gridStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainGridStat: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
  },
  gridRankValue: {
    ...Typography.styles.h1PageTitle,
    color: '#fff',
    marginBottom: 4,
  },
  gridRankLabel: {
    ...Typography.styles.bodySecondary,
    color: '#fff',
    opacity: 0.9,
  },
  gridChange: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  changeValue: {
    ...Typography.styles.chartMainValue,
    color: '#1F2937',
    marginRight: 4,
  },
  changeLabel: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
  },
  cellStats: {
    gap: 8,
  },
  cellStat: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
  },

  recommendationContainer: {
    flexDirection: 'row',
  },

  modernActivityContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modernActivityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  modernActivityTitle: {
    ...Typography.styles.bodySecondary,
    color: '#1F2937',
    marginBottom: 2,
  },
  modernActivityTime: {
    ...Typography.styles.caption,
    color: '#6B7280',
  },
  modernViewButton: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modernViewButtonText: {
    ...Typography.styles.caption,
    color: '#fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    ...Typography.styles.h3CardTitle,
    color: '#1F2937',
    flex: 1,
  },
  modalDescription: {
    ...Typography.styles.bodyPrimary,
    color: '#374151',
    marginBottom: 16,
  },
  modalDetailText: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    ...Typography.styles.buttonPrimary,
    color: '#fff',
  },
});

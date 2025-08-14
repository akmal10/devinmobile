import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';
import DateFilter from '../components/DateFilter';
import { useDate } from '../contexts/DateContext';

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
          <Ionicons name={icon as any} size={24} color={iconColor} />
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.readMoreButton} onPress={() => onReadMore(id)}>
          <Text style={styles.readMoreButtonText}>Read More</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDismiss(id)}>
          <Text style={styles.dismissText}>dismiss</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ReviewsScreen() {
  const { 
    selectedPeriod, 
    setSelectedPeriod, 
    comparisonEnabled, 
    setComparisonEnabled 
  } = useDate();
  const [recommendations] = useState([
    {
      id: '1',
      title: 'Respond to negative reviews',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultricies scelerisque netus est urna porttitor.',
      priority: 'High' as const,
      icon: 'warning',
      iconColor: '#EF4444'
    },
    {
      id: '2',
      title: 'Encourage more reviews',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultricies scelerisque netus est urna porttitor.',
      priority: 'Medium' as const,
      icon: 'bulb',
      iconColor: '#F59E0B'
    },
    {
      id: '3',
      title: 'Improve response time',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultricies scelerisque netus est urna porttitor.',
      priority: 'Low' as const,
      icon: 'bulb-outline',
      iconColor: '#10B981'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

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
    const recommendation = recommendations.find(r => r.id === id);
    setSelectedRecommendation(recommendation);
    setModalVisible(true);
  };

  const handleDismiss = (id: string) => {
    Alert.alert('Dismissed', `Recommendation ${id} has been dismissed.`);
  };

  const handleCheckAllReviews = () => {
    setShowAllReviews(true);
  };

  const handleBackToReviews = () => {
    setShowAllReviews(false);
  };

  const filteredRecommendations = selectedFilter === 'All' 
    ? recommendations 
    : recommendations.filter(r => r.priority === selectedFilter.replace(' Priority', ''));

  const filters = ['All', 'High Priority', 'Medium Priority', 'Low Priority'];

  const overviewData = [
    {
      id: 'average-rating',
      title: 'Average Rating',
      value: '4.3',
      subtitle: '/ 5',
      icon: 'star',
      iconColor: '#FCD34D',
      trend: 'up'
    },
    {
      id: 'total-reviews',
      title: 'Total Reviews',
      value: '1,254',
      subtitle: '+3.4%',
      icon: 'chatbubbles',
      iconColor: '#2563EB',
      trend: 'up'
    },
    {
      id: 'positive',
      title: 'Positive',
      value: '72%',
      subtitle: '',
      icon: 'thumbs-up',
      iconColor: '#10B981',
      trend: null
    },
    {
      id: 'negative',
      title: 'Negative',
      value: '18%',
      subtitle: '',
      icon: 'thumbs-down',
      iconColor: '#EF4444',
      trend: null
    },
    {
      id: 'response-rate',
      title: 'Response Rate',
      value: '86%',
      subtitle: '2h 15m',
      icon: 'time',
      iconColor: '#2563EB',
      trend: null
    }
  ];

  if (showAllReviews) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>All Reviews Screen - Coming Soon</Text>
        <TouchableOpacity onPress={handleBackToReviews}>
          <Text style={styles.sectionTitle}>← Back to Reviews</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        {/* Overview Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.overviewContainer}>
            {overviewData.map((item) => (
              <View key={item.id} style={styles.overviewCard}>
                <View style={styles.overviewCardHeader}>
                  <Text style={styles.overviewCardTitle}>{item.title}</Text>
                </View>
                <View style={styles.overviewCardContent}>
                  <View style={styles.overviewValueContainer}>
                    <Text style={styles.overviewCardValue}>{item.value}</Text>
                    {item.subtitle && (
                      <Text style={styles.overviewCardSubtitle}>{item.subtitle}</Text>
                    )}
                    {item.trend === 'up' && (
                      <Ionicons name="trending-up" size={16} color="#10B981" style={styles.trendIcon} />
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.sectionTitle}>Recommendation</Text>
            <View style={styles.recommendationBadge}>
              <Text style={styles.recommendationBadgeText}>211 📊 35</Text>
            </View>
          </View>
          
          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  selectedFilter === filter && styles.filterTabActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Recommendation Cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendationContainer}>
            {filteredRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                {...recommendation}
                onReadMore={handleReadMore}
                onDismiss={handleDismiss}
              />
            ))}
          </ScrollView>
        </View>

        {/* Reviews Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews Summary</Text>
          
          {/* Summary Filter Tabs */}
          <View style={styles.summaryFilterContainer}>
            <TouchableOpacity style={[styles.summaryFilterTab, styles.summaryFilterTabActive]}>
              <Text style={[styles.summaryFilterTabText, styles.summaryFilterTabTextActive]}>Rating</Text>
            </TouchableOpacity>
            <View style={styles.totalReviewsBadge}>
              <Text style={styles.totalReviewsText}>Total Reviews 145</Text>
            </View>
          </View>

          {/* Rating Summary Card */}
          <View style={styles.ratingSummaryCard}>
            <View style={styles.ratingDisplayContainer}>
              <Text style={styles.ratingValue}>4.90</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons key={star} name="star" size={20} color="#FCD34D" />
                ))}
              </View>
            </View>

            <View style={styles.ratingBreakdownContainer}>
              <Text style={styles.reviewLabel}>Review</Text>
              
              {[
                { stars: 5, percentage: 98, color: '#FCD34D' },
                { stars: 4, percentage: 1, color: '#FCD34D' },
                { stars: 3, percentage: 0, color: '#E5E7EB' },
                { stars: 2, percentage: 0, color: '#E5E7EB' },
                { stars: 1, percentage: 1, color: '#FCD34D' }
              ].map((rating) => (
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
                            backgroundColor: rating.color
                          }
                        ]} 
                      />
                    </View>
                  </View>
                  <Text style={styles.percentageText}>{rating.percentage} %</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.checkAllReviewsButton} onPress={handleCheckAllReviews}>
              <Text style={styles.checkAllReviewsButtonText}>Check All Reviews</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sentiment Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sentiment Breakdown</Text>
          
          <View style={styles.sentimentCard}>
            {/* Bar Chart */}
            <View style={styles.chartContainer}>
              <View style={styles.barChart}>
                <View style={styles.barRow}>
                  <Text style={styles.barLabel}>Positive</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.barFill, styles.positiveBar, { width: '60%' }]} />
                  </View>
                  <Text style={styles.barValue}>60%</Text>
                </View>
                <View style={styles.barRow}>
                  <Text style={styles.barLabel}>Negative</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.barFill, styles.negativeBar, { width: '25%' }]} />
                  </View>
                  <Text style={styles.barValue}>25%</Text>
                </View>
                <View style={styles.barRow}>
                  <Text style={styles.barLabel}>Neutral</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.barFill, styles.neutralBar, { width: '15%' }]} />
                  </View>
                  <Text style={styles.barValue}>15%</Text>
                </View>
              </View>
            </View>

            {/* Sentiment Data Cards */}
            <View style={styles.sentimentDataContainer}>
              <View style={styles.sentimentDataRow}>
                <View style={styles.sentimentIndicator}>
                  <View style={[styles.sentimentDot, { backgroundColor: '#10B981' }]} />
                  <Text style={styles.sentimentLabel}>Positive</Text>
                </View>
                <Text style={styles.sentimentValue}>1,476</Text>
              </View>
              
              <View style={styles.sentimentDataRow}>
                <View style={styles.sentimentIndicator}>
                  <View style={[styles.sentimentDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={styles.sentimentLabel}>Negative</Text>
                </View>
                <Text style={styles.sentimentValue}>615</Text>
              </View>
              
              <View style={styles.sentimentDataRow}>
                <View style={styles.sentimentIndicator}>
                  <View style={[styles.sentimentDot, { backgroundColor: '#3B82F6' }]} />
                  <Text style={styles.sentimentLabel}>Neutral</Text>
                </View>
                <Text style={styles.sentimentValue}>369</Text>
              </View>
            </View>
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
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalDescription}>
                {selectedRecommendation?.description}
              </Text>
              <Text style={styles.modalDetailText}>
                This is a detailed explanation of the recommendation. Here you would find comprehensive information about why this recommendation is important, how to implement it, and what benefits it will bring to your business.
              </Text>
              <Text style={styles.modalDetailText}>
                Priority: {selectedRecommendation?.priority}
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  overviewContainer: {
    marginBottom: 8,
  },
  overviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  overviewCardHeader: {
    marginBottom: 12,
  },
  overviewCardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 18,
  },
  overviewCardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  overviewValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  overviewCardValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2563EB',
    marginRight: 4,
  },
  overviewCardSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 4,
  },
  trendIcon: {
    marginLeft: 4,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  recommendationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  filterTabActive: {
    backgroundColor: '#2563EB',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  recommendationContainer: {
    marginBottom: 8,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 280,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minHeight: 44,
    justifyContent: 'center',
  },
  readMoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  dismissText: {
    color: '#6B7280',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 4,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  modalDetailText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  summaryFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryFilterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  summaryFilterTabActive: {
    backgroundColor: '#E5E7EB',
  },
  summaryFilterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  summaryFilterTabTextActive: {
    color: '#1F2937',
  },
  totalReviewsBadge: {
    backgroundColor: '#6B7280',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  totalReviewsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  ratingSummaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ratingDisplayContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  ratingValue: {
    fontSize: 48,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingBreakdownContainer: {
    marginBottom: 20,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
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
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    width: 40,
    textAlign: 'right',
  },
  checkAllReviewsButton: {
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 44,
  },
  checkAllReviewsButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '500',
  },
  sentimentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartContainer: {
    marginBottom: 24,
  },
  barChart: {
    gap: 16,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    width: 60,
  },
  barContainer: {
    flex: 1,
    height: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 12,
  },
  positiveBar: {
    backgroundColor: '#10B981',
  },
  negativeBar: {
    backgroundColor: '#EF4444',
  },
  neutralBar: {
    backgroundColor: '#3B82F6',
  },
  barValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    width: 40,
    textAlign: 'right',
  },
  sentimentDataContainer: {
    gap: 16,
  },
  sentimentDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sentimentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentimentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  sentimentLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  sentimentValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
});

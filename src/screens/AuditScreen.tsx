import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import CommonHeader from '../components/CommonHeader';
import DateFilter from '../components/DateFilter';
import { useDate } from '../contexts/DateContext';

interface RecommendationItemProps {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  icon: string;
  iconColor: string;
  onReadMore: (id: string) => void;
  onDismiss: (id: string) => void;
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

const RecommendationCard: React.FC<RecommendationItemProps> = ({ 
  id, 
  title, 
  description, 
  priority, 
  icon,
  iconColor,
  onReadMore, 
  onDismiss 
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

export default function AuditScreen() {
  const { selectedPeriod, setSelectedPeriod, comparisonEnabled, setComparisonEnabled } = useDate();
  const [recommendations] = useState([
    {
      id: '1',
      title: 'Add business description',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultricies scelerisque netus est urna porttitor.',
      priority: 'High' as const,
      icon: 'warning',
      iconColor: '#EF4444'
    },
    {
      id: '2',
      title: 'Add 3 more photos',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultricies scelerisque netus est urna porttitor.',
      priority: 'Medium' as const,
      icon: 'bulb',
      iconColor: '#F59E0B'
    },
    {
      id: '3',
      title: 'Add more services',
      description: 'Lorem ipsum dolor sit amet consectetur. Ultricies scelerisque netus est urna porttitor.',
      priority: 'Low' as const,
      icon: 'bulb-outline',
      iconColor: '#10B981'
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<any>(null);

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const handleRerunAudit = () => {
    Alert.alert('Re-run Audit', 'Audit will be re-run to check for latest changes.');
  };

  const handleReadMore = (id: string) => {
    const recommendation = recommendations.find(r => r.id === id);
    setSelectedRecommendation(recommendation);
    setModalVisible(true);
  };

  const handleDismiss = (id: string) => {
    Alert.alert('Dismissed', `Recommendation ${id} has been dismissed.`);
  };

  const handleViewEditGoogle = () => {
    console.log('Navigate to Business Profile Viewer');
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log('Date period changed to:', period);
  };

  const handleComparisonToggle = (enabled: boolean) => {
    setComparisonEnabled(enabled);
    console.log('Comparison mode:', enabled);
  };

  const auditScore = 85;
  const lastRunTime = 'Jul 20, 2025';
  
  const filteredRecommendations = recommendations;
  
  const businessSummaryData = [
    {
      id: 'rating',
      title: 'Rating',
      value: '4.94',
      subtitle: '145 Reviews',
      icon: 'star',
      iconColor: '#FCD34D'
    },
    {
      id: 'categories',
      title: 'Categories',
      value: '10.0',
      subtitle: 'Average Categories',
      icon: 'list',
      iconColor: '#2563EB'
    },
    {
      id: 'photos',
      title: 'Photos',
      value: '74',
      subtitle: '0 New\nLifetime',
      icon: 'camera',
      iconColor: '#2563EB'
    },
    {
      id: 'products',
      title: 'Products',
      value: '3',
      subtitle: '0 New\nLifetime',
      icon: 'cube',
      iconColor: '#2563EB'
    },
    {
      id: 'services',
      title: 'Services',
      value: '34',
      subtitle: '0 New\nLifetime',
      icon: 'construct',
      iconColor: '#2563EB'
    },
    {
      id: 'visibility',
      title: 'Visibility Score',
      value: '32%',
      subtitle: '0.00%\nAcross 20 Keywords',
      icon: 'eye',
      iconColor: '#2563EB'
    }
  ];

  const businessActivityData = [
    {
      id: 'total-views',
      title: 'Total views',
      value: '2,567',
      subtitle: '▲ 20% from april',
      isHighlighted: true,
      changePositive: true
    },
    {
      id: 'website-visits',
      title: 'Visited your website',
      value: '567',
      subtitle: '▲ 20% from april',
      changePositive: true
    },
    {
      id: 'calls',
      title: 'Called you',
      value: '80',
      subtitle: '▲ 20% from april',
      changePositive: true
    },
    {
      id: 'directions',
      title: 'Asked for direction',
      value: '123',
      subtitle: '▼ 20% from april',
      changePositive: false
    },
    {
      id: 'post-views',
      title: 'Posts views',
      value: '489',
      subtitle: '▼ 20% from april',
      changePositive: false
    },
    {
      id: 'post-clicks',
      title: 'Posts clicks',
      value: '42',
      subtitle: '▲ 20% from april',
      changePositive: true
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
        {/* Audit Score Card */}
        <View style={styles.auditScoreCard}>
          <Text style={styles.auditCardTitle}>Audit Score Card</Text>
          
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

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendation</Text>
          
          <DateFilter
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            comparisonEnabled={comparisonEnabled}
            onComparisonToggle={handleComparisonToggle}
          />

          {/* Recommendation Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.cardsContainer}
            contentContainerStyle={styles.cardsContentContainer}
          >
            {filteredRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                id={recommendation.id}
                title={recommendation.title}
                description={recommendation.description}
                priority={recommendation.priority}
                icon={recommendation.icon}
                iconColor={recommendation.iconColor}
                onReadMore={handleReadMore}
                onDismiss={handleDismiss}
              />
            ))}
          </ScrollView>
        </View>

        {/* Business Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Summary</Text>
          
          <DateFilter
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            comparisonEnabled={comparisonEnabled}
            onComparisonToggle={handleComparisonToggle}
          />

          {/* Business Summary Widgets Grid */}
          <View style={styles.summaryGrid}>
            {businessSummaryData.map((item) => (
              <View key={item.id} style={styles.summaryWidget}>
                <View style={styles.summaryWidgetHeader}>
                  <Text style={styles.summaryWidgetTitle}>{item.title}</Text>
                </View>
                <View style={styles.summaryWidgetContent}>
                  <Text style={styles.summaryWidgetValue}>{item.value}</Text>
                  {item.id === 'rating' && (
                    <Ionicons name="star" size={20} color="#FCD34D" style={styles.starIcon} />
                  )}
                </View>
                <Text style={styles.summaryWidgetSubtitle}>{item.subtitle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Business Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Activity</Text>
          
          <DateFilter
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            comparisonEnabled={comparisonEnabled}
            onComparisonToggle={handleComparisonToggle}
          />

          {/* Business Activity Widgets Grid */}
          <View style={styles.activityGrid}>
            {businessActivityData.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.activityWidget,
                  item.isHighlighted && styles.activityWidgetHighlighted
                ]}
              >
                <View style={styles.activityWidgetHeader}>
                  <Text style={styles.activityWidgetTitle}>{item.title}</Text>
                </View>
                <View style={styles.activityWidgetContent}>
                  <Text style={styles.activityWidgetValue}>{item.value}</Text>
                </View>
                <Text style={[
                  styles.activityWidgetSubtitle,
                  item.changePositive ? styles.positiveChange : styles.negativeChange
                ]}>
                  {item.subtitle}
                </Text>
              </View>
            ))}
          </View>
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
              This is detailed information about the recommendation. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
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
  auditCardTitle: {
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
  cardsContainer: {
    marginTop: 16,
  },
  cardsContentContainer: {
    paddingLeft: 16,
    paddingRight: 160,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 50,
    width: 460,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  readMoreButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  readMoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  dismissText: {
    color: '#6B7280',
    fontSize: 14,
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
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 24,
  },
  modalDetailText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalCloseButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryWidget: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
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
  summaryWidgetHeader: {
    marginBottom: 8,
  },
  summaryWidgetTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  summaryWidgetContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  summaryWidgetValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2563EB',
  },
  starIcon: {
    marginLeft: 4,
  },
  summaryWidgetSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityWidget: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
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
  activityWidgetHighlighted: {
    borderColor: '#2563EB',
    borderWidth: 2,
  },
  activityWidgetHeader: {
    marginBottom: 8,
  },
  activityWidgetTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activityWidgetContent: {
    marginBottom: 4,
  },
  activityWidgetValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  activityWidgetSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  positiveChange: {
    color: '#10B981',
  },
  negativeChange: {
    color: '#EF4444',
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

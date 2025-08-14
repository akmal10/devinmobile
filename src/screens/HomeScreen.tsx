import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';
import DateFilter from '../components/DateFilter';
import { useDate } from '../contexts/DateContext';

interface KPICardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
}

interface ActionCardProps {
  title: string;
  count?: number;
  onPress: () => void;
}

interface ActivityItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  timeAgo: string;
  onView?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({ icon, label, value, delta, deltaType }) => (
  <View style={styles.kpiCard}>
    <Ionicons name={icon} size={20} color="#2563EB" style={styles.kpiIcon} />
    <Text style={styles.kpiLabel}>{label}</Text>
    <Text style={styles.kpiValue}>{value}</Text>
    {delta && (
      <View style={styles.deltaContainer}>
        <Ionicons 
          name={deltaType === 'up' ? 'arrow-up' : deltaType === 'down' ? 'arrow-down' : 'remove'} 
          size={12} 
          color={deltaType === 'up' ? '#10B981' : deltaType === 'down' ? '#EF4444' : '#6B7280'} 
        />
        <Text style={[
          styles.deltaText,
          { color: deltaType === 'up' ? '#10B981' : deltaType === 'down' ? '#EF4444' : '#6B7280' }
        ]}>
          {delta}
        </Text>
      </View>
    )}
  </View>
);

const ActionCard: React.FC<ActionCardProps> = ({ title, count, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress}>
    <View style={styles.actionCardContent}>
      <Text style={styles.actionCardTitle}>{title}</Text>
      {count !== undefined && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </View>
    <Ionicons name="chevron-forward" size={20} color="#6B7280" />
  </TouchableOpacity>
);

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

  const handleUnrepliedReviews = () => {
    console.log('Navigate to unreplied reviews');
  };

  const handleRankDrop = () => {
    console.log('Navigate to Grid');
  };

  const handleTopFixes = () => {
    console.log('Navigate to Audit Overview');
  };

  const handleBusinessProfile = () => {
    console.log('Navigate to Business Profile Viewer');
  };

  const handleActivityView = (activity: string) => {
    console.log(`View activity: ${activity}`);
  };

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
        {/* KPI Strip */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{selectedPeriod}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiStrip}>
            <KPICard icon="chatbubble" label="New Reviews" value="24" delta={comparisonEnabled ? "+12%" : "+12%"} deltaType="up" />
            <KPICard icon="star" label="Avg Rating" value="4.2" delta={comparisonEnabled ? "-0.1" : "-0.1"} deltaType="down" />
            <KPICard icon="call" label="Calls" value="156" delta={comparisonEnabled ? "+8%" : "+8%"} deltaType="up" />
            <KPICard icon="navigate" label="Directions" value="89" delta={comparisonEnabled ? "+15%" : "+15%"} deltaType="up" />
            <KPICard icon="trending-up" label="Grid Rank Δ" value="+3" delta={comparisonEnabled ? "↑2" : "↑2"} deltaType="up" />
            <KPICard icon="checkmark-circle" label="Audit Score" value="85%" delta={comparisonEnabled ? "+5%" : "+5%"} deltaType="up" />
          </ScrollView>
        </View>

        {/* Action Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ActionCard title="Unreplied reviews" count={7} onPress={handleUnrepliedReviews} />
          <ActionCard title="Rank drop detected" onPress={handleRankDrop} />
          <ActionCard title="Top fixes ready" count={3} onPress={handleTopFixes} />
          <ActionCard title="Business Profile completeness" onPress={handleBusinessProfile} />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <ActivityItem 
            icon="chatbubble-outline" 
            title="Replied to a 3★ review" 
            timeAgo="2 hours ago"
            onView={() => handleActivityView('review-reply')}
          />
          <ActivityItem 
            icon="checkmark-circle-outline" 
            title="Audit item marked done" 
            timeAgo="4 hours ago"
            onView={() => handleActivityView('audit-complete')}
          />
          <ActivityItem 
            icon="document-text-outline" 
            title="Profile description updated" 
            timeAgo="1 day ago"
            onView={() => handleActivityView('profile-update')}
          />
          <ActivityItem 
            icon="star-outline" 
            title="Received 5★ review" 
            timeAgo="1 day ago"
            onView={() => handleActivityView('new-review')}
          />
          <ActivityItem 
            icon="call-outline" 
            title="Phone number verified" 
            timeAgo="2 days ago"
          />
          <ActivityItem 
            icon="image-outline" 
            title="New photos uploaded" 
            timeAgo="3 days ago"
            onView={() => handleActivityView('photos-upload')}
          />
          <ActivityItem 
            icon="time-outline" 
            title="Business hours updated" 
            timeAgo="4 days ago"
          />
          <ActivityItem 
            icon="location-outline" 
            title="Address information verified" 
            timeAgo="5 days ago"
          />
          <ActivityItem 
            icon="chatbubble-outline" 
            title="Replied to customer inquiry" 
            timeAgo="6 days ago"
            onView={() => handleActivityView('inquiry-reply')}
          />
          <ActivityItem 
            icon="trending-up-outline" 
            title="Ranking improved in search" 
            timeAgo="1 week ago"
          />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  kpiStrip: {
    flexDirection: 'row',
  },
  kpiCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  kpiIcon: {
    marginBottom: 8,
  },
  kpiLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  deltaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deltaText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
  countBadge: {
    backgroundColor: '#FCD34D',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  activityItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
  },
});

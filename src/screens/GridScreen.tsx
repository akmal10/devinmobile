import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

const KEYWORDS = [
  'Restaurant near me',
  'Best pizza',
  'Italian food',
  'Delivery service',
  'Fine dining',
];

const GRID_HISTORY = [
  { date: 'Jun, 10 2025', rank: 8.5 },
  { date: 'Jun, 11 2025', rank: 9.1 },
  { date: 'Jun, 11 2025', rank: 9.3 },
  { date: 'Jun, 12 2025', rank: 9.2 },
  { date: 'Jun, 13 2025', rank: 9.29 },
];

export default function GridScreen() {
  const [selectedKeyword, setSelectedKeyword] = useState(KEYWORDS[0]);
  const [isKeywordDropdownVisible, setIsKeywordDropdownVisible] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('All Time');

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeyword(keyword);
    setIsKeywordDropdownVisible(false);
  };

  const handleViewFullGrid = () => {
    Linking.openURL('https://example.com/grid-view');
  };

  const renderTimeFilter = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.timeFilterChip,
        selectedTimeFilter === filter && styles.activeTimeFilterChip
      ]}
      onPress={() => setSelectedTimeFilter(filter)}
    >
      <Text style={[
        styles.timeFilterText,
        selectedTimeFilter === filter && styles.activeTimeFilterText
      ]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderGridHistoryItem = (item: any, index: number) => (
    <View key={index} style={styles.historyItem}>
      <View style={styles.historyDot} />
      <Text style={styles.historyDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* Summary Banner */}
        <View style={styles.summaryBanner}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Grid Ranking Summary</Text>
            <Text style={styles.lastRunDate}>Last run: Jun 19, 2025</Text>
          </View>
          
          <View style={styles.summaryStats}>
            <View style={styles.mainStat}>
              <Text style={styles.averageRank}>9.29</Text>
              <Text style={styles.averageRankLabel}>Avg. Map Rank</Text>
            </View>
            
            <View style={styles.trendStat}>
              <View style={styles.trendContainer}>
                <Text style={styles.trendValue}>0.1</Text>
                <Ionicons name="arrow-down" size={16} color="#EF4444" />
              </View>
              <Text style={styles.trendLabel}>Change</Text>
            </View>
          </View>

          <View style={styles.cellStats}>
            <View style={styles.cellStat}>
              <Text style={styles.cellStatLabel}>Best Cell</Text>
              <Text style={styles.cellStatValue}>Rank 1 - Downtown</Text>
            </View>
            <View style={styles.cellStat}>
              <Text style={styles.cellStatLabel}>Worst Cell</Text>
              <Text style={styles.cellStatValue}>Rank 15 - Suburbs</Text>
            </View>
          </View>
        </View>

        {/* Last Run Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Run Details</Text>
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time:</Text>
              <Text style={styles.detailValue}>Jun 19, 2025 at 2:30 PM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Grid Size:</Text>
              <Text style={styles.detailValue}>5×5 (25 locations)</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Current Keyword:</Text>
              <TouchableOpacity 
                style={styles.keywordSelector}
                onPress={() => setIsKeywordDropdownVisible(true)}
              >
                <Text style={styles.keywordText}>{selectedKeyword}</Text>
                <Ionicons name="chevron-down" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Re-run Grid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={handleViewFullGrid}>
              <Text style={styles.secondaryButtonText}>View Full Grid on Web</Text>
              <Ionicons name="open-outline" size={16} color="#2563EB" />
            </TouchableOpacity>
          </View>
          <View style={styles.cooldownChip}>
            <Text style={styles.cooldownText}>Next run available in 2h 15m</Text>
          </View>
        </View>

        {/* Latest Grids Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Grids</Text>
          
          {/* Time Filter Chips */}
          <View style={styles.timeFilters}>
            {['All Time', 'This Month', 'Last Month'].map(renderTimeFilter)}
          </View>

          {/* Grid History Timeline */}
          <View style={styles.historyContainer}>
            <View style={styles.historyTimeline}>
              {GRID_HISTORY.map((item, index) => renderGridHistoryItem(item, index))}
            </View>
          </View>

          {/* Current Date Display */}
          <Text style={styles.currentDate}>Jun, 19 2025</Text>

          {/* Rank Display */}
          <View style={styles.rankDisplay}>
            <View style={styles.rankCard}>
              <Text style={styles.rankValue}>9.29</Text>
              <Text style={styles.rankLabel}>Avg. Map Rank</Text>
            </View>
            <View style={styles.changeCard}>
              <View style={styles.changeContainer}>
                <Text style={styles.changeValue}>0.1</Text>
                <Ionicons name="arrow-down" size={14} color="#EF4444" />
              </View>
              <Text style={styles.changeLabel}>Change</Text>
            </View>
          </View>

          {/* Map Placeholder */}
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={48} color="#9CA3AF" />
            <Text style={styles.mapPlaceholderText}>Grid Map View</Text>
            <Text style={styles.mapPlaceholderSubtext}>Tap "View Full Grid on Web" for interactive map</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={20} color="#F59E0B" />
            <Text style={styles.tipText}>
              Improve rank by completing audit fixes and getting new reviews.
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Keyword Dropdown Modal */}
      <Modal
        visible={isKeywordDropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsKeywordDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsKeywordDropdownVisible(false)}
        >
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>Select Keyword</Text>
            <FlatList
              data={KEYWORDS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedKeyword === item && styles.selectedItem
                  ]}
                  onPress={() => handleKeywordSelect(item)}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    selectedKeyword === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                  {selectedKeyword === item && (
                    <Ionicons name="checkmark" size={20} color="#2563EB" />
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
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  
  summaryBanner: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryHeader: {
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  lastRunDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainStat: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
  },
  averageRank: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  averageRankLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  trendStat: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 4,
  },
  trendLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cellStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cellStat: {
    flex: 1,
    marginHorizontal: 4,
  },
  cellStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  cellStatValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
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

  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
    textAlign: 'right',
  },
  keywordSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  keywordText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
    marginRight: 4,
  },

  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  cooldownChip: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
    marginTop: 8,
  },
  cooldownText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },

  timeFilters: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  timeFilterChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeTimeFilterChip: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  timeFilterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTimeFilterText: {
    color: '#fff',
  },

  historyContainer: {
    marginBottom: 16,
  },
  historyTimeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  historyItem: {
    alignItems: 'center',
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 60,
  },
  currentDate: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },

  rankDisplay: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  rankCard: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  rankValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  rankLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  changeCard: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginRight: 4,
  },
  changeLabel: {
    fontSize: 14,
    color: '#6B7280',
  },

  mapPlaceholder: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 12,
    marginBottom: 4,
  },
  mapPlaceholderSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  tipsSection: {
    marginBottom: 20,
  },
  tipCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  tipText: {
    fontSize: 14,
    color: '#92400E',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
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
    maxHeight: 300,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
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
    backgroundColor: '#EBF4FF',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  selectedItemText: {
    color: '#2563EB',
    fontWeight: '500',
  },
});

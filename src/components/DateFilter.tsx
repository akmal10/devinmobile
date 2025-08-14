import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DateFilterProps {
  selectedPeriod?: string;
  onPeriodChange?: (period: string) => void;
  comparisonEnabled?: boolean;
  onComparisonToggle?: (enabled: boolean) => void;
}

const DATE_PERIODS = [
  'Today',
  'Yesterday', 
  'Last 7 Days',
  'Last 30 Days',
  'This Month',
  'Last Month',
  'Custom Range…'
];

const COMPARISON_OPTIONS = [
  'Previous period',
  'Previous year',
  'None'
];

const { height: screenHeight } = Dimensions.get('window');

export default function DateFilter({
  selectedPeriod = 'Last 7 Days',
  onPeriodChange,
  comparisonEnabled = false,
  onComparisonToggle
}: DateFilterProps) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [selectedComparison, setSelectedComparison] = useState('None');
  const [slideAnim] = useState(new Animated.Value(screenHeight));

  const handlePeriodSelect = (period: string) => {
    onPeriodChange?.(period);
  };

  const handleComparisonSelect = (comparison: string) => {
    setSelectedComparison(comparison);
    const enabled = comparison !== 'None';
    onComparisonToggle?.(enabled);
  };

  const handleFilterPress = () => {
    console.log('DateFilter: handleFilterPress called - opening modal');
    setIsBottomSheetVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      console.log('DateFilter: Modal animation completed');
    });
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsBottomSheetVisible(false);
    });
  };

  const handleApply = () => {
    handleClose();
  };

  const handleClear = () => {
    onPeriodChange?.('Last 7 Days');
    setSelectedComparison('None');
    onComparisonToggle?.(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.filterChip} 
        onPress={handleFilterPress}
        activeOpacity={0.7}
      >
        <Text style={styles.filterText}>{selectedPeriod}</Text>
        <Ionicons name="chevron-down" size={16} color="#2563EB" />
      </TouchableOpacity>

      <Modal
        visible={isBottomSheetVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.backdrop} 
            activeOpacity={1} 
            onPress={handleClose}
          />
          <Animated.View 
            style={[
              styles.bottomSheet,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.sheetContainer}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Select Date Range</Text>
                <TouchableOpacity onPress={handleClose}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView 
                style={styles.sheetContent} 
                contentContainerStyle={styles.sheetContentContainer}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.sectionLabel}>Date Range</Text>
                {DATE_PERIODS.map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.optionItem,
                      selectedPeriod === period && styles.selectedOption
                    ]}
                    onPress={() => handlePeriodSelect(period)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedPeriod === period && styles.selectedOptionText
                    ]}>
                      {period}
                    </Text>
                    {selectedPeriod === period && (
                      <Ionicons name="checkmark" size={20} color="#2563EB" />
                    )}
                  </TouchableOpacity>
                ))}

                <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Compare to</Text>
                {COMPARISON_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionItem,
                      selectedComparison === option && styles.selectedOption
                    ]}
                    onPress={() => handleComparisonSelect(option)}
                  >
                    <Text style={[
                      styles.optionText,
                      selectedComparison === option && styles.selectedOptionText
                    ]}>
                      {option}
                    </Text>
                    {selectedComparison === option && (
                      <Ionicons name="checkmark" size={20} color="#2563EB" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.sheetActions}>
                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 44,
    alignSelf: 'flex-start',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sheetContainer: {
    flex: 1,
    maxHeight: screenHeight * 0.8,
    paddingBottom: 80,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
    maxHeight: screenHeight * 0.4,
  },
  sheetContentContainer: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44,
    marginBottom: 4,
  },
  selectedOption: {
    backgroundColor: '#EBF4FF',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  selectedOptionText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  sheetActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
    backgroundColor: '#fff',
    flexShrink: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { Typography } from '../constants/Typography';

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
  
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [markedDates, setMarkedDates] = useState({});

  const formatDateRange = (start: string, end: string) => {
    if (!start || !end) return 'Custom Range…';
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startFormatted} - ${endFormatted}`;
  };

  const handlePeriodSelect = (period: string) => {
    if (period === 'Custom Range…') {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      setStartDate('');
      setEndDate('');
      setMarkedDates({});
      onPeriodChange?.(period);
    }
  };

  const handleDayPress = (day: any) => {
    const dateString = day.dateString;
    
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateString);
      setEndDate('');
      setMarkedDates({
        [dateString]: {
          startingDay: true,
          color: '#2563EB',
          textColor: 'white'
        }
      });
    } else if (startDate && !endDate) {
      if (dateString < startDate) {
        setStartDate(dateString);
        setEndDate(startDate);
        setMarkedDates(createMarkedDates(dateString, startDate));
      } else {
        setEndDate(dateString);
        setMarkedDates(createMarkedDates(startDate, dateString));
      }
    }
  };

  const createMarkedDates = (start: string, end: string) => {
    const marked: any = {};
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      if (dateString === start) {
        marked[dateString] = { startingDay: true, color: '#2563EB', textColor: 'white' };
      } else if (dateString === end) {
        marked[dateString] = { endingDay: true, color: '#2563EB', textColor: 'white' };
      } else {
        marked[dateString] = { color: '#EBF4FF', textColor: '#2563EB' };
      }
    }
    return marked;
  };

  const handleBackToPresets = () => {
    setShowCalendar(false);
  };

  const handleApplyCustomRange = () => {
    if (startDate && endDate) {
      const customRangeText = formatDateRange(startDate, endDate);
      onPeriodChange?.(customRangeText);
      setShowCalendar(false);
      handleClose();
    }
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
    if (showCalendar) {
      handleApplyCustomRange();
    } else {
      handleClose();
    }
  };

  const handleClear = () => {
    onPeriodChange?.('Last 7 Days');
    setSelectedComparison('None');
    onComparisonToggle?.(false);
    setShowCalendar(false);
    setStartDate('');
    setEndDate('');
    setMarkedDates({});
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
                {showCalendar ? (
                  <View>
                    <View style={styles.calendarHeader}>
                      <TouchableOpacity onPress={handleBackToPresets} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={20} color="#2563EB" />
                        <Text style={styles.backButtonText}>Back</Text>
                      </TouchableOpacity>
                      <Text style={styles.calendarTitle}>Select Date Range</Text>
                    </View>
                    
                    <Calendar
                      onDayPress={handleDayPress}
                      markingType={'period'}
                      markedDates={markedDates}
                      theme={{
                        selectedDayBackgroundColor: '#2563EB',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#2563EB',
                        dayTextColor: '#1F2937',
                        textDisabledColor: '#d9d9d9',
                        arrowColor: '#2563EB',
                        monthTextColor: '#1F2937',
                        indicatorColor: '#2563EB',
                        textDayFontWeight: '500' as const,
                        textMonthFontWeight: '600' as const,
                        textDayHeaderFontWeight: '500' as const,
                      }}
                    />
                    
                    {startDate && endDate && (
                      <View style={styles.selectedRangeContainer}>
                        <Text style={styles.selectedRangeText}>
                          Selected: {formatDateRange(startDate, endDate)}
                        </Text>
                      </View>
                    )}
                  </View>
                ) : (
                  <View>
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
                  </View>
                )}
              </ScrollView>

              <View style={styles.sheetActions}>
                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.applyButton,
                    showCalendar && (!startDate || !endDate) && styles.disabledButton
                  ]} 
                  onPress={handleApply}
                  disabled={showCalendar && (!startDate || !endDate)}
                >
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
    ...Typography.styles.bodySecondary,
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
    ...Typography.styles.h3CardTitle,
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
    ...Typography.styles.bodyPrimary,
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
    ...Typography.styles.bodyPrimary,
    color: '#1F2937',
    flex: 1,
  },
  selectedOptionText: {
    ...Typography.styles.bodyPrimary,
    color: '#2563EB',
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
    ...Typography.styles.buttonSecondary,
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
    ...Typography.styles.buttonPrimary,
    color: '#fff',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    ...Typography.styles.buttonSecondary,
    color: '#2563EB',
    marginLeft: 4,
  },
  calendarTitle: {
    ...Typography.styles.bodyPrimary,
    color: '#1F2937',
    flex: 1,
  },
  selectedRangeContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedRangeText: {
    ...Typography.styles.bodySecondary,
    color: '#2563EB',
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
});

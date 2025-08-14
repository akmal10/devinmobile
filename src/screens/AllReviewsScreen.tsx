import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

interface MovieReview {
  id: string;
  title: string;
  rating: number;
  msid: string;
  timeAgo: string;
  classification: string;
  poster: string;
  reviewText: string;
}

interface AllReviewsScreenProps {
  onBack: () => void;
}

const STAR_FILTERS = [
  { label: 'All Stars', value: 0 },
  { label: '5 Stars', value: 5 },
  { label: '4 Stars', value: 4 },
  { label: '3 Stars', value: 3 },
  { label: '2 Stars', value: 2 },
  { label: '1 Star', value: 1 },
];

export default function AllReviewsScreen({ onBack }: AllReviewsScreenProps) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const movieReviews: MovieReview[] = [
    {
      id: '1',
      title: 'Black Panther',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/4A5568/FFFFFF?text=BP',
      reviewText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
      id: '2',
      title: 'Bumblebee',
      rating: 5,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=BB',
      reviewText: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.'
    },
    {
      id: '3',
      title: 'Zero',
      rating: 3,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=Z',
      reviewText: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
    },
    {
      id: '4',
      title: 'Mary Poppins Returns',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/EC4899/FFFFFF?text=MP',
      reviewText: 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.'
    },
    {
      id: '5',
      title: 'Hate Story IV',
      rating: 2,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'A',
      poster: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=HS',
      reviewText: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.'
    },
    {
      id: '6',
      title: 'Tholi Prema',
      rating: 5,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=TP',
      reviewText: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.'
    }
  ];

  const getBorderColor = (rating: number) => {
    if (rating >= 4) return '#10B981'; // Green for 4+ stars
    if (rating === 3) return '#F59E0B'; // Yellow for 3 stars
    return '#EF4444'; // Red for below 3 stars
  };

  const getFilteredReviews = () => {
    if (selectedFilter === 0) return movieReviews;
    return movieReviews.filter(review => review.rating === selectedFilter);
  };

  const handleFilterSelect = (value: number) => {
    setSelectedFilter(value);
    setIsFilterVisible(false);
  };

  const handleReviewPress = (reviewId: string) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={index < rating ? '#F59E0B' : '#D1D5DB'}
      />
    ));
  };

  const renderMovieReview = (review: MovieReview) => {
    const isExpanded = expandedReview === review.id;
    
    return (
      <TouchableOpacity 
        key={review.id} 
        style={styles.reviewCard}
        onPress={() => handleReviewPress(review.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.colorBorder, { backgroundColor: getBorderColor(review.rating) }]} />
        <View style={styles.cardContent}>
          <Image source={{ uri: review.poster }} style={styles.moviePoster} />
          <View style={styles.movieInfo}>
            <Text style={styles.movieTitle}>{review.title}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.criticLabel}>Critic's Rating:</Text>
              <View style={styles.starsContainer}>
                {renderStars(review.rating)}
              </View>
            </View>
            <Text style={styles.metadata}>MSID: {review.msid} | {review.timeAgo}</Text>
            
            {isExpanded && (
              <View style={styles.reviewTextContainer}>
                <Text style={styles.reviewLabel}>Critic's Review:</Text>
                <Text style={styles.reviewText}>{review.reviewText}</Text>
                <View style={styles.reviewStats}>
                  <View style={styles.statItem}>
                    <Ionicons name="eye-outline" size={16} color="#9CA3AF" />
                    <Text style={styles.statText}>1.1M</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="chatbubble-outline" size={16} color="#9CA3AF" />
                    <Text style={styles.statText}>1.1M</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="heart-outline" size={16} color="#9CA3AF" />
                    <Text style={styles.statText}>1.1M</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={styles.classificationContainer}>
            <Text style={styles.classification}>{review.classification}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader 
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#2563EB" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>All Reviews</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerActionButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <Ionicons name="filter" size={20} color="#666" />
            <Text style={styles.headerActionText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.reviewsList} showsVerticalScrollIndicator={false}>
        {getFilteredReviews().map(renderMovieReview)}
      </ScrollView>

      <Modal
        visible={isFilterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsFilterVisible(false)}
        >
          <View style={styles.filterDropdown}>
            <Text style={styles.filterTitle}>Filter by Rating</Text>
            <FlatList
              data={STAR_FILTERS}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.filterItem,
                    selectedFilter === item.value && styles.selectedFilterItem
                  ]}
                  onPress={() => handleFilterSelect(item.value)}
                >
                  <Text style={[
                    styles.filterItemText,
                    selectedFilter === item.value && styles.selectedFilterItemText
                  ]}>
                    {item.label}
                  </Text>
                  {selectedFilter === item.value && (
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: '#2563EB',
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  headerActionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  reviewsList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
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
  colorBorder: {
    width: 4,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  moviePoster: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  criticLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  metadata: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  classificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  classification: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  reviewTextContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterDropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 20,
    maxHeight: 400,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 44,
  },
  selectedFilterItem: {
    backgroundColor: '#EBF4FF',
  },
  filterItemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedFilterItemText: {
    color: '#2563EB',
    fontWeight: '500',
  },
});

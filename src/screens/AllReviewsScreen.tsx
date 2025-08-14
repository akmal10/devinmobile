import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  createdOn: string;
  status: 'Reply' | 'Replied';
}

interface AllReviewsScreenProps {
  onBack: () => void;
}

export default function AllReviewsScreen({ onBack }: AllReviewsScreenProps) {
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('Rating');
  const [sortByDate, setSortByDate] = useState('Dates');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleAlertsPress = () => {
    console.log('Alerts pressed');
  };

  const toggleReviewExpansion = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const handleReply = (reviewId: string) => {
    console.log('Reply to review:', reviewId);
  };

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Vaibhav Thorat',
      avatar: 'V',
      rating: 5,
      review: 'Knowledgeable team of lawyers. Strongly suggested if you want exact solutions.',
      createdOn: '14 Mar 2018',
      status: 'Replied'
    },
    {
      id: '2',
      name: 'Apurva K',
      avatar: 'A',
      rating: 5,
      review: 'Reliable',
      createdOn: '14 Mar 2018',
      status: 'Replied'
    },
    {
      id: '3',
      name: 'PRASAD PAWASKAR',
      avatar: 'P',
      rating: 5,
      review: '--',
      createdOn: '14 Mar 2018',
      status: 'Replied'
    },
    {
      id: '4',
      name: 'kiran anphule',
      avatar: 'k',
      rating: 5,
      review: '--',
      createdOn: '14 Mar 2018',
      status: 'Replied'
    },
    {
      id: '5',
      name: 'SANTOSH YADAV',
      avatar: 'S',
      rating: 5,
      review: '--',
      createdOn: '14 Mar 2018',
      status: 'Replied'
    },
    {
      id: '6',
      name: 'kishor Bhitmal',
      avatar: 'k',
      rating: 5,
      review: '--',
      createdOn: '14 Mar 2018',
      status: 'Replied'
    },
    {
      id: '7',
      name: 'Santosh Singh',
      avatar: 'S',
      rating: 5,
      review: 'Firm is honest and trustworthy. Thank you for life saving service.',
      createdOn: '13 Mar 2018',
      status: 'Replied'
    },
    {
      id: '8',
      name: 'nikhil shetty',
      avatar: 'n',
      rating: 5,
      review: 'Me and my colleague had an issue against my employers threat and was not aware about my rights to file a case and also defend the false allegations. Thanks to knowledgeable team of lawyers who guided me properly and helped me to get justice. Strongly suggested if you want exact solutions.',
      createdOn: '13 Mar 2018',
      status: 'Reply'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name="star"
            size={16}
            color={star <= rating ? '#FCD34D' : '#E5E7EB'}
          />
        ))}
      </View>
    );
  };

  const renderReview = (review: Review) => {
    const isExpanded = expandedReviews.has(review.id);
    const shouldTruncate = review.review.length > 100 && review.review !== '--';
    const displayText = shouldTruncate && !isExpanded 
      ? review.review.substring(0, 100) + '...' 
      : review.review;

    return (
      <View key={review.id} style={styles.reviewRow}>
        <View style={styles.nameColumn}>
          <View style={[styles.avatar, { backgroundColor: getAvatarColor(review.avatar) }]}>
            <Text style={styles.avatarText}>{review.avatar}</Text>
          </View>
          <Text style={styles.nameText}>{review.name}</Text>
        </View>

        <View style={styles.ratingColumn}>
          {renderStars(review.rating)}
        </View>

        <View style={styles.reviewColumn}>
          <Text style={styles.reviewText}>{displayText}</Text>
          {shouldTruncate && (
            <TouchableOpacity onPress={() => toggleReviewExpansion(review.id)}>
              <Text style={styles.showMoreText}>
                {isExpanded ? 'Show Less' : 'See More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.dateColumn}>
          <Text style={styles.dateText}>{review.createdOn}</Text>
        </View>

        <View style={styles.actionColumn}>
          {review.status === 'Reply' ? (
            <TouchableOpacity 
              style={styles.replyButton}
              onPress={() => handleReply(review.id)}
            >
              <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.repliedContainer}>
              <Ionicons name="eye" size={16} color="#6B7280" />
              <Text style={styles.repliedText}>Replied</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const getAvatarColor = (letter: string) => {
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
    const index = letter.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        onAlertsPress={handleAlertsPress}
        alertsCount={3}
      />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#2563EB" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>All Reviews</Text>
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <View style={styles.filtersRow}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>10</Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Sort by Rating</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={16} color="#6B7280" />
              </TouchableOpacity>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Sort by Dates</Text>
              <TouchableOpacity>
                <Ionicons name="close" size={16} color="#6B7280" />
              </TouchableOpacity>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </View>

            <TouchableOpacity style={styles.refreshButton}>
              <Ionicons name="refresh" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Pagination Info */}
        <View style={styles.paginationInfo}>
          <Text style={styles.paginationText}>145 reviews</Text>
          <View style={styles.paginationControls}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.paginationRange}>1-10 of 145</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Rating</Text>
          <Text style={styles.tableHeaderText}>Review</Text>
          <Text style={styles.tableHeaderText}>Created On</Text>
          <Text style={styles.tableHeaderText}>Actions</Text>
        </View>

        {/* Reviews List */}
        <ScrollView style={styles.reviewsList}>
          {reviews.map(renderReview)}
        </ScrollView>
      </View>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    minHeight: 44,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#2563EB',
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 44,
  },
  filterLabel: {
    fontSize: 14,
    color: '#374151',
    marginRight: 8,
  },
  refreshButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  paginationInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paginationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationRange: {
    fontSize: 14,
    color: '#374151',
    marginHorizontal: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  reviewsList: {
    flex: 1,
  },
  reviewRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'flex-start',
  },
  nameColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nameText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  ratingColumn: {
    flex: 1,
    alignItems: 'flex-start',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  reviewColumn: {
    flex: 2,
    paddingRight: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  showMoreText: {
    fontSize: 14,
    color: '#2563EB',
    marginTop: 4,
  },
  dateColumn: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  actionColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  replyButton: {
    backgroundColor: '#2563EB',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  repliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repliedText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
});

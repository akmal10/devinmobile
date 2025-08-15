import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommonHeader from '../components/CommonHeader';
import { Typography } from '../constants/Typography';

interface MovieReview {
  id: string;
  title: string;
  rating: number;
  msid: string;
  timeAgo: string;
  classification: string;
  poster: string;
  reviewText: string;
  hasReply: boolean;
  replyText?: string;
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
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [selectedReviewForReply, setSelectedReviewForReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

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
      reviewText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      hasReply: false
    },
    {
      id: '2',
      title: 'Bumblebee',
      rating: 5,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=BB',
      reviewText: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
      hasReply: true,
      replyText: 'Thank you for your wonderful review! We\'re thrilled you enjoyed the movie.'
    },
    {
      id: '3',
      title: 'Zero',
      rating: 3,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=Z',
      reviewText: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      hasReply: false
    },
    {
      id: '4',
      title: 'Mary Poppins Returns',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/EC4899/FFFFFF?text=MP',
      reviewText: 'Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.',
      hasReply: true,
      replyText: 'We appreciate your feedback and are glad you had a great experience!'
    },
    {
      id: '5',
      title: 'Hate Story IV',
      rating: 2,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'A',
      poster: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=HS',
      reviewText: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.',
      hasReply: false
    },
    {
      id: '6',
      title: 'Tholi Prema',
      rating: 5,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=TP',
      reviewText: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.',
      hasReply: false
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

  const handleReplyPress = (reviewId: string) => {
    setSelectedReviewForReply(reviewId);
    setReplyText('');
    setIsReplyModalVisible(true);
  };

  const handleViewReplyPress = (reviewId: string) => {
    const review = movieReviews.find(r => r.id === reviewId);
    if (review && review.replyText) {
      setSelectedReviewForReply(reviewId);
      setReplyText(review.replyText);
      setIsReplyModalVisible(true);
    }
  };

  const handleSendReply = () => {
    console.log('Reply sent:', replyText);
    setIsReplyModalVisible(false);
    setSelectedReviewForReply(null);
    setReplyText('');
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
      <View key={review.id} style={styles.reviewCard}>
        <View style={[styles.colorBorder, { backgroundColor: getBorderColor(review.rating) }]} />
        <View style={styles.cardContent}>
          <TouchableOpacity 
            style={styles.reviewContent}
            onPress={() => handleReviewPress(review.id)}
            activeOpacity={0.7}
          >
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
                </View>
              )}
            </View>
          </TouchableOpacity>
          
          {isExpanded && (
            <View style={styles.replySection}>
              {review.hasReply ? (
                <TouchableOpacity 
                  style={styles.repliedButton}
                  onPress={() => handleViewReplyPress(review.id)}
                >
                  <Text style={styles.repliedButtonText}>Replied</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.replyButton}
                  onPress={() => handleReplyPress(review.id)}
                >
                  <Text style={styles.replyButtonText}>Reply</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
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
        visible={isReplyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsReplyModalVisible(false)}
      >
        <View style={styles.replyModalOverlay}>
          <View style={styles.replyModal}>
            <View style={styles.replyModalHeader}>
              <Text style={styles.replyModalTitle}>
                {movieReviews.find(r => r.id === selectedReviewForReply)?.hasReply ? 'View Reply' : 'Write Reply'}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setIsReplyModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {movieReviews.find(r => r.id === selectedReviewForReply)?.hasReply ? (
              <View style={styles.replyContent}>
                <Text style={styles.replyLabel}>Your Reply:</Text>
                <Text style={styles.existingReplyText}>{replyText}</Text>
              </View>
            ) : (
              <View style={styles.replyContent}>
                <Text style={styles.replyLabel}>Write your reply:</Text>
                <TextInput
                  style={styles.replyInput}
                  multiline
                  numberOfLines={4}
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChangeText={setReplyText}
                  textAlignVertical="top"
                />
                <TouchableOpacity 
                  style={[styles.sendButton, !replyText.trim() && styles.sendButtonDisabled]}
                  onPress={handleSendReply}
                  disabled={!replyText.trim()}
                >
                  <Text style={[styles.sendButtonText, !replyText.trim() && styles.sendButtonTextDisabled]}>
                    Send Reply
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

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
    ...Typography.styles.bodyPrimary,
    color: '#2563EB',
    marginLeft: 4,
  },
  title: {
    ...Typography.styles.h2SectionTitle,
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
    ...Typography.styles.bodySecondary,
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
    padding: 16,
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    ...Typography.styles.h3CardTitle,
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  criticLabel: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  metadata: {
    ...Typography.styles.caption,
    color: '#9CA3AF',
  },
  reviewTextContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reviewLabel: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
    marginBottom: 8,
  },
  reviewText: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    marginBottom: 12,
  },
  replySection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    alignItems: 'flex-start',
  },
  replyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  replyButtonText: {
    ...Typography.styles.buttonSecondary,
    color: '#fff',
  },
  repliedButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  repliedButtonText: {
    ...Typography.styles.buttonSecondary,
    color: '#fff',
  },
  replyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  replyModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  replyModalTitle: {
    ...Typography.styles.h3CardTitle,
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  replyContent: {
    padding: 16,
  },
  replyLabel: {
    ...Typography.styles.bodySecondary,
    color: '#374151',
    marginBottom: 12,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    ...Typography.styles.bodySecondary,
    color: '#374151',
    minHeight: 100,
    marginBottom: 16,
  },
  existingReplyText: {
    ...Typography.styles.bodySecondary,
    color: '#6B7280',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  sendButtonText: {
    ...Typography.styles.buttonPrimary,
    color: '#fff',
  },
  sendButtonTextDisabled: {
    color: '#9CA3AF',
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
    ...Typography.styles.h3CardTitle,
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
    ...Typography.styles.bodyPrimary,
    color: '#333',
    flex: 1,
  },
  selectedFilterItemText: {
    ...Typography.styles.bodyPrimary,
    color: '#2563EB',
  },
});

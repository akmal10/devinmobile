import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
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
}

interface AllReviewsScreenProps {
  onBack: () => void;
}

export default function AllReviewsScreen({ onBack }: AllReviewsScreenProps) {
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
      poster: 'https://via.placeholder.com/60x60/4A5568/FFFFFF?text=BP'
    },
    {
      id: '2',
      title: 'Bumblebee',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=BB'
    },
    {
      id: '3',
      title: 'Zero',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/3B82F6/FFFFFF?text=Z'
    },
    {
      id: '4',
      title: 'Mary Poppins Returns',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/EC4899/FFFFFF?text=MP'
    },
    {
      id: '5',
      title: 'Hate Story IV',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'A',
      poster: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=HS'
    },
    {
      id: '6',
      title: 'Tholi Prema',
      rating: 4,
      msid: '5643217',
      timeAgo: '1 min ago',
      classification: 'U/A',
      poster: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=TP'
    }
  ];

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
    return (
      <View key={review.id} style={styles.reviewCard}>
        <View style={styles.greenBorder} />
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
          </View>
          <View style={styles.classificationContainer}>
            <Text style={styles.classification}>{review.classification}</Text>
          </View>
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
        <Text style={styles.title}>Movie Reviews</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="filter" size={20} color="#666" />
            <Text style={styles.headerActionText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionButton}>
            <Ionicons name="swap-vertical" size={20} color="#666" />
            <Text style={styles.headerActionText}>Sort</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.reviewsList} showsVerticalScrollIndicator={false}>
        {movieReviews.map(renderMovieReview)}
      </ScrollView>
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
  greenBorder: {
    width: 4,
    backgroundColor: '#10B981',
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
});

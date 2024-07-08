import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DATA from '../Data/rest_list_data';
import COUPON_DATA from '../Data/coupon_data';
import OFFERS_DATA from '../Data/offers_data';
import TOP_BRANDS_DATA from '../Data/top_brands_data';
import { LinearGradient } from 'expo-linear-gradient';


const INITIAL_ITEM_COUNT = 3;

const FoodItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type}</Text>
        <Text style={styles.itemDistance}>{item.distance}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="gold" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.avgOrderValue}>{item.avgOrderValue}</Text>
        {item.discount ? (
          <Text style={styles.discount}>{item.discount}</Text>
        ) : null}
      </View>
    </View>
  );
};

const CouponItem = ({ item }) => (
  <View style={styles.couponContainer}>
    <Image source={{ uri: item.imageUrl }} style={styles.couponImage} onError={(error) => console.log(error)} />
    <Text style={styles.couponTitle}>{item.title}</Text>
    <Text style={styles.couponDiscount}>{item.discount}</Text>
  </View>
);

const OfferItem = ({ item }) => (
  <View style={styles.offerContainer}>
    <Image source={{ uri: "https://images.unsplash.com/photo-1573496267526-08a69e46a409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGZvb2QlMjBvcmRlcnxlbnwwfHx8fDE2NTk0NjA1MzE&ixlib=rb-1.2.1&q=80&w=400" }} style={styles.offerImage} />
    <View style={styles.offerInfo}>
      <Text style={styles.offerTitle}>{item.title}</Text>
      <Text style={styles.offerDescription}>{item.description}</Text>
      <Text style={styles.offerDistance}>{item.distance}</Text>
      <View style={styles.offerRatingContainer}>
        <Ionicons name="star" size={16} color="gold" />
        <Text style={styles.offerRating}>{item.rating}</Text>
      </View>
      <Text style={styles.offerPrice}>{item.price}</Text>
      {item.discount && <Text style={styles.offerDiscount}>{item.discount}</Text>}
      {item.freeDelivery && <Text style={styles.freeDelivery}>Free Delivery</Text>}
    </View>
  </View>
);

const BrandItem = ({ item }) => (
  <View style={styles.brandContainer}>
    <Image source={{ uri: item.imageUrl }} style={styles.brandImage} />
    <Text style={styles.brandName}>{item.name}</Text>
    <Text style={styles.brandDeliveryTime}>{item.deliveryTime}</Text>
  </View>
);

const HomeScreen = ({ route }) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEM_COUNT);
const { street } = route.params || {};
  const handleShowMore = () => {
    setVisibleItems(DATA.length);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
      colors={['#ff3131', '#ff914d']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      <Text style={styles.deliveryText}>Dine Nearby</Text>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{street}</Text>
        <Ionicons name="chevron-down" size={20} color="black" />
      </View>
      <Image source={require("../assets/no_bg_logo.png")} size={24} color="black" style={styles.notificationIcon} />
    </LinearGradient>
      <Image
        source={require("../banner.png")}
        style={styles.bannerImage}
      />
      <Text style={styles.sectionTitle}>All Restaurants Nearby</Text>
      <FlatList
        data={DATA.slice(0, visibleItems)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FoodItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      {visibleItems < DATA.length && (
        <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMore}>
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>Coupons For You</Text>
      <FlatList
        data={COUPON_DATA}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item }) => <CouponItem item={item} />}
        contentContainerStyle={styles.horizontalListContainer}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Popular Brands</Text>
      <FlatList
        data={TOP_BRANDS_DATA}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item }) => <BrandItem item={item} />}
        contentContainerStyle={styles.horizontalListContainer}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Try Something New</Text>
      <FlatList
        data={OFFERS_DATA}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({ item }) => <OfferItem item={item} />}
        contentContainerStyle={styles.horizontalListContainer}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,  // Adjust for front camera
    paddingHorizontal: 15,
    paddingBottom:5,
    backgroundColor: '#ff914d',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deliveryText: {
    fontSize: 12,
    padding:3,
    color: 'white',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationIcon: {
    marginLeft: 'auto',
    width:50,
    height:50
  },
  bannerImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  horizontalListContainer: {
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemType: {
    fontSize: 14,
    color: 'gray',
  },
  itemDistance: {
    fontSize: 12,
    color: 'gray',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: 'gold',
    marginLeft: 5,
  },
  avgOrderValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 14,
    color: '#ff3131',
  },
  showMoreButton: {
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  showMoreText: {
    fontSize: 16,
    color: '#ff3131',
  },
  couponContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  couponImage: {
    width: 80,   // Set appropriate width
    height: 80,  // Set appropriate height
    borderRadius: 10,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  couponDiscount: {
    fontSize: 14,
    color: '#ff3131',
  },
 
  offerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  offerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  offerDescription: {
    fontSize: 14,
    color: 'gray',
  },
  offerDistance: {
    fontSize: 12,
    color: 'gray',
  },
  offerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerRating: {
    fontSize: 14,
    color: 'gold',
    marginLeft: 5,
  },
  offerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  offerDiscount: {
    fontSize: 14,
    color: '#ff3131',
  },
  freeDelivery: {
    fontSize: 14,
    color: 'green',
  },
  brandContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  brandName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  brandDeliveryTime: {
    fontSize: 12,
    color: 'gray',
  },
});

export default HomeScreen;

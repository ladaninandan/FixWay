import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Image, Modal, FlatList, ScrollView, ToastAndroid, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Close from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceElectronicsList = ({ route }) => {
   const { nearbyStations, distance, time } = route.params;
   console.log("nosojsd", nearbyStations)
   const navigation = useNavigation();

   const [searchQuery, setSearchQuery] = useState('');
   const [selectedService, setSelectedService] = useState(null);
   const [close, setClose] = useState(false);
   const [isSidebarVisible, setIsSidebarVisible] = useState(false);
   const [filters, setFilters] = useState({
      price: null,
      distance: null,
      time: null,
   });
   const [cart, setCart] = useState([]);
   const [toastVisible, setToastVisible] = useState(false);
   const [toastAnimation] = useState(new Animated.Value(0));

   const prices = [
      { id: '1', label: 'Below ₹100', value: 'Below ₹100' },
      { id: '2', label: '₹150 - ₹200', value: '₹150 - ₹200' },
      { id: '3', label: '₹200 - ₹250', value: '₹200 - ₹250' },
      { id: '4', label: 'Above ₹250', value: 'Above ₹250' },
   ];

   const distances = [
      { id: '1', label: 'Below 5 km', value: 'Below 5 km' },
      { id: '2', label: '5 km - 10 km', value: '5 km - 10 km' },
      { id: '3', label: '10 km - 20 km', value: '10 km - 20 km' },
      { id: '4', label: 'Above 20 km', value: 'Above 20 km' },
   ];

   const times = [
      { id: '1', label: 'Below 15 min', value: 'Below 15 min' },
      { id: '2', label: '15 min - 30 min', value: '15 min - 30 min' },
      { id: '3', label: '30 min - 1 hour', value: '30 min - 1 hour' },
      { id: '4', label: 'Above 1 hour', value: 'Above 1 hour' },
   ];

   const applyFilters = (stations, filters, query) => {
      return stations.filter(station => {
         const matchesPrice = filters.price ? filterByPrice(station.price, filters.price) : true;
         const matchesDistance = filters.distance ? filterByDistance(station.distance, filters.distance) : true;
         const matchesTime = filters.time ? filterByTime(station.timeInMinutes, filters.time) : true;
         const matchesQuery = query ? station.serviceName.toLowerCase().includes(query.toLowerCase()) : true;
         return matchesPrice && matchesDistance && matchesTime && matchesQuery;
      });
   };

   const filterByPrice = (price, filter) => {
      switch (filter) {
         case 'Below ₹100':
            return price < 100;
         case '₹150 - ₹200':
            return price >= 150 && price <= 200;
         case '₹200 - ₹250':
            return price >= 200 && price <= 250;
         case 'Above ₹250':
            return price > 250;
         default:
            return true;
      }
   };

   const filterByDistance = (distance, filter) => {
      switch (filter) {
         case 'Below 5 km':
            return distance < 5;
         case '5 km - 10 km':
            return distance >= 5 && distance <= 10;
         case '10 km - 20 km':
            return distance >= 10 && distance <= 20;
         case 'Above 20 km':
            return distance > 20;
         default:
            return true;
      }
   };

   const filterByTime = (time, filter) => {
      switch (filter) {
         case 'Below 15 min':
            return time < 15;
         case '15 min - 30 min':
            return time >= 15 && time <= 30;
         case '30 min - 1 hour':
            return time >= 30 && time <= 60;
         case 'Above 1 hour':
            return time > 60;
         default:
            return true;
      }
   };

   const handleFilterChange = (type, value) => {
      setFilters(prevFilters => ({ ...prevFilters, [type]: value }));
   };

   const addToCart = async (item) => {
      const itemExists = cart.some(cartItem => cartItem.id === item.id);
      if (!itemExists) {
         const updatedCart = [...cart, item];
         setCart(updatedCart);
         await AsyncStorage.setItem('Cart_items', JSON.stringify(updatedCart));
         showToast();
      } else {
         ToastAndroid.showWithGravity(
            "Item already in cart",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
         );
      }
   };

   const showToast = () => {
      setToastVisible(true);
      Animated.timing(toastAnimation, {
         toValue: 1,
         duration: 300,
         useNativeDriver: true,
      }).start();

      // Hide toast automatically after 3 seconds
      setTimeout(() => {
         hideToast();
      }, 3000);
   };

   const hideToast = () => {
      Animated.timing(toastAnimation, {
         toValue: 0,
         duration: 300,
         useNativeDriver: true,
      }).start(() => {
         setToastVisible(false);
      });
   };

   const handleViewCard = () => {
      navigation.navigate("SummaryPage");
   }

   const filteredStations = applyFilters(nearbyStations, filters, searchQuery);

   return (
      <KeyboardAvoidingView
         style={styles.mainContainer}
         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
         <View style={styles.header}>
            <Text style={styles.headerText}>Nearby AC Services within 5 km</Text>
         </View>

         <View style={styles.container}>
            <View style={styles.searchContainer}>
               <View style={styles.searchBox}>
                  <Icon name="search" size={24} color="#666" style={styles.icon} />
                  <TextInput
                     style={styles.searchInput}
                     placeholder="Search services"
                     placeholderTextColor="#999"
                     value={searchQuery}
                     onChangeText={setSearchQuery}
                  />
               </View>
               <TouchableOpacity style={styles.filterButton} onPress={() => setIsSidebarVisible(true)}>
                  <Icon name="filter-list" size={24} color="#fff" />
               </TouchableOpacity>
            </View>

            <ScrollView>
               {filteredStations.map((item) => (
                  <View style={styles.card} key={item.id}>
                     <View style={styles.cardRow}>
                        <View style={styles.cardLeft}>
                           <Text style={styles.title}>{item.serviceName}</Text>
                           <View style={styles.ratingRow}>
                              <Text style={styles.rating}>{item.rating} </Text>
                              <Text style={styles.reviews}>({item.reviews.length})</Text>
                           </View>
                           <View style={styles.detailsRow}>
                              <Text style={styles.price}>₹{item.price}</Text>
                              <Text style={styles.duration}>({time * 2}) Mins</Text>
                           </View>
                           <Text style={styles.description}>Complete check-up to identify issues before repair</Text>
                           <Text style={styles.description}>{distance} km</Text>
                           <TouchableOpacity onPress={() => {
                              setSelectedService(item);
                              setClose(true);
                           }}>
                              <Text style={styles.viewDetails}>View details</Text>
                           </TouchableOpacity>
                        </View>
                        <View style={styles.cardRight}>
                           <Image
                              source={require('../../../img/acbook1.jpeg')}
                              style={styles.image}
                           />
                           <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                              <Text style={styles.addButtonText}>Add</Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </View>
               ))}
            </ScrollView>
         </View>

         <Modal transparent={true} visible={close} animationType="slide">
            <View style={styles.modalOverlay}>
               <View style={styles.centerbox}>
                  <View style={styles.modelrow}>
                     <Text style={styles.textcose}>{selectedService?.serviceName || "Details"}</Text>
                     <Close name="closecircle" size={30} onPress={() => setClose(false)} style={styles.closeIcon} color='red' />
                  </View>
                  <Text style={styles.body}>
                     {selectedService
                        ? `Location: ${selectedService.location}\n\nContact: ${selectedService.contactNumber}\n\nServices: ${selectedService.services.join(", ")}`
                        : "No details available"}
                  </Text>
               </View>
            </View>
         </Modal>

         {isSidebarVisible && (
            <View style={styles.sidebar}>
               <View style={styles.sidebarHeader}>
                  <Text style={styles.sidebarTitle}>Filters</Text>
                  <TouchableOpacity onPress={() => setIsSidebarVisible(false)}>
                     <Close name="close" size={30} color="black" />
                  </TouchableOpacity>
               </View>
               <ScrollView>
                  <Text style={styles.sidebarSectionTitle}>Filter by Price</Text>
                  {prices.map((item) => (
                     <TouchableOpacity
                        key={item.id}
                        onPress={() => handleFilterChange('price', item.value)}
                        style={styles.sidebarOption}
                     >
                        <Text style={styles.sidebarOptionText}>{item.label}</Text>
                     </TouchableOpacity>
                  ))}

                  <Text style={styles.sidebarSectionTitle}>Filter by Distance</Text>
                  {distances.map((item) => (
                     <TouchableOpacity
                        key={item.id}
                        onPress={() => handleFilterChange('distance', item.value)}
                        style={styles.sidebarOption}
                     >
                        <Text style={styles.sidebarOptionText}>{item.label}</Text>
                     </TouchableOpacity>
                  ))}

                  <Text style={styles.sidebarSectionTitle}>Filter by Time</Text>
                  {times.map((item) => (
                     <TouchableOpacity
                        key={item.id}
                        onPress={() => handleFilterChange('time', item.value)}
                        style={styles.sidebarOption}
                     >
                        <Text style={styles.sidebarOptionText}>{item.label}</Text>
                     </TouchableOpacity>
                  ))}



               </ScrollView>
            </View>
         )}

         {/* Custom Toast */}
         {toastVisible && (
            <Animated.View
               style={[
                  styles.toast,
                  {
                     opacity: toastAnimation,
                     transform: [{
                        translateY: toastAnimation.interpolate({
                           inputRange: [0, 1],
                           outputRange: [50, 0],
                        })
                     }],
                  },
               ]}
            >
               <Text style={styles.toastText}>Item added to cart!</Text>
               <TouchableOpacity
                  style={styles.toastButton}
                  onPress={handleViewCard}
               >
                  <Text style={styles.toastButtonText}>View Cart</Text>
               </TouchableOpacity>
            </Animated.View>
         )}
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      padding: 10,
   },
   header: {
      height: 60,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginBottom: 15,
      elevation: 5,
   },
   headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
   },
   container: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      elevation: 5,
   },
   searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 10,
      elevation: 3,
   },
   searchBox: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 5,
      paddingLeft: 10,
      elevation: 2,
   },
   icon: {
      marginRight: 8,
   },
   searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#333',
   },
   filterButton: {
      marginLeft: 10,
      backgroundColor: '#4CAF50',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
   },
   card: {
      marginTop: 10,
      marginHorizontal: 5,
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
   },
   cardRow: {
      flexDirection: 'row',
   },
   cardLeft: {
      flex: 3.1,
   },
   cardRight: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
   },
   ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
   },
   rating: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
   },
   reviews: {
      fontSize: 12,
      color: '#666',
   },
   detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
   },
   price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00A36C',
   },
   duration: {
      fontSize: 14,
      color: '#666',
      marginLeft: 8,
   },
   description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
   },
   addButton: {
      backgroundColor: '#4CAF50',
      width: 80,
      borderRadius: 6,
      alignItems: 'center',
      right: 10,
      height: 30,
   },
   addButtonText: {
      top: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
   },
   viewDetails: {
      color: '#6A0DAD',
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 8,
   },
   image: {
      top: 20,
      width: 100,
      height: 100,
      borderRadius: 10,
   },
   modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   centerbox: {
      borderRadius: 8,
      width: '90%',
      backgroundColor: '#FBFBFB',
      padding: 20,
      elevation: 20,
   },
   textcose: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
   },
   body: {
      textAlign: 'center',
      fontSize: 16,
      color: '#555',
      marginVertical: 10,
   },
   modelrow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
   },
   closeIcon: {
      marginLeft: -25,
   },
   sidebar: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: '75%',
      height: '100%',
      backgroundColor: 'white',
      padding: 20,
      elevation: 20,
   },
   sidebarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 30,
   },
   sidebarTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
   },
   sidebarSectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#333',
   },
   sidebarOption: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
   },
   sidebarOptionText: {
      fontSize: 14,
      color: '#000',
   },
   imagemodal: {
      // flex: 1,
      // width: '100%',  // Ensure the image covers the full width
      // height: '100%',  // Ensure the image covers the full height
      resizeMode: 'cover', // Cover the entire modal
   },
   toast: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      right: 20,
      backgroundColor: '#333',
      borderRadius: 8,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 5,
   },
   toastText: {
      color: '#fff',
      fontSize: 14,
   },
   toastButton: {
      backgroundColor: 'green',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
   },
   toastButtonText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
   },
});

export default ServiceElectronicsList;
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome6";
import Icon2 from "react-native-vector-icons/Ionicons";
import Icon3 from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const FuelStationList = ({ route }) => {
   const { nearbyStations } = route.params;
   const navigation = useNavigation();
   const [isSidebarVisible, setSidebarVisible] = useState(false);
   const [selectedPrice, setSelectedPrice] = useState(null);
   const [selectedDistance, setSelectedDistance] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');

   // Simulated price filter options with INR (₹)
   const prices = [
      { id: '1', price: 'Below ₹150' },
      { id: '2', price: '₹150 - ₹200' },
      { id: '3', price: '₹200 - ₹250' },
      { id: '4', price: 'Above ₹250' },
   ];

   // Simulated distance filter options (in km)
   const distances = [
      { id: '1', distance: 'Below 5 km' },
      { id: '2', distance: '5 km - 10 km' },
      { id: '3', distance: '10 km - 20 km' },
      { id: '4', distance: 'Above 20 km' },
   ];

   // Filter stations based on selected price, distance, and search query
   const filterStations = (stations, price, distance, query) => {
      let filteredStations = stations;

      // Filter by price
      if (price) {
         switch (price) {
            case 'Below ₹150':
               filteredStations = filteredStations.filter(station => parseInt(station.fuelPrice) < 150);
               break;
            case '₹150 - ₹200':
               filteredStations = filteredStations.filter(station => parseInt(station.fuelPrice) >= 150 && parseInt(station.fuelPrice) <= 200);
               break;
            case '₹200 - ₹250':
               filteredStations = filteredStations.filter(station => parseInt(station.fuelPrice) >= 200 && parseInt(station.fuelPrice) <= 250);
               break;
            case 'Above ₹250':
               filteredStations = filteredStations.filter(station => parseInt(station.fuelPrice) > 250);
               break;
            default:
               break;
         }
      }

      // Filter by distance
      if (distance) {
         switch (distance) {
            case 'Below 5 km':
               filteredStations = filteredStations.filter(station => parseFloat(station.distance) < 5);
               break;
            case '5 km - 10 km':
               filteredStations = filteredStations.filter(station => parseFloat(station.distance) >= 5 && parseFloat(station.distance) <= 10);
               break;
            case '10 km - 20 km':
               filteredStations = filteredStations.filter(station => parseFloat(station.distance) >= 10 && parseFloat(station.distance) <= 20);
               break;
            case 'Above 20 km':
               filteredStations = filteredStations.filter(station => parseFloat(station.distance) > 20);
               break;
            default:
               break;
         }
      }

      // Filter by search query (fuel company)
      if (query) {
         filteredStations = filteredStations.filter(station =>
            station.company && station.company.toLowerCase().includes(query.toLowerCase())
         );
      }

      return filteredStations;
   };

   // Toggle sidebar visibility
   const toggleSidebar = () => {
      setSidebarVisible(!isSidebarVisible);
   };

   // Handle price filter selection
   const handlePriceSelect = (price) => {
      setSelectedPrice(price);
   };

   // Handle distance filter selection
   const handleDistanceSelect = (distance) => {
      setSelectedDistance(distance);
   };

   // Filtered stations based on selected price, distance, and search query
   const filteredStations = filterStations(nearbyStations, selectedPrice, selectedDistance, searchQuery);

   return (
      <View style={styles.maincontainer}>
         <View style={styles.header}>
            <Icon name="gas-pump" color='#F9D754' size={30} style={styles.icon} />
            <Text style={styles.title}>Nearby Petrol Stations</Text>
         </View>

         <View style={styles.container}>
            <View style={styles.row}>
               <TextInput
                  placeholder='Search by fuel company'
                  value={searchQuery}
                  onChangeText={setSearchQuery}  // Update search query state on text input change
                  style={styles.search}
                  placeholderTextColor='black'
               />
               <TouchableOpacity style={styles.filtericon} onPress={toggleSidebar}>
                  <Icon2 name='filter-circle' size={50} color='#F9D754' />
               </TouchableOpacity>
            </View>

            <FlatList
               data={filteredStations}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
                  <TouchableOpacity style={styles.station} onPress={() => { navigation.navigate("StationDetails", { item }) }}>
                     <Image
                        source={require('../../img/symbole.png')}
                        style={styles.image}
                     />
                     <View style={styles.textContainer}>
                        <Text style={styles.stationTitle}>{item.title}</Text>
                        <View>
                           <Text style={styles.stationDistance}>{item.distance} km away   <Text style={styles.stationDistance}> Price ₹{item.fuelPrice}</Text></Text>
                           <Text style={styles.stationDetails}>{item.eta}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               )}
            />

            {/* Sidebar (conditionally rendered based on state) */}
            {isSidebarVisible && (
               <View style={styles.sidebar}>
                  <View style={styles.rowinsideber}>
                     <TouchableOpacity onPress={toggleSidebar}>
                        <Icon3 name='arrowleft' size={30} style={styles.closeicon} />
                     </TouchableOpacity>
                     <Text style={styles.sidebarText}>Filter Options</Text>
                  </View>

                  {/* Price filter FlatList */}
                  <FlatList
                     data={prices}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           style={[styles.priceOption, selectedPrice === item.price && styles.selectedPrice]}
                           onPress={() => handlePriceSelect(item.price)}
                        >
                           <Text style={styles.priceText}>{item.price}</Text>
                        </TouchableOpacity>
                     )}
                  />

                  {/* Distance filter FlatList */}
                  <FlatList
                     data={distances}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           style={[styles.priceOption, selectedDistance === item.distance && styles.selectedPrice]}
                           onPress={() => handleDistanceSelect(item.distance)}
                        >
                           <Text style={styles.priceText}>{item.distance}</Text>
                        </TouchableOpacity>
                     )}
                  />
               </View>
            )}
         </View>
      </View>
   );
};

export default FuelStationList;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
   },
   maincontainer: {
      flex: 1,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
   },
   station: {
      flexDirection: 'row',
      backgroundColor: '#DEEECC',
      marginBottom: 15,
      padding: 10,
      borderRadius: 8,
      borderColor: '#245501',
      borderWidth: 0.2,
      elevation: 3,
      alignItems: 'center',
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 5,
      marginRight: 10,
   },
   textContainer: {
      flex: 1,
   },
   stationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   stationDetails: {
      fontSize: 14,
      color: '#555',
      textAlign: 'right',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      backgroundColor: '#143601',
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      // paddingTop: 15,
   },
   icon: {
      marginLeft: 10,
      paddingHorizontal: 10,
   },
   search: {
      backgroundColor: 'lightgray',
      marginBottom: 20,
      borderRadius: 30,
      height: height * 0.06,
      paddingHorizontal: 20,
      fontSize: 20,
      color: 'black',
      width: '80%',
      borderColor: 'black',
      borderWidth: 0.2,
      marginHorizontal: 5,
   },
   row: {
      flexDirection: 'row',
   },
   filtericon: {
      backgroundColor: '#143601',
      borderRadius: 50,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 0,
   },
   // Sidebar styles
   sidebar: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: width * 0.7,
      height: height,
      backgroundColor: '#ffffff',
      padding: 20,
      borderLeftWidth: 1,
      borderLeftColor: '#ddd',
   },
   sidebarText: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   closeicon: {
      position: 'absolute',
      right: 5,
   },
   rowinsideber: {
      flexDirection: 'row',
      left: 20,
   },
   priceOption: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
   },
   selectedPrice: {
      backgroundColor: '#F9D754',
   },
   priceText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
   },
});

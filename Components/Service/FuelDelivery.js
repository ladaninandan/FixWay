import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Modal,
   TouchableOpacity,
   Alert,
   Dimensions,
   Linking,
   Image,
   ScrollView
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import Loding from '.././loding/Loding';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Close from "react-native-vector-icons/AntDesign";
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function FuelDelivery(props) {
   const [modalVisible, setModalVisible] = useState(false);
   const [currentLocation, setCurrentLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [routeCoordinates, setRouteCoordinates] = useState([]);
   const [loading, setLoading] = useState(true);
   const [petrolStations, setPetrolStations] = useState([]);

   // API call to fetch all fuel stations
   useEffect(() => {
      const getFuelData = async () => {
         try {
            const response = await axios.get("http://192.168.69.73:5000/AdminAdd/getFuleData");
            if (Array.isArray(response.data)) {
               setPetrolStations(response.data);
            } else {
               console.error("Error: Expected an array but got:", response.data);
            }
         } catch (error) {
            console.error("Error fetching fuel data:", error);
         }
      };
      getFuelData();
   }, []);

   useEffect(() => {
      const getLocation = async () => {
         setLoading(true);
         let { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false);
            return;
         }

         try {
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location.coords);
            console.log('Current Location:', location.coords);
            checkNearbyStations(location.coords);
         } catch (error) {
            Alert.alert("Error", "Unable to get current location.");
         } finally {
            setLoading(false);
         }
      };

      getLocation();
   }, []);

   const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
         Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
   }, []);

   const checkNearbyStations = useCallback((location) => {
      const range = 5;
      petrolStations.forEach(station => {
         const distance = calculateDistance(
            location.latitude,
            location.longitude,
            station.latitude,
            station.longitude
         );
         if (distance <= range) {
            console.log(`Station "${station.title}" is within ${range} km range. Distance: ${distance.toFixed(2)} km`);
         }
      });
   }, [calculateDistance, petrolStations]);

   const handleSearch = useCallback(async () => {
      try {
         const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=677965481a774beeb3fcc4ee55a127ab`
         );
         const data = await response.json();
         if (data.results.length > 0) {
            const location = data.results[0].geometry;
            setCurrentLocation({ latitude: location.lat, longitude: location.lng });
         } else {
            Alert.alert('Error', 'Location not found');
         }
      } catch (error) {
         Alert.alert('Error', 'Failed to fetch location');
      }
   }, [searchQuery]);

   const handleNavigate = useCallback((station) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
      Linking.openURL(url);
   }, []);

   const calculateETA = useCallback((distance) => {
      const speed = 20;
      const time = distance / speed;
      const hours = Math.floor(time);
      const minutes = Math.round((time - hours) * 60);
      return `${hours}h ${minutes}m`;
   }, []);

   const handlebuttonclick = useCallback(async () => {
      if (!currentLocation) {
         Alert.alert("Error", "Current location not available.");
         return;
      }

      const nearbyStations = petrolStations
         .map(station => {
            const distance = calculateDistance(
               currentLocation.latitude,
               currentLocation.longitude,
               station.latitude,
               station.longitude
            );

            const fuelPrice = station.price || (80 + Math.random() * 20).toFixed(2);

            return {
               ...station,
               distance: distance.toFixed(2),
               eta: calculateETA(distance),
               fuelPrice,
            };
         })
         .filter(station => station.distance <= 5);

      if (nearbyStations.length === 0) {
         Alert.alert("No nearby stations", "No petrol stations are within 5 km.");
      } else {
         console.log("Nearby stations with prices:", nearbyStations);

         try {
            const response = await fetch("https://your-backend-api.com/nearby-stations", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ stations: nearbyStations }),
            });

            if (response.ok) {
               Alert.alert("Success", "Nearby petrol station data sent successfully.");
            } else {
               Alert.alert("Error", "Failed to send data.");
            }
         } catch (error) {
            Alert.alert("Error", "Failed to send data to the server.");
            console.error(error);
         }

         props.navigation.navigate("FuelStationList", { nearbyStations });
      }
   }, [currentLocation, calculateDistance, calculateETA, petrolStations]);

   if (loading) {
      return (
         <View style={styles.loadingContainer}>
            <Loding />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <Image
            source={require('../../img/backround.png')}
            style={styles.img}
         />
         <View style={styles.textbox}>
            <Text style={styles.text}>Fuel Delivery Assistance</Text>
         </View>

         <TouchableOpacity style={styles.mapContainer} onPress={() => setModalVisible(true)}>
            <MapView
               provider={PROVIDER_GOOGLE}
               style={styles.map}
               initialRegion={{
                  latitude: currentLocation ? currentLocation.latitude : 22.7028,
                  longitude: currentLocation ? currentLocation.longitude : 72.8697,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
               showsUserLocation={true}
               followsUserLocation={true}
            >
               {Array.isArray(petrolStations) && petrolStations.map(station => (
                  <Marker
                     key={station.id}
                     coordinate={{ latitude: station.latitude, longitude: station.longitude }}
                     title={station.title}
                     onPress={() => handleNavigate(station)}
                  />
               ))}

               {currentLocation && (
                  <>
                     <Marker
                        coordinate={currentLocation}
                        title="Your Location"
                        pinColor="blue"
                     />
                     <Circle
                        center={currentLocation}
                        radius={5000}
                        strokeColor="lightblue"
                        fillColor="rgba(139, 139, 218, 0.3)"
                     />
                  </>
               )}
            </MapView>
         </TouchableOpacity>
         <View>
            <TouchableOpacity style={styles.button} onPress={handlebuttonclick}>
               <Text style={styles.buttontext}> Petrol Pump Station List</Text>
            </TouchableOpacity>
         </View>

         <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalContainer}>
               <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.fullScreenMap}
                  initialRegion={{
                     latitude: currentLocation ? currentLocation.latitude : 22.7028,
                     longitude: currentLocation ? currentLocation.longitude : 72.8697,
                     latitudeDelta: 0.0922,
                     longitudeDelta: 0.0421,
                  }}
                  showsUserLocation={true}
                  followsUserLocation={true}
               >
                  {Array.isArray(petrolStations) && petrolStations.map(station => (
                     <Marker
                        key={station.id}
                        coordinate={{
                           latitude: station.latitude,
                           longitude: station.longitude,
                        }}
                        title={station.title}
                        onPress={() => handleNavigate(station)}
                     />
                  ))}

                  {currentLocation && (
                     <>
                        <Marker
                           coordinate={currentLocation}
                           title="Your Location"
                           pinColor="blue"
                        />
                        <Circle
                           center={currentLocation}
                           radius={5000}
                           strokeColor="lightblue"
                           fillColor="rgba(139, 139, 218, 0.3)"
                        />
                     </>
                  )}
               </MapView>

               <TouchableOpacity
                  style={styles.Closebuttoncontainer}
                  onPress={() => setModalVisible(false)}
               >
                  <Text>
                     <Close name='closesquare' color='red' size={45} style={styles.closeicon} />
                  </Text>
               </TouchableOpacity>
            </View>
         </Modal>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   mapContainer: {
      position: 'absolute',
      top: height * 0.56,
      width: width * 0.8,
      height: height * 0.25,
      overflow: 'hidden',
      borderRadius: 17,
   },
   map: {
      flex: 1,
   },
   textbox: {
      position: 'absolute',
      top: '48%',
      left: '43%',
      transform: [{ translateX: -width * 0.25 }, { translateY: -20 }],
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F9D754',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
   },
   text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
   },
   locationButton: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: [{ translateX: -50 }],
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 20,
   },
   img: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
   },
   button: {
      position: 'absolute',
      backgroundColor: '#327701',
      top: height * 0.9,
      width: width * 0.8,
      transform: [{ translateX: -width * 0.4 }],
      borderRadius: 8,
      height: 50,
      alignItems: 'center',
      paddingVertical: 11,
   },
   buttontext: {
      flex: 1,
      textAlign: 'center',
      fontSize: 20,
      color: 'white',
      fontWeight: '600',
      alignItems: 'center'
   },
   loadingContainer: {
      flex: 1,
   },
   modalContainer: {
      flex: 1,
   },
   fullScreenMap: {
      flex: 1,
   },
   search: {
      backgroundColor: 'lightgray',
   },

   Closebuttoncontainer: {
      position: 'absolute',
      backgroundColor: 'white',
      alignItems: 'center',
      right: 60,
      top: 10
   },
   closeicon: {
      borderRadius: 8,
   }
});
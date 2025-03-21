import React, { useEffect, useState, useCallback } from 'react';
import { Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Loding from '../../loding/Loding';
import { useNavigation } from '@react-navigation/native';

const BookingScreen = ({ route }) => {
   const { type, data } = route.params;
   const navigation = useNavigation()
   const [currentLocation, setCurrentLocation] = useState(null);
   const [errorMsg, setErrorMsg] = useState(null);
   const [loading, setLoading] = useState(true);
   const [nearbyStations, setNearbyStations] = useState([]);

   // Haversine formula to calculate distance between two coordinates
   const getDistance = (lat1, lon1, lat2, lon2) => {
      const toRad = (value) => (value * Math.PI) / 180;
      const R = 6371; // Earth's radius in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
   };

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

            // Filter stations based on the current location
            handleFilterNearby(location.coords);
         } catch (error) {
            Alert.alert("Error", "Unable to get current location.");
         } finally {
            setLoading(false);
         }
      };

      getLocation();
   }, []);

   const handleFilterNearby = (location) => {
      if (!location || !data) {
         Alert.alert("Error", "Current location or station data is not available.");
         return;
      }

      const filteredStations = data.filter((station) => {
         const distance = getDistance(
            location.latitude,
            location.longitude,
            station.latitude,
            station.longitude
         );
         return distance <= 5; // Within 5 km
      });

      setNearbyStations(filteredStations);
      Alert.alert("Nearby Stations", `${filteredStations.length} station(s) found within 5 km.`);
      console.log('Nearby Stations:', filteredStations);
   };

   const handleNavigate = useCallback((station) => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
      Linking.openURL(url);
   }, []);

   if (loading) {
      return (
         <View style={styles.loadingContainer}>
            <Loding />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
               latitude: currentLocation ? currentLocation.latitude : 22.7028,
               longitude: currentLocation ? currentLocation.longitude : 72.8697,
               latitudeDelta: 0.1999,
               longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
         >
            {data && data.map((station) => (
               <Marker
                  key={station.id}
                  coordinate={{ latitude: station.latitude, longitude: station.longitude }}
                  title={station.title}
                  onPress={() => handleNavigate(station)} // Open Google Maps when a marker is clicked
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

         <BottomSheet isOpen>
            <View style={styles.sheetContainer}>
               <Text style={styles.sheetTitle}>Nearby Stations</Text>
               {nearbyStations.length > 0 ? (
                  nearbyStations.map((station) => {
                     const distance = getDistance(
                        currentLocation.latitude,
                        currentLocation.longitude,
                        station.latitude,
                        station.longitude
                     );
                     const averageSpeed = 50; // Assuming 50 km/h as average speed
                     const time = (distance / averageSpeed).toFixed(2); // Time in hours

                     return (
                        <View key={station.id} style={styles.stationCard}>
                           <Text style={styles.stationName}>{station.serviceName}</Text>
                           <Text style={styles.stationDetail}>
                              Distance: {distance.toFixed(2)} km
                           </Text>
                           <Text>{station.contactNumber}</Text>
                           <Text style={styles.stationDetail}>
                              Estimated Time: {(time * 60).toFixed(0)} minutes
                           </Text>
                           <TouchableOpacity
                              style={styles.navigateButton}
                              onPress={() => {
                                 navigation.navigate("ServiceElectronicsList", {
                                    nearbyStations, distance: distance.toFixed(2),
                                    time: (time * 60).toFixed(0),
                                 })
                              }} // Button click will also open Google Maps
                           >
                              <Text style={styles.buttonText}>Navigate</Text>
                           </TouchableOpacity>
                        </View>
                     );
                  })
               ) : (
                  <Text style={styles.noStationText}>
                     No stations found within 5 km. The nearby stations are being fetched automatically.
                  </Text>
               )}
            </View>
         </BottomSheet>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      height: '100%',
      width: '100%',
   },
   button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      margin: 10,
   },
   buttonText: {
      color: '#fff',
      fontSize: 16,
   },
   loadingContainer: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
   },
   sheetContainer: {
      padding: 20,
   },
   sheetTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   stationCard: {
      marginBottom: 10,
   },
   stationName: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   stationDetail: {
      fontSize: 14,
   },
   noStationText: {
      fontSize: 14,
      color: '#888',
   },
   navigateButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
   },
});

export default BookingScreen;

import React, { use } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome6";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const StationDetails = ({ route }) => {
   const { item } = route.params; // Get the station data passed via navigation
   const navigation = useNavigation()


   return (
      <LinearGradient
         colors={['#9EE37D', '#DEEECC', '#F1F7EE']}
         style={styles.gradient}>
         <View style={styles.header}>
            <Icon name="gas-pump" color='#F9D754' size={30} style={styles.icon} />
            <Text style={styles.title}>Station Details</Text>
         </View>
         <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.imageWrapper}>
               <Image
                  source={require('../../img/backroundimg.png')}
                  style={styles.image}
               />
            </View>

            {/* Details Section */}
            <LinearGradient
               colors={['#ffffff', '#f1f7ee']}
               style={styles.detailsContainer}>
               <View style={styles.titelcontainerWrapper}>
                  <Text style={styles.stationTitle}>{item.title}</Text>
               </View>
               <Text style={styles.stationDetails}>🚗 Fuel Price: ₹{item.fuelPrice}</Text>
               <Text style={styles.stationDetails}>📍 Distance: {item.distance} km</Text>
               <Text style={styles.stationDetails}>⏱ ETA: {item.eta} min</Text>
               <Text style={styles.stationDetails}>📌 Location: {item.address}</Text>

               {/* Fuel Type (First set of boxes) */}
               <Text style={styles.stationDetails}>⛽ Fuel Type:</Text>
               <View style={styles.fuelTypeContainer}>
                  {item.fuelType.map((fuel, index) => (
                     <View key={index} style={styles.fuelTypeBox}>
                        <Image
                           source={require('../../img/drop.png')}
                        />
                        <Text style={styles.fuelTypeText}>{fuel.type}</Text>
                        <Text style={styles.fuelTypeText}>{fuel.price}</Text>
                     </View>
                  ))}
               </View>

               {/* Rating */}
               <Text style={styles.stationDetails}>⭐ Rating: {item.rating}</Text>

               <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("UserForm", { item }) }}>
                  <Text style={styles.buttontext}>Fill Form</Text>
               </TouchableOpacity>
            </LinearGradient>
         </ScrollView>
      </LinearGradient>
   );
};

const styles = StyleSheet.create({
   gradient: {
      flex: 1,
   },
   container: {
      flexGrow: 1,
      padding: 10,
   },
   header: {
      alignItems: 'center',
      marginBottom: 20,
   },
   title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      textAlign: 'center',
   },
   imageWrapper: {
      borderRadius: 15,
      overflow: 'hidden',
      elevation: 10, // Android shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
   },
   image: {
      width: '100%',
      height: width * 0.9, // Maintain a 2:1 aspect ratio
   },
   detailsContainer: {
      marginTop: -90,
      padding: 15,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5, // Shadow for Android
   },
   stationTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      shadowRadius: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 15,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
   },
   stationDetails: {
      fontSize: 18,
      marginVertical: 5,
      color: '#004d40',
   },
   fuelTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
   },
   fuelTypeBox: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      marginHorizontal: 3,
   },
   fuelTypeText: {
      fontSize: 16,
      color: '#333',
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 60,
      backgroundColor: '#143601',
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
   },
   icon: {
      marginLeft: 10,
      paddingHorizontal: 10,
   },
   button: {
      backgroundColor: '#143601',
      justifyContent: 'center',
      height: 50,
      borderRadius: 10,
      alignContent: 'center'
   },
   buttontext: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 20
   }
});

export default StationDetails;

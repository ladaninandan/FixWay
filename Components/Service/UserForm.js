import { StyleSheet, Text, View, Image, Dimensions, Platform, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Entypo";
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const UserForm = ({ route }) => {
   const { item } = route.params;//pass data 
   console.log(item)
   const [platenumber, setplatenumber] = useState('');
   const [vehiclename, setvehiclename] = useState('');
   const [Number, setNumber] = useState('');
   const [fuelQuantity, setFuelQuantity] = useState(1); // State for fuel quantity
   const [loading, setLoading] = useState(false);
   const [fuelType, setFuelType] = useState(null); // State for fuel type selection
   const [locationName, setLocationName] = useState(''); // State for location name
   const [fullAddress, setFullAddress] = useState(''); // State for full address
   const [address, setAddress] = useState("");
   const placeholder = {
      label: 'Select your car model...',
      value: null,
      color: '#9EA0A4',
   };

   const scrollViewRef = React.useRef(null);

   const navigation = useNavigation();

   const increaseQuantity = () => {
      setFuelQuantity((prev) => prev + 1);
   };

   const decreaseQuantity = () => {
      setFuelQuantity((prev) => (prev > 1 ? prev - 1 : prev));
   };

   const fetchLocation = async () => {
      setLoading(true); // Set loading to true before fetching location
      try {
         const { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location permission is required to fetch your current location.');
            setLoading(false); // Set loading to false when permission is denied
            return;
         }

         const location = await Location.getCurrentPositionAsync({});
         const { latitude, longitude } = location.coords;

         // Fetch address using reverse geocoding
         const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
         const address = geocode.length > 0 ? geocode[0].name : 'Address not found';
         const fullAddress = geocode.length > 0
            ? `${geocode[0].street}, ${geocode[0].city}, ${geocode[0].region}, ${geocode[0].country}` : 'Full address not available';

         Alert.alert('Your Current Location', `Latitude: ${latitude}, Longitude: ${longitude}\nAddress: ${address}`);

         // Save the full address and location name for form submission
         setLocationName(address); // Save the location name in the state
         setFullAddress(fullAddress); // Save the full address in the state
      } catch (error) {
         Alert.alert('Error', 'An error occurred while fetching your location.');
      } finally {
         setLoading(false); // Ensure loading is set to false after operation
      }
   };



   // Validation function
   const validateForm = () => {
      if (!platenumber) {
         Alert.alert('Validation Error', 'Please enter your number plate.');
         return false;
      }
      if (!vehiclename) {
         Alert.alert('Validation Error', 'Please enter your vehicle name.');
         return false;
      }
      if (!Number || Number.length !== 10) {
         Alert.alert('Validation Error', 'Please enter a valid 10-digit phone number.');
         return false;
      }
      if (!fuelType) {
         Alert.alert('Validation Error', 'Please select a fuel type.');
         return false;
      }
      if (fuelQuantity <= 0) {
         Alert.alert('Validation Error', 'Please enter a valid fuel quantity.');
         return false;
      }

      if (!locationName || !fullAddress) {
         Alert.alert('Validation Error', 'Please fetch and confirm your location.');
         return false;
      }
      return true;
   };

   const handleSubmit = () => {
      // Validate form before submitting
      scrollViewRef.current.scrollTo({ x: 0, y: 100, animated: true });
      if (validateForm()) {
         // Handle form submission logic here

         const formData = {
            platenumber,
            vehiclename,
            Number,
            fuelQuantity,
            fuelType,
            locationName,
            fullAddress,
         };
         navigation.navigate('CartPage', { formData });
         Alert.alert('Form Submitted', 'Your form has been submitted successfully!');
      }
      console.log(platenumber, Number, vehiclename, fuelQuantity, fuelType, locationName, fullAddress);
   };

   return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
         <Image
            source={require('../../img/formbackround.jpeg')}
            style={styles.image}
         />
         <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} >
            <View style={styles.secondContainer}>
               <View style={styles.header}>
                  <Text style={styles.text}>User Form</Text>
               </View>
               <View style={styles.inputContainer}>
                  <Text style={styles.label}>Enter your number plate</Text>
                  <TextInput
                     placeholder="Enter Your Number"
                     style={styles.input}
                     placeholderTextColor="#888"
                     value={platenumber}
                     onChangeText={(text) => setplatenumber(text)}
                  />


                  <Text style={styles.label}>Select fuel type</Text>

                  <View style={styles.dropdownWrapper}>
                     <RNPickerSelect
                        items={item.fuelType.map((fuel, index) => ({
                           label: `${fuel.type} - ₹${fuel.price}`,
                           value: fuel.price,
                        }))}
                        onValueChange={(value) => setFuelType(value)} // Store selected fuel type
                        style={{
                           inputAndroid: styles.selectInput,
                           inputIOS: styles.selectInput,
                        }}
                        placeholder={placeholder}
                     />
                  </View>

                  <Text style={styles.label}>Enter your Phone Number</Text>
                  <TextInput
                     autoCorrect={false}
                     keyboardType="numeric"
                     maxLength={10}
                     placeholder="Enter Number"
                     style={styles.input}
                     placeholderTextColor="#888"
                     onChangeText={(text) => setNumber(text)}
                  />

                  <Text style={styles.label}>Enter your vehicle name</Text>
                  <TextInput
                     keyboardType='default'
                     autoCorrect={true}
                     // maxLength={10}
                     placeholder="Enter Name"
                     style={styles.input}
                     placeholderTextColor="#888"
                     onChangeText={(text) => setvehiclename(text)}
                  />

                  {/* Buttons for fuel quantity and live location */}
                  <View style={styles.row}>
                     <Text style={styles.label}>Fuel Quantity</Text>
                     <Text style={styles.label}>Enter live location</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                     <View style={styles.fuelQuantityWrapper}>
                        <TouchableOpacity style={styles.fuelButton} onPress={decreaseQuantity}>
                           <Text style={styles.fuelButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.fuelQuantityText}>{fuelQuantity}L</Text>
                        <TouchableOpacity style={styles.fuelButton} onPress={increaseQuantity}>
                           <Text style={styles.fuelButtonText}>+</Text>
                        </TouchableOpacity>
                     </View>
                     <TouchableOpacity
                        style={styles.liveLocationButton}
                        onPress={fetchLocation}
                        disabled={loading} // Disable button while loading
                     >
                        {loading ? (
                           <Text style={styles.liveLocationText}>Loading...</Text>
                        ) : (
                           <Text style={styles.liveLocationText}>
                              <Icon name='location-pin' size={50} />
                           </Text>
                        )}
                     </TouchableOpacity>
                  </View>
                  <Text style={styles.locationText}>
                     Current Location: {locationName || 'Not Available'}
                  </Text>
                  <Text style={styles.locationText}>
                     Full Address: {fullAddress || 'Not Available'}
                  </Text>


                  <Text style={styles.label2}>Enter your Address:</Text>
                  <TextInput
                     style={styles.textArea}
                     value={address}
                     onChangeText={setAddress}
                     placeholder="Enter your full address here..."
                     multiline={true}
                     numberOfLines={4} // Specifies the initial number of visible lines
                     textAlignVertical="top" // Ensures text starts at the top-left
                  />

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                     <Text style={styles.textbutton}>Submit</Text>
                  </TouchableOpacity>

               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
};

export default UserForm;
// Styles remain the same as in your provided code

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   image: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      width: width,
      height: height * 0.45,
      resizeMode: 'cover',
   },
   secondContainer: {
      marginTop: height * 0.4,
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      padding: 20,
   },
   text: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center',
   },
   header: {
      marginTop: -40,
      backgroundColor: '#F9D754',
      height: 50,
      width: '60%',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      elevation: 5,
   },
   inputContainer: {
      width: '90%',
   },
   label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 5,
      // top: 30
      // marginTop: 20
   },
   input: {
      fontSize: 16,
      padding: 10,
      borderWidth: 0.1,
      borderColor: 'black',
      borderRadius: 8,
      backgroundColor: '#DCF6CA',
      marginVertical: 4,
      height: 50,
      width: '100%',
      shadowColor: 'black',
      elevation: 9,
      shadowRadius: 8,
      color: 'black',
      marginBottom: 20,
   },
   dropdownWrapper: {
      marginVertical: 4,
      borderRadius: 10,
      borderWidth: 0.1,
      borderColor: 'black',
      overflow: 'hidden',
      marginBottom: 20,
   },
   selectInput: {
      fontSize: 16,
      padding: 10,
      backgroundColor: '#DCF6CA',
      color: 'black',
      height: 50,
      justifyContent: 'center',
      shadowColor: 'black',
      elevation: 9,
   },
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
   },
   fuelQuantityWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#DCF6CA',
      borderRadius: 10,
   },
   fuelButton: {
      backgroundColor: '#228B22',
      padding: 13,
      borderRadius: 7,
   },
   fuelButtonText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
   },
   fuelQuantityText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 15,
   },
   liveLocationButton: {
      backgroundColor: '#DCF6CA',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      width: 100
   },
   liveLocationText: {
      color: '#228B22',
      fontSize: 16,
      fontWeight: 'bold',
   },
   row: {
      width: 288,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   button: {
      marginVertical: 20,
      height: 50,
      backgroundColor: '#327701',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8
   },
   textbutton: {
      color: 'white',
      fontSize: 21,
      fontWeight: 'bold',
   },
   textArea: {
      height: 90,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      backgroundColor: '#DCF6CA',
      // backgroundColor: "#f9f9f9",
   },
   label2: {
      marginTop: 15,
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 5,
   }
});
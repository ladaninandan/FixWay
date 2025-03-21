import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Dimensions, ScrollView, ActivityIndicator, Animated } from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import Ripple from 'react-native-material-ripple';
import { FontAwesome } from "@expo/vector-icons";


const { width } = Dimensions.get('window');
const Home = (props) => {
   const [address, setAddress] = useState("");
   const [loading, setLoading] = useState(false);
   const [placeholder, setPlaceholder] = useState('Search fuel');
   const placeholders = ['Search fuel', 'Search electronic', 'Search mechanic', 'Search water'];
   const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

   useEffect(() => {
      let index = 0;

      const cyclePlaceholders = () => {
         // Fade out animation
         Animated.timing(fadeAnim, {
            toValue: 0, // Fully transparent
            duration: 500, // 500ms fade-out
            useNativeDriver: true,
         }).start(() => {
            // Update the placeholder once fade-out is complete
            index = (index + 1) % placeholders.length;
            setPlaceholder(placeholders[index]);

            // Fade in animation
            Animated.timing(fadeAnim, {
               toValue: 1, // Fully visible
               duration: 500, // 500ms fade-in
               useNativeDriver: true,
            }).start();
         });
      };

      // Set an interval to change the placeholder every 3 seconds
      const interval = setInterval(cyclePlaceholders, 3000);

      return () => clearInterval(interval); // Cleanup on component unmount
   }, [fadeAnim]);

   const images = [
      { id: 1, src: require('../img/HomeSlicerFulepump.jpg') },
      { id: 2, src: require('../img/img2.jpeg') },
      { id: 3, src: require('../img/img3.jpeg') },
   ];

   const [activeIndex, setActiveIndex] = useState(0);
   const flatListRef = useRef(null);


   useEffect(() => {
      const interval = setInterval(() => {
         setActiveIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % images.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            return nextIndex;
         });
      }, 2000); // Change image every 2 seconds

      return () => clearInterval(interval); // Cleanup the interval on component unmount
   }, []);

   const handleScroll = (event) => {
      const slideIndex = Math.round(
         event.nativeEvent.contentOffset.x / width
      );
      setActiveIndex(slideIndex);
   };


   const fetchAddress = async () => {
      try {
         setLoading(true);

         // Request permission to access location
         const { status } = await Location.requestForegroundPermissionsAsync();
         if (status !== "granted") {
            setAddress("Permission to access location was denied.");
            setLoading(false);
            return;
         }

         // Get the current location with high accuracy
         const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
         });
         const { latitude, longitude } = location.coords;

         // Use a geocoding API to fetch the address
         const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=677965481a774beeb3fcc4ee55a127ab&language=en&pretty=1`
         );
         const data = await response.json();
         const currentAddress = data.results[0]?.formatted || "Unable to fetch address";

         setAddress(currentAddress);
      } catch (error) {
         setAddress("Error fetching address");
         console.error(error);
      } finally {
         setLoading(false);
      }
   };


   useEffect(() => {
      fetchAddress()
   }, [])




   const services = [
      {
         id: 1,
         image: require('../img/haircut1.jpg'), // Replace with actual image URL
         title: 'Haircut for men',
         rating: '4.88 (489K)',
         price: '₹259',
      },
      {
         id: 2,
         image: require('../img/Sofaclening.jpg'), // Replace with actual image URL
         title: 'Sofa cleaning',
         rating: '4.86 (484K)',
         price: '₹569',
      },
      {
         id: 3,
         image: require('../img/haircut2.jpg'), // Replace with actual image URL
         title: 'Haircut for women',
         rating: '4.92 (123K)',
         price: '₹459',
      },
      {
         id: 4,
         image: require('../img/haircut1.jpg'), // Replace with actual image URL
         title: 'Haircut for women',
         rating: '4.92 (123K)',
         price: '₹459',
      },
   ];

   const pestControlServices = [
      {
         id: 1,
         image: require('../img/pastControal1.jpg'), // Replace with actual image URL
         title: 'Termite Control',
         rating: '4.89 (320K)',
         price: '₹799',
      },
      {
         id: 2,
         image: require('../img/pastControal2.jpg'), // Replace with actual image URL
         title: 'Bed Bug Control',
         rating: '4.85 (180K)',
         price: '₹599',
      },
      {
         id: 3,
         image: require('../img/pastControal3.jpg'), // Replace with actual image URL
         title: 'Rodent Control',
         rating: '4.91 (250K)',
         price: '₹999',
      },
      {
         id: 4,
         image: require('../img/pastControal4.jpg'), // Replace with actual image URL
         title: 'Mosquito Control',
         rating: '4.87 (290K)',
         price: '₹699',
      },
      {
         id: 5,
         image: require('../img/pastControal5.jpg'), // Replace with actual image URL
         title: 'Cockroach Control',
         rating: '4.88 (410K)',
         price: '₹459',
      },
   ];


   return (
      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
         <View style={styles.imagecontainer}>
            <Image
               // source={require('../img/Home.png')}
               style={styles.imagestyle}
            />
            <View ></View>
            <View style={styles.textOverlay}>
               <Text style={styles.overlayText}>Location</Text>

               <View style={styles.row}>
                  <View style={styles.locationContainer}>
                     <Icon name="location-pin" size={30} color="#CBB10B" />
                     <TouchableOpacity >
                        {loading ? (
                           <ActivityIndicator color="white" />
                        ) : (
                           <Text style={styles.text}>{address}</Text>
                        )}
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.notifationiconscontainer}>
                        <Icon3 name="notifications-sharp" size={30} color="#CBB10B" />
                     </TouchableOpacity>
                  </View>
               </View>


               <View style={styles.searchContainer}>
                  <View style={styles.search}>
                     <Icon2 name="search" size={30} color="gray" />
                     <Animated.View style={{ opacity: fadeAnim }}>
                        <TextInput
                           style={styles.input}
                           placeholder={placeholder}
                           placeholderTextColor="gray"
                        />
                     </Animated.View>
                  </View>
                  <TouchableOpacity style={styles.filtericonscontainer} onPress={() => { props.navigation.navigate("SummaryPage") }}>
                     <Icon2 name="shopping-cart" size={30} color="#CBB10B" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filtericonscontainer}>
                     <Icon2 name="user" size={30} color="#CBB10B" />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
         <View>
            <View style={styles.container}>

               <FlatList
                  ref={flatListRef}
                  data={images}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                     <Image source={item.src} style={styles.image} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  onScroll={(event) => {
                     const contentOffsetX = event.nativeEvent.contentOffset.x;
                     const index = Math.round(contentOffsetX / event.nativeEvent.layoutMeasurement.width);
                     setActiveIndex(index);
                  }}
               />
               <View style={styles.pagination}>
                  {images.map((_, index) => (
                     <Text
                        key={index}
                        style={[
                           styles.dot,
                           activeIndex === index && styles.activeDot,
                        ]}
                     >
                        ●
                     </Text>
                  ))}
               </View>
               <View style={styles.imgcontainer}>
                  <TouchableOpacity style={styles.imginner} onPress={() => { props.navigation.navigate('FuelDelivery') }}>
                     <Image
                        source={require('../img/HomeFuleService.jpg')}
                        style={styles.img}
                     />
                     <TouchableOpacity style={styles.imgbutton}>
                        <Text style={styles.imgintext}>Fuel Delivery</Text>
                     </TouchableOpacity>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imginner} onPress={() => { props.navigation.navigate('Electronicservices') }}>
                     <Image
                        source={require('../img/HomeElectronicService.jpg')}
                        style={styles.img}
                     />
                     <TouchableOpacity style={styles.imgbutton}>
                        <Text style={styles.imgintext}>Electronic services</Text>
                     </TouchableOpacity>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imginner} onPress={() => { props.navigation.navigate('MechanicServicesHome') }}>
                     <Image
                        source={require('../img/HomeMechanicService.jpg')}
                        style={styles.img}
                     />
                     <TouchableOpacity style={styles.imgbutton} >
                        <Text style={styles.imgintext}>Mechanic services</Text>
                     </TouchableOpacity>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imginner} onPress={() => { props.navigation.navigate('WaterServices') }}>
                     <Image
                        source={require('../img/HomeWaterService.jpg')}
                        style={styles.img}
                     />
                     <TouchableOpacity style={styles.imgbutton}>
                        <Text style={styles.imgintext}>Water services</Text>
                     </TouchableOpacity>
                  </TouchableOpacity>
               </View>


            </View>
            <View style={styles.containercard}>
               <Text style={styles.headercard}>Most booked services</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  {services.map((service) => (
                     <Ripple key={service.id} style={styles.card}>
                        <Image source={service.image} style={styles.imagecard} />
                        <Text style={styles.titlecard}>{service.title}</Text>
                        <Text style={styles.ratingcard}>⭐ {service.rating}</Text>
                        <Text style={styles.pricecard}>{service.price}</Text>
                     </Ripple>
                  ))}
               </ScrollView>
            </View>
            <View style={styles.containercard}>
               <View style={styles.headerrow}>
                  <Text style={styles.headercard2}>pest control</Text>
                  <Text style={styles.headerseeall}>(See all)</Text>
               </View>
               <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  {pestControlServices.map((service) => (
                     <Ripple key={service.id} style={styles.card}>
                        <Image source={service.image} style={styles.imagecard} />
                        <Text style={styles.titlecard}>{service.title}</Text>
                        <Text style={styles.ratingcard}>⭐ {service.rating}</Text>
                        <Text style={styles.pricecard}>{service.price}</Text>
                     </Ripple>
                  ))}
               </ScrollView>
            </View>
         </View>


         {/* footer  */}
         <View style={styles.footerContainer}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
               <Image
                  source={require('../img/logo2.png')} // Add your logo image in the assets folder
                  style={styles.logo}
               />
               <Text style={styles.tagline}>Your Roadside Companion</Text>
            </View>

            {/* Quick Links */}
            <View style={styles.quickLinks}>
               <TouchableOpacity onPress={() => handleLinkPress("https://www.fixway.com/about")}>
                  <Text style={styles.link}>About Us</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleLinkPress("https://www.fixway.com/services")}>
                  <Text style={styles.link}>Services</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleLinkPress("https://www.fixway.com/support")}>
                  <Text style={styles.link}>Support</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleLinkPress("https://www.fixway.com/contact")}>
                  <Text style={styles.link}>Contact</Text>
               </TouchableOpacity>
            </View>

            {/* Social Media Links */}
            <View style={styles.socialMedia}>
               <TouchableOpacity onPress={() => handleLinkPress("https://facebook.com/fixway")}>
                  <FontAwesome name="facebook" size={24} color="#3b5998" style={styles.icon} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleLinkPress("https://twitter.com/fixway")}>
                  <FontAwesome name="twitter" size={24} color="#00acee" style={styles.icon} />
               </TouchableOpacity>
               <TouchableOpacity onPress={() => handleLinkPress("https://instagram.com/fixway")}>
                  <FontAwesome name="instagram" size={24} color="#C13584" style={styles.icon} />
               </TouchableOpacity>
            </View>

            {/* Copyright Section */}
            <Text style={styles.copyright}>
               © {new Date().getFullYear()} FixWay. All Rights Reserved.
            </Text>
         </View>
      </ScrollView>
   );
};

export default Home;

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      backgroundColor: '#fff', // Set a background color to visualize the layout
   },
   container: {
      alignItems: 'center', // Center the "Home" text horizontally
      marginHorizontal: 10,
      marginTop: -10,
   },
   homeText: {
      backgroundColor: 'black',
      color: 'white',
      padding: 10,
      fontSize: 18,
      borderRadius: 5,
   },
   imagecontainer: {
      alignItems: 'center',
      // marginTop: 4,
      marginBottom: 20,
      backgroundColor: '#143601',
      margin: 4,
      // borderBottomLeftRadius: 30,
      // borderBottomRightRadius: 30,
      borderRadius: 10,
      height: 200
   },

   textOverlay: {
      position: 'absolute',
      top: '42%',
      left: '20%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
   },
   overlayText: {
      top: -10,
      fontSize: 25,
      fontWeight: '600',
      color: 'gray',
      textAlign: 'center',
      left: '-34%',
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Ensures proper spacing
      width: '100%', // Full width for responsiveness
      paddingHorizontal: 10, // Padding for consistent spacing
      marginVertical: 10, // Adds spacing between rows
   },

   locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1, // Ensures this container takes available space
      position: 'relative', // Allows absolute positioning of child elements
   },

   notifationiconscontainer: {
      position: 'absolute', // Fix the position relative to the container
      right: -10, // Align to the right of the parent container
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      backgroundColor: '#D1F6B7',
      marginLeft: 'auto',
      borderRadius: 5, // Rounded corners for a polished look
      zIndex: 1, // Ensures it stays on top of overlapping elements
   },

   text: {
      marginLeft: 10, // Space between the icon and the text
      flexShrink: 1, // Prevents overflow if the text is too long
      justifyContent: 'center',
      color: 'white',
      maxWidth: '90%', // Ensures text does not take too much space
      overflow: 'hidden', // Hides overflow text
   },
   searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      width: 310,
   },
   search: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#D1F6B7',
      alignItems: 'center',
      paddingLeft: 8,
      borderRadius: 8,
      width: 220,
      height: 42,
   },
   input: {
      color: 'black',
      fontSize: 16,
      flex: 1,
   },
   filtericonscontainer: {
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      backgroundColor: '#D1F6B7',
      borderRadius: 3,
   },

   image: {
      width: 340,
      borderRadius: 9,
      height: 250,
      resizeMode: 'cover',
   },
   pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: -30,
   },
   dot: {
      fontSize: 20,
      color: '#D1F6B7',
      marginHorizontal: 3,
   },
   activeDot: {
      color: '#CBB10B',
   },



   imgcontainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allows wrapping of items to the next row
      justifyContent: 'space-between', // Evenly space items
      marginTop: 20,
   },
   imginner: {
      width: '48%', // Each image container takes 48% of the width for two columns with some spacing
      marginBottom: 20, // Add spacing between rows
      position: 'relative', // Needed for the button overlay
   },
   img: {
      width: '100%', // Image fills its container
      height: 170, // Adjust height as needed
      borderRadius: 8,
      resizeMode: 'cover',
   },
   imgbutton: {
      backgroundColor: '#245501',
      position: 'absolute',
      bottom: -10,
      left: '10%',
      right: '10%',
      height: 35,
      borderRadius: 20,
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 7,
   },
   imgintext: {
      color: 'white',
      fontSize: 13,
      fontWeight: '800',
   },

   containercard: {
      padding: 10,
      backgroundColor: '#FFF',
   },
   headercard: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
      borderBottomWidth: 2,
      borderColor: 'lightgray',
      paddingBottom: 10,

   },
   card: {
      flex: 1,
      width: 130, // Fixed width for cards
      backgroundColor: '#F9F9F9',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      alignItems: 'center',
      margin: 10
   },
   imagecard: {
      width: 100,
      height: 130,
      borderRadius: 5,
      marginBottom: 10,
   },
   titlecard: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5,
      color: '#333',
   },
   ratingcard: {
      fontSize: 12,
      color: '#777',
      marginBottom: 5,
   },
   pricecard: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000',
   },


   footerContainer: {
      elevation: 5,
      backgroundColor: "#F8FAFC",
      paddingHorizontal: 20,
      alignItems: "center",
   },
   logoContainer: {
      alignItems: "center",
      marginBottom: 10,
   },
   logo: {
      width: 100,
      height: 100,
      resizeMode: "contain",
   },
   tagline: {
      color: "black",
      fontSize: 16,
      fontStyle: "italic",
   },
   quickLinks: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 10,
   },
   link: {
      color: "green",
      fontSize: 14,
      fontWeight: "bold",
   },
   socialMedia: {
      flexDirection: "row",
      marginTop: 15,
   },
   icon: {
      marginHorizontal: 10,
   },
   copyright: {
      color: "#fff",
      fontSize: 12,
      marginTop: 10,
      textAlign: "center",
   },
   headerrow: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Ensures proper spacing
      width: '100%', // Full width for responsiveness
      paddingHorizontal: 10, // Padding for consistent spacing
      borderBottomWidth: 2,
      borderColor: 'lightgray',
      marginBottom: 10,
   },
   headerseeall: {
      color: 'blue',
      fontSize: 16,
      fontWeight: 500
   },
   headercard2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      paddingBottom: 10,
   }

});


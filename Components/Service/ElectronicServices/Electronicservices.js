import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput } from 'react-native';
import Electrical from "react-native-vector-icons/MaterialIcons";
import Ripple from 'react-native-material-ripple';
import Tv from "react-native-vector-icons/FontAwesome";
import Washingmachine from "react-native-vector-icons/MaterialCommunityIcons";
import Computer from "react-native-vector-icons/FontAwesome6";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slideshow from 'react-native-image-slider-show';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your icon library


const { width, height } = Dimensions.get('window');

const Electronicservices = (props) => {

   const [position, setPosition] = useState(0);
   const [searchText, setSearchText] = useState('');

   const dataSource = [
      { title: "Tv Service", caption: "Professional Service", url: require('../../../img/tvservice.jpeg') },
      { title: "AC Service", caption: "Efficient Cooling", url: require('../../../img/Acservice.jpeg') },
      { title: "Refrigerator Service", caption: "Quality Repairs", url: require('../../../img/refrizetar.jpeg') },
      { title: "Washing Machine", caption: "Seamless Cleaning", url: require('../../../img/washingmachine.jpeg') }
   ];

   useEffect(() => {
      const toggle = setInterval(() => {
         setPosition((prevPosition) => (prevPosition === dataSource.length - 1 ? 0 : prevPosition + 1));
      }, 3000);

      return () => clearInterval(toggle); // Cleanup interval on unmount
   }, [dataSource.length]);

   return (
      <SafeAreaView style={styles.safeArea}>
         <View style={styles.header}>
            <View style={styles.row}>
               <Electrical name="electrical-services" size={50} color="#F9D754" />
               <Text style={styles.headertext}>Electronic Services</Text>
            </View>
         </View>
         <View style={styles.container}>
            <View style={styles.searchContainer}>
               <Text style={styles.headerText}>One Step Solution for your Electronics</Text>
               <View style={styles.inputContainer}>
                  <Icon name="search" size={20} color="#666" style={styles.icon} />
                  <TextInput
                     placeholder="Search"
                     value={searchText}
                     onChangeText={(text) => setSearchText(text)}
                     style={styles.input}
                  />
               </View>
            </View>
            <Text style={styles.Serviceall}>All Services</Text>
            <View style={styles.row}>
               <Ripple rippleColor="black" rippleDuration={400} style={styles.card} onPress={() => { props.navigation.navigate('TVservice') }}>
                  <Tv name="tv" size={40} color="#DBAF06" style={styles.cardicon} />
                  <Text style={styles.cardinnertext}>TV Services</Text>
               </Ripple>
               <Ripple rippleColor="black" rippleDuration={400} style={styles.card} onPress={() => { props.navigation.navigate('WashingMachine') }}>
                  <Washingmachine name="washing-machine" size={40} color="#DBAF06" style={styles.cardicon} />
                  <Text style={styles.cardinnertext}>Washing Machine</Text>
               </Ripple>
               <Ripple rippleColor="black" rippleDuration={400} style={styles.card} onPress={() => { props.navigation.navigate('Computer') }}>
                  <Computer name="computer" size={40} color="#DBAF06" style={styles.cardicon} />
                  <Text style={styles.cardinnertext}>Computer</Text>
               </Ripple>
               <Ripple rippleColor="black" rippleDuration={400} style={styles.card} onPress={() => { props.navigation.navigate('Refrigerator') }}>
                  <MaterialCommunityIcons name="fridge" size={40} color="#DBAF06" />
                  <Text style={styles.cardinnertext}>Refrigerator</Text>
               </Ripple>
               <Ripple rippleColor="black" rippleDuration={400} style={styles.card} onPress={() => { props.navigation.navigate('Acrepair') }}>
                  <MaterialCommunityIcons name="air-conditioner" size={40} color="#DBAF06" />
                  <Text style={styles.cardinnertext}>Air Conditioner</Text>
               </Ripple>
               <Ripple rippleColor="black" rippleDuration={400} style={styles.card} onPress={() => { props.navigation.navigate('OtherDevice') }}>
                  <MaterialIcons name="devices-other" size={40} color="#DBAF06" />
                  <Text style={styles.cardinnertext}>Other Devices</Text>
               </Ripple>
            </View>
            <View style={styles.imageSliderContainer}>
               <Slideshow
                  position={position}
                  dataSource={dataSource}
                  titleStyle={{ color: 'white', fontWeight: '700', fontSize: 20 }}
                  captionStyle={{ color: 'white' }}
                  height={height * 0.26}
               />
            </View>
         </View>
      </SafeAreaView>
   );
};

export default Electronicservices;

const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
      backgroundColor: "#f2f0ef",
   },
   container: {
      flex: 1,
      marginHorizontal: 17,
      marginTop: 20,
   },
   header: {
      backgroundColor: '#143601',
      height: height * 0.09,
      borderBottomRightRadius: 50,
      borderBottomLeftRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
   },
   row: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 6,
      flexWrap: 'wrap',
   },
   headertext: {
      fontSize: 23,
      textAlign: 'center',
      fontWeight: '600',
      color: 'white',
   },
   card: {
      backgroundColor: 'white',
      width: width * 0.29,
      height: height * 0.14,
      padding: 10,
      elevation: 10,
      borderRadius: 9,
      justifyContent: 'flex-start',
   },
   cardinnertext: {
      fontSize: 13,
      fontWeight: '700',
      marginTop: 25,
      color: 'black',
   },
   imageSliderContainer: {
      marginTop: 30,
   },
   searchContainer: {
      padding: 16,
      backgroundColor: '#F1F7EE',
      marginBottom: 10,
      elevation: 10,
      borderRadius: 10
   },
   headerText: {
      fontSize: 20,
      color: '#333',
      fontWeight: 600,
      marginBottom: 10,
   },
   inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 3, // Adds shadow for Android
      shadowColor: '#000', // Adds shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      paddingHorizontal: 10,
      height: 45
   },
   icon: {
      marginRight: 8,
   },
   input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: '#333',
   },
   Serviceall: {
      fontSize: 20,
      padding: 10,
      fontWeight: 500
   }
});

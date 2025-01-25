import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';

const Congratulation = () => {
   return (
      <View style={styles.container}>
         <Image
            source={require('../img/Congratulation.png')} // Replace with your image path
            style={styles.imageStyle}
            resizeMode="cover" // Ensures the image covers its container
         />
         <View style={styles.textOverlay}>
            <Text style={styles.overlayText}>Congratulations!</Text>
            <Text style={styles.text}>Your account setup is</Text>
            <Text style={styles.text}>complete!!</Text>
            <View>
               <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttontext}>Continue</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export default Congratulation;

const { width, height } = Dimensions.get('window'); // Get device width and height dynamically

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff', // Optional: Set a background color
   },
   imageStyle: {
      width: width, // Occupies the full screen width
      height: '100%', // Adjust height dynamically (60% of screen height)
   },
   textOverlay: {
      position: 'absolute', // Overlay content on the image
      top: height * 0.55, // Adjust this to place content below the image
      width: '90%', // Center content with some padding
      alignItems: 'center',
   },
   overlayText: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#143601', // Make text visible
      textAlign: 'center',
      marginBottom: 10, // Space between title and description
   },
   text: {
      fontSize: 25,
      fontWeight: '500',
      color: 'gray',
      textAlign: 'center',
   },
   button: {
      marginTop: 70,
      backgroundColor: '#327701',
      height: 60,
      width: 300, // Button takes 80% of the screen width
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
   },
   buttontext: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
   },
});

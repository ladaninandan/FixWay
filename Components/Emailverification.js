/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const Emailverification = ({ route }) => {
   const { email } = route.params;
   const navigation = useNavigation()

   const [otp, setOtp] = useState(''); // Store OTP input
   const otpLength = 4; // Define the OTP length

   const handleKeyPress = (value) => {
      if (value === 'DEL') {
         // Remove the last character
         setOtp((prev) => prev.slice(0, -1));
      } else if (otp.length < otpLength) {
         // Add the pressed key value to OTP
         setOtp((prev) => prev + value);
      }
   };

   const handleSubmit = async () => {
      try {
         const response = await axios.post("http://192.168.69.73:5000/api/verify-otp",
            { email, otp },
            { headers: { "Content-Type": "application/json" } }
         );
         // hendle response
         if (response.status === 200) {
            console.log("otp verifaction successful :", response.data);
            navigation.navigate("Register");
         } else {
            console.log("unexpected response", response.data);
         }

      } catch (error) {
         console.log("error during otp varifaction ", error.response ? error.response.data : error.message)
      };

      console.log('Verifying OTP:', otp);
   };

   // resend otp 

   const handleResendOtp = () => {
      // alert("OTP Resent", "The OTP has been successfully resent to your email.");
      console.log('Resend OTP pressed');
      setModalVisible(true);
   };



   const [isModalVisible, setModalVisible] = useState(false);
   const closeModal = () => {
      setModalVisible(false);
   };

   return (
      <View >
         <View style={styles.imageContainer}>
            <Image
               source={require('../img/Ellipse8.png')} // Replace with your image path
               style={styles.imageStyle}
            />
            <View style={styles.textOverlay}>
               <Text style={styles.overlayText}>Email verification</Text>
            </View>
         </View>
         <View style={styles.container}>
            <View>
               <Text style={{ justifyContent: 'center', alignItems: 'baseline', color: "gray", fontWeight: '500', fontSize: 17, marginBottom: 19 }}>Place enter your email OTP</Text>
            </View>
            <View style={styles.email}>
               <Text style={styles.textemail}>
                  {email}
               </Text>
            </View>

            <View style={styles.otpContainer}>
               {Array.from({ length: otpLength }).map((_, index) => (
                  <View key={index} style={styles.otpBox}>
                     <Text style={styles.otpText}>{otp[index] || ''}</Text>
                  </View>
               ))}
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
               <Text style={{ fontSize: 17, color: 'gray' }}>
                  If you don’t receive an OTP
               </Text>
               <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={{ color: 'black', fontWeight: '600', fontSize: 18 }}>
                     {' '}Resend
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={styles.keypad}>
            {[
               '1', '2', '3',
               '4', '5', '6',
               '7', '8', '9',
               'DEL', '0', 'SUBMIT',
            ].map((key) => (
               <TouchableOpacity
                  key={key}
                  style={[
                     styles.key,
                     key === 'SUBMIT' && styles.submitKey, // Style SUBMIT differently
                  ]}
                  onPress={() =>
                     key === 'SUBMIT' ? handleSubmit() : handleKeyPress(key)
                  }
               >
                  <Text
                     style={[
                        styles.keyText,
                        key === 'SUBMIT' && styles.submitKeyText,
                     ]}
                  >
                     {key}
                  </Text>
               </TouchableOpacity>
            ))}
         </View>

         <Modal
            isVisible={isModalVisible}
            onBackdropPress={closeModal}
         >
            <View style={styles.modalContent}>
               <Text style={styles.modalText}>OTP Resent</Text>
               <Text style={{ fontSize: 16 }}>The OTP has been successfully resent to your email.</Text>

               <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
               </TouchableOpacity>
            </View>
         </Modal>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 0, // Ensures the container takes up the entire space
      // flexDirection: 'row', // Arranges children in a horizontal row
      justifyContent: 'center', // Aligns children to the end of the row
      alignItems: 'center', // Vertically centers the children
      paddingHorizontal: 20, // Optional padding
      marginTop: 30,
   },
   imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
   },
   imageStyle: {
      width: 364,
      height: 200,
      resizeMode: 'contain',
      alignItems: 'center',
      justifyContent: 'center',
   },
   textOverlay: {
      position: 'absolute', // Positions the text over the image
      alignItems: 'center',
      justifyContent: 'center',

   },
   overlayText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white', // Make the text visible over the image
      textAlign: 'center',
   },
   email: {
      flexDirection: 'row',
      paddingHorizontal: 20,
   },
   textemail: {
      fontSize: 20,
      fontWeight: 500,
      color: "black",
   },
   sendbutton: {
      backgroundColor: "#D1F6B7",
      justifyContent: 'center',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginLeft: 10,
   },
   otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginTop: 20,
   },
   otpBox: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginHorizontal: 7,
   },
   otpText: {
      fontSize: 25,
      color: '#333',
   },
   keypad: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: "#245501",
      borderRadius: 18,
      marginTop: 40,
      paddingTop: 10
   },
   key: {
      width: '30%',
      margin: '0.2%',
      aspectRatio: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2A6401',
      borderRadius: 8,
   },
   submitKey: {
      backgroundColor: '#0056b3',
   },
   keyText: {
      fontSize: 20,
      color: '#fff',
   },
   submitKeyText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
   },
   modalContent: {
      backgroundColor: '#EAF5DD',
      opacity: 0.9,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
   },
   modalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#007BFF',
   },
   closeButton: {
      backgroundColor: '#007BFF',
      padding: 15,
      marginTop: 20,
      borderRadius: 8
   }

});

export default Emailverification; 
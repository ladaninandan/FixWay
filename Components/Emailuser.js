import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Modal from "react-native-modal";
import axios from 'axios';

const Register = (props) => {
   const [email, setEmail] = useState('');
   const [focusedField, setFocusedField] = useState('');

   const [isModalVisible, setModalVisible] = useState(false);
   const [message, setmessage] = useState("");

   const closeModal = () => {
      setModalVisible(false);
   };


   const handlesubmit = async () => {
      const isValid = await handlevalidation();
      if (isValid) {
         // console.log("Navigating to Emailverification with email:", email);
         try {
            // Send API request to verify email
            const response = await axios.post("http://192.168.69.73:5000/api/send-otp",
               { email },
               { headers: { "Content-Type": "application/json" } })

            // Handle success response
            if (response.status === 200) {
               console.log("email verifaction successful:", response.data);
               props.navigation.navigate("Emailverification", { email }); // Navigate only if validation passes
            } else {
               console.log("Unexpected responce", response.data)
            }
         } catch (error) {
            console.error("error during  email verifaction ", error.response ? error.response.data : error.message)
         }

      } else {
         console.log("Validation failed, not navigating");
      }
   };

   const handlevalidation = async () => {
      // console.log("Validating email:", email);
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (email.trim() === '') {
         setmessage("Please enter your Email.");
         setModalVisible(true);
         return false;
      }

      if (!emailPattern.test(email)) {
         setmessage("Please enter a valid email address.");
         setModalVisible(true);
         return false;
      }

      return true;
   };

   const handlesignin = () => {
      props.navigation.navigate("Login");
   }


   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior={Platform.OS === 'android' ? 'padding' : undefined}>

         <ScrollView style={{ marginBottom: -50, paddingBottom: 0 }}>
            <View style={styles.imageContainer}>
               <Image
                  source={require('../img/Ellipse8.png')} // Replace with your image path
                  style={styles.imageStyle}
               />
               <View style={styles.textOverlay}>
                  <Text style={styles.overlayText}>Sign Up</Text>
               </View>
            </View>

            <View style={styles.container}>
               <Text style={styles.label}>Email:</Text>
               <TextInput
                  style={[styles.input,
                  focusedField === 'email' && styles.focusedFieldcontainer
                  ]}
                  placeholder="Enter your Email"
                  placeholderTextColor="#888"
                  value={email.toLowerCase()}
                  onChangeText={value => setEmail(value)}
                  onFocus={() => { setFocusedField('email') }}
               />
               <View style={styles.content}>
                  <TouchableOpacity style={styles.roundButton} onPress={handlesubmit}>
                     <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
                  </TouchableOpacity>
               </View>
            </View>

            <View style={styles.textSign}>
               <Text style={{ fontSize: 17, color: 'gray' }}>
                  Already have an account?{' '}
                  <TouchableOpacity onPress={handlesignin}>
                     <Text style={{ fontSize: 17, color: 'black', fontWeight: 'bold' }}>Sign In</Text>
                  </TouchableOpacity>
               </Text>
            </View>
         </ScrollView>


         <Modal
            isVisible={isModalVisible}
            onBackdropPress={closeModal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={600}  // Adjust animation duration
            animationOutTiming={600}
            backdropOpacity={0.7}  // Dim the background for better visibility
         >
            <View style={styles.modalContent}>
               <Text style={styles.modalText}>Validation Error</Text>
               <Text style={{ fontSize: 18 }}>{message}</Text>
               <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
               </TouchableOpacity>
            </View>
         </Modal>
      </KeyboardAvoidingView>

   );

};
const styles = StyleSheet.create({
   imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 60,
   },
   imageStyle: {
      width: 364,
      height: 200,
      resizeMode: 'contain',
   },
   textOverlay: {
      position: 'absolute', // Positions the text over the image
      // top: '70%', // Centers the text vertically
      // left: '38%', // Centers the text horizontally
      // transform: [{ translateX: -50 }, { translateY: -50 }], // Aligns the text properly in the center
      alignItems: 'center',
      justifyContent: 'center',
   },
   overlayText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white', // Make the text visible over the image
      textAlign: 'center',
   },

   textSign: {
      // paddingHorizontal: 50,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   container: {
      flex: 0,
      justifyContent: 'center',
      paddingHorizontal: 25,
   },
   label: {
      fontSize: 18,
      marginBottom: 4,
   },
   focusedFieldcontainer: {
      borderColor: 'green',
      borderWidth: 2,
      elevation: 9
   },

   content: {
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center',
   },
   roundButton: {
      borderRadius: 8,
      backgroundColor: '#327701',
      paddingVertical: 15,
      width: '100%',
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   input: {
      height: 50,
      // borderColor: 'lightgreen',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      marginBottom: 16,
      backgroundColor: '#ECFFDF',
      color: 'black'
   },

   // model styles

   modalContent: {
      backgroundColor: '#f1f7ee',
      opacity: 0.9,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      borderColor: 'red',
      borderWidth: 1
   },
   modalText: {
      fontSize: 25,
      margin: 15,
      fontWeight: 'bold',
      color: 'red',
   },
   closeButton: {
      backgroundColor: '#143601',
      padding: 15,
      marginTop: 20,
      borderRadius: 8
   }
});

export default Register;

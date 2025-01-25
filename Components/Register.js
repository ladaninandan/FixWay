import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Modal from "react-native-modal";

const Register = (props) => {
   const [name, setName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmpassword, setconfirmpassword] = useState('');
   const [number, setNumber] = useState('');
   const [focusedField, setFocusedField] = useState('');

   const [isModalVisible, setModalVisible] = useState(false);
   const [message, setmessage] = useState("");

   const closeModal = () => {
      setModalVisible(false);
   };


   const handlesubmit = async () => {
      const isValid = await handlevalidation();

      if (isValid) {
         props.navigation.navigate("Login"); // Navigate only if validation passes
      }
   };

   const handlenumber = (value) => {
      const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
      if (numericValue.length <= 10) {
         setNumber(numericValue);
         console.log(numericValue);
      }
   }

   const handlevalidation = async () => {

      if (name.trim() === '') {
         setmessage('Please enter your Name');
         setModalVisible(true);
      }

      if (password.trim() === '') {
         setmessage("Please enter your password");
         setModalVisible(true);
      }

      if (number.trim() === '') {
         setmessage("Please enter your Number");
         setModalVisible(true);
      }

      if (number.length <= 9) {
         setmessage("enter your number 10 number");
         setModalVisible(true);
      };

      if (password.length <= 8) {
         setmessage("enter your password min 8 char");
         setModalVisible(true);
      };

      if (confirmpassword.length <= 8) {
         setmessage("enter your confirm password min 8 char");
         setModalVisible(true);
      };


      if (password !== confirmpassword) {
         setmessage("password and conformpassword not match");
         setModalVisible(true);
         return;
      }


      if (!/\d/.test(password)) {
         setmessage("Password must include at least one number.");
         setModalVisible(true);
         return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
         setmessage(
            "Password must include at least one special character."
         );
         setModalVisible(true);
         return;
      };

      if (!/\d/.test(confirmpassword)) {
         setmessage("confirm password must include at least one number.");
         setModalVisible(true);
         return;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(confirmpassword)) {
         setmessage(
            "confirm password must include at least one special character."
         );
         setModalVisible(true);
         return;
      };

      return true;
   }

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
               <Text style={styles.label}>Name:</Text>
               <TextInput

                  style={[styles.input,
                  focusedField === 'name' && styles.focusedFieldcontainer
                  ]}
                  placeholder="Enter your Name"
                  placeholderTextColor="#888"
                  value={name}
                  onChangeText={value => setName(value)}
                  onFocus={() => { setFocusedField('name') }}
               />
               <Text style={styles.label}>Password:</Text>
               <TextInput
                  style={[styles.input,
                  focusedField === 'password' && styles.focusedFieldcontainer
                  ]}
                  placeholder="Enter your Password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={value => setPassword(value)}
                  onFocus={() => { setFocusedField('password') }}
               />
               <Text style={styles.label}>Confirm password:</Text>
               <TextInput
                  style={[styles.input,
                  focusedField === 'confirmpassword' && styles.focusedFieldcontainer
                  ]}
                  placeholder="Enter your confirm password"
                  placeholderTextColor="#888"
                  value={confirmpassword}
                  onChangeText={value => setconfirmpassword(value)}
                  onFocus={() => { setFocusedField('confirmpassword') }}
               />
               {/* <Text style={styles.output}>Hello, {text || 'Stranger'}!</Text> */}
               <Text style={styles.label}>Number:</Text>
               <TextInput
                  style={[styles.input,
                  focusedField === 'number' && styles.focusedFieldcontainer
                  ]}
                  placeholder="Enter your Number"
                  placeholderTextColor="#888"
                  value={number}
                  onChangeText={handlenumber}
                  onFocus={() => { setFocusedField('number') }}
               />

               <View style={styles.content}>
                  <TouchableOpacity style={styles.roundButton} onPress={handlesubmit}>
                     <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
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
      paddingHorizontal: 121,
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

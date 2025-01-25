import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export const Forgetpassword = () => {
   const [email, setemail] = useState('');
   const [number, setnumber] = useState('');

   const [focusedField, setFocusedField] = useState('');
   return (
      <KeyboardAvoidingView>
         <ScrollView>
            <View style={styles.imageContainer}>
               <Image
                  source={require('../img/Ellipse8.png')}
                  style={styles.imageStyle}
               />
               <View style={styles.textOverlay}>
                  <Text style={styles.overlayText}>Forgot Password</Text>
               </View>
            </View>
            <View style={styles.container}>
               <Text style={styles.text}>
                  Select a method to reset your password: via Email or Phone Number.
               </Text>
               <View>
                  <TouchableOpacity
                     style={[styles.box,
                     focusedField === "email" && styles.inputContainerFocused,
                     ]}
                     onPress={() => { setFocusedField("email") }}>
                     <View style={styles.row}>
                        <Icon name="envelope" size={40} color="black" />
                        <View style={styles.textContainer}>
                           <Text style={styles.headingText}>Email</Text>
                           <Text style={styles.subText}>Send to your email</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={[styles.box,
                     focusedField === "number" && styles.inputContainerFocused,
                     ]}
                     onPress={() => { setFocusedField("number") }}>
                     <View style={styles.row}>
                        <Icon name="phone" size={40} color="black" />
                        <View style={styles.textContainer}>
                           <Text style={styles.headingText}>Phone Number</Text>
                           <Text style={styles.subText}>Send to your Phone number</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               </View>
               <View>
                  <TouchableOpacity style={styles.button}>
                     <Text style={styles.buttontext}>
                        Continue
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,

   },
   imageContainer: {
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 40,
   },
   imageStyle: {
      width: 364,
      height: 200,
      resizeMode: 'contain',
   },
   textOverlay: {
      position: 'absolute',
      top: '70%',
      left: '34%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
   },
   overlayText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
   },
   text: {
      fontSize: 25,
      color: 'gray',
      textAlign: 'center',
   },
   box: {
      backgroundColor: '#EAF5DD',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'lightgray',
      marginTop: 30,
      padding: 14,
   },
   row: {
      flexDirection: 'row',
      alignItems: 'center', // Vertically align icon and text
   },
   textContainer: {
      marginLeft: 20,
   },
   headingText: {
      fontSize: 21,
      color: 'green',
      fontWeight: 'bold',
   },
   subText: {
      fontSize: 16,
      color: 'gray',
   },
   button: {
      marginTop: 60,
      backgroundColor: '#327701',
      height: 60,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
   },
   buttontext: {
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 25,
   },
   inputContainerFocused: {
      borderColor: 'green',
      borderWidth: 2,
   },
});

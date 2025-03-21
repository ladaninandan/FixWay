import React, { useState } from 'react';
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   Image,
   TextInput,
   Dimensions
} from 'react-native';
import Modal from "react-native-modal";
import axios from 'axios';
const { width, height } = Dimensions.get('window');

const Login = (props) => {
   const [email, setemail] = useState('');
   const [password, setPassword] = useState('');
   const [focusedField, setFocusedField] = useState('');


   const Handlesubmit = async () => {
      const isValid = handlevalidation();

      if (isValid) {
         try {
            const response = await axios.post("http://192.168.69.73:5000/user/Login",
               { email, password },
               { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
               console.log("Login successful ", response.data)
               props.navigation.navigate("Home"); // Navigate only if validation passes
            } else {
               console.log("unexpected response", response.data)
            }
         } catch (error) {
            console.log("error during login ", error.response ? error.response.data : error.message);
         }
      }
   };

   const [isModalVisible, setModalVisible] = useState(false);
   const [message, setmessage] = useState("");
   const closeModal = () => {
      setModalVisible(false);
   };

   const handleforgetpassword = () => {
      props.navigation.navigate("Forgetpassword")
   }


   const handlevalidation = () => {

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (email.trim() === '') {
         setmessage("Please enter your Email.");
         setModalVisible(true);
         return;
      }

      if (password.trim() === '') {
         setmessage("Please enter your password.");
         setModalVisible(true);
         return;
      }

      if (!emailPattern.test(email)) {
         setmessage("Please enter a valid email address.");
         setModalVisible(true);
         return;
      }

      if (password.length < 8) {
         setmessage("Password must be at least 8 characters long");
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
      }

      // setmessage("Login Successful!");
      // setModalVisible(true);
      return true;
   }


   const handlename = () => {

   };


   return (
      <View >
         <View style={styles.imageContainer}>
            <Image
               // source={require('../img/Ellipse8.png')} // Replace with your image path
               style={styles.imageStyle}
            />
            <View style={styles.textOverlay}>
               <Text style={styles.overlayText}>Welcome Back</Text>
            </View>
         </View>

         <View style={styles.container}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
               style={[styles.input,
               focusedField === "email" && styles.inputContainerFocused,
               ]}
               placeholder="Enter your Email"
               placeholderTextColor="gray"
               value={email}
               onChangeText={(value) => setemail(value)}
               onFocus={() => { setFocusedField("email") }}
            />
            <Text style={styles.label}>Password:</Text>
            <View style={styles.inputcontainer}>
               {/* <Icon name="lock" size={20} color="gray" style={styles.icon} /> */}
               <TextInput
                  style={[styles.input,
                  focusedField === "password" && styles.inputContainerFocused,
                  ]}
                  placeholder="Enter your Password"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={value => setPassword(value)}
                  onFocus={() => { setFocusedField("password") }}
               />
            </View>
            {/* <Text style={styles.output}>Hello, {text || 'Stranger'}!</Text> */}
            <TouchableOpacity onPress={handleforgetpassword}>
               <Text style={styles.output}>Forget Password?</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.content}>
            <TouchableOpacity style={styles.roundButton} onPress={Handlesubmit}>
               <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.textSign}>
            <Text style={{ fontSize: 15, color: 'gray' }}>
               Don’t have any account ?{' '}
               <TouchableOpacity onPress={() => { props.navigation.navigate("Emailuser") }}>
                  <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign UP</Text>
               </TouchableOpacity>
            </Text>
         </View>

         <View style={styles.google}>
            <TouchableOpacity style={styles.googleButton} onPress={handlename}>
               <Image
                  source={require('../img/googlelogo.png')}
                  style={styles.googlelogo}
               />
               <Text style={{ color: 'Black' }}>Sign with Google</Text>
            </TouchableOpacity>
         </View>

         <View style={styles.Apple}>
            <TouchableOpacity style={styles.AppleButton} onPress={handlename}>
               <Image
                  source={require('../img/Applelogo.png')}
                  style={styles.Applelogo}
               />
               <Text style={{ color: 'Black' }}>Sign with Apple</Text>
            </TouchableOpacity>
         </View>
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
      </View>
   );
};

const styles = StyleSheet.create({
   imageContainer: {
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 60,
   },
   imageStyle: {
      width: width * 1.15,
      height: height * 0.26,
      resizeMode: 'contain',
      backgroundColor: '#327701',
      borderBottomLeftRadius: 200,
      borderBottomRightRadius: 200
   },
   inputContainerFocused: {
      borderColor: 'gray',
      borderWidth: 2,
      elevation: 9
   },
   textOverlay: {
      position: 'absolute', // Positions the text over the image
      top: '70%', // Centers the text vertically
      left: '38%', // Centers the text horizontally
      transform: [{ translateX: -50 }, { translateY: -50 }], // Aligns the text properly in the center
   },
   overlayText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white', // Make the text visible over the image
      textAlign: 'center',
   },
   // sdf
   Apple: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20,
   },
   AppleButton: {
      flexDirection: 'row',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 90,
      backgroundColor: '#f8f9fa',
      paddingVertical: 8,
      borderRadius: 8,
   },
   Applelogo: {
      width: 30,
      height: 40,
      marginRight: 10,
   },
   googlelogo: {
      width: 25,
      height: 25,
      marginRight: 10,
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
      paddingHorizontal: 20,
   },
   label: {
      fontSize: 18,
      marginBottom: 4,
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
      paddingHorizontal: 135,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   input: {
      height: 50,
      borderColor: '#ccc',
      color: 'black',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      marginBottom: 16,
      backgroundColor: '#ECFFDF',
   },
   output: {
      fontSize: 15,
      color: 'red',
      // marginTop: ,
   },
   google: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
   },
   googleButton: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 8,
      marginTop: 20,
      paddingVertical: 15,
      paddingHorizontal: 88,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',

      flexDirection: 'row',
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

export default Login;

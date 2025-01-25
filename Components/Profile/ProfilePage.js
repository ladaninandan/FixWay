import React, { useState } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   Image,
   Alert,
   Platform,
   ActivityIndicator,
   Dimensions,
   Animated,
   SafeAreaView,
   KeyboardAvoidingView,
   ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from 'react-native-paper';
import Modal from "react-native-modal";


const { width, height } = Dimensions.get('window');

const ProfilePage = (props) => {
   const [profilePic, setProfilePic] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleImagePress = async () => {
      // Check for permissions before proceeding
      if (Platform.OS === "android" || Platform.OS === "ios") {
         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
         if (status !== "granted") {
            Alert.alert(
               "Permission Denied",
               "Sorry, we need media library permissions to upload images."
            );
            return;
         }
      }

      // Show an alert to choose between camera or gallery
      Alert.alert(
         "Select Image Source",
         "Would you like to use the camera or choose an image from the gallery?",
         [
            {
               text: "Camera",
               onPress: openCamera,
            },
            {
               text: "Gallery",
               onPress: openGallery,
            },
         ]
      );
   };

   const openCamera = async () => {
      setIsLoading(true);
      try {
         const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
         });

         setIsLoading(false);

         if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedUri = result.assets[0].uri;
            setProfilePic(selectedUri);
         } else {
            Alert.alert("Image capture canceled or invalid");
         }
      } catch (error) {
         setIsLoading(false);
         console.error("Error opening camera: ", error);
         Alert.alert("Error", "Something went wrong while opening the camera.");
      }
   };

   const openGallery = async () => {
      setIsLoading(true);
      try {
         const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
         });

         setIsLoading(false);

         if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedUri = result.assets[0].uri;
            setProfilePic(selectedUri);
         } else {
            Alert.alert("Image selection canceled or invalid");
         }
      } catch (error) {
         setIsLoading(false);
         console.error("Error selecting image: ", error);
         Alert.alert("Error", "Something went wrong while selecting the image.");
      }
   };

   // validations

   const [name, setname] = useState('');
   const [number, setnumber] = useState();
   const [email, setemail] = useState('');
   const [address, setaddress] = useState('');
   const [carname, setcarname] = useState('');

   // model state 
   const [isModalVisible, setModalVisible] = useState(false);
   const [message, setmessage] = useState("");

   const closeModal = () => {
      setModalVisible(false);
   };

   const handleUpdate = () => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (name === '') {
         setmessage("Please enter your name.");
         setModalVisible(true);
         return;
      }

      if (number === '') {
         setmessage("Please enter your number.");
         setModalVisible(true);
         return;
      }

      if (email === '') {
         setmessage("Please enter your email.");
         setModalVisible(true);
         return;
      }

      if (address === '') {
         setmessage("Please enter your address.");
         setModalVisible(true);
         return;
      }

      if (carname === '') {
         setmessage("Please enter your Car Name.");
         setModalVisible(true);
         return;
      }

      if (!emailPattern.test(email)) {
         setmessage("Please enter a valid email address.");
         setModalVisible(true);
         return;
      }

      if (number.length <= 9) {
         setmessage("Please enter a valid number length 10 .");
         setModalVisible(true);
         return;
      }
      // setname(name);
      // setnumber(number);
      // setemail(email);
      // setaddress(address);
      // setcarname(carname);
      // // setProfilePic(null); // Reset profile picture

      Alert.alert("Profile Updated", "Your profile has been updated successfully!");
   }

   return (
      <LinearGradient colors={["#DEEECC", "#F1F7EE", 'white']} style={styles.gradient}>
         <ScrollView showsVerticalScrollIndicator={false}  // Hide vertical scrollbar
            showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar (if needed)
         >
            <KeyboardAvoidingView>
               <SafeAreaView style={styles.container}>
                  <View style={styles.row}>
                     <Text style={styles.header}>Edit Profile</Text>
                  </View>
                  <TouchableOpacity onPress={handleImagePress}>
                     {isLoading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                     ) : profilePic ? (
                        <Image source={{ uri: profilePic }} style={styles.profileImage} />
                     ) : (
                        <View style={styles.placeholder}>
                           <Text style={styles.placeholderText}>Tap to Upload Picture</Text>
                        </View>
                     )}
                  </TouchableOpacity>
                  <View style={styles.namecontainer}>
                     <Text style={styles.text}>{name}</Text>
                     <Text style={styles.text2}>{email}</Text>
                  </View>

                  <View style={styles.inputecontainer}>
                     <TextInput
                        style={[styles.inputfiled, { backgroundColor: '#DEEECC' }]}
                        mode="outlined"
                        label="Enter your Name"
                        placeholder="Type something"
                        outlineColor="black"
                        activeOutlineColor="#143601"
                        textColor="black"
                        placeholderTextColor="gray"
                        left={<TextInput.Icon icon="account" color='#143601' size={35} />}
                        value={name}
                        onChangeText={(value) => setname(value)}
                     />
                     <TextInput
                        style={[styles.inputfiled, { backgroundColor: '#DEEECC' }]}
                        mode="outlined"
                        label="Enter your Number"
                        placeholder="number"
                        outlineColor="black"
                        activeOutlineColor="#143601"
                        textColor="black"
                        placeholderTextColor="gray"
                        left={<TextInput.Icon icon="phone" color='#143601' size={35} />}
                        value={number}
                        onChangeText={(value) => setnumber(value)}
                        maxLength={10}
                        keyboardType='phone-pad'
                     />
                     <TextInput
                        style={[styles.inputfiled, { backgroundColor: '#DEEECC' }]}
                        mode="outlined"
                        label="Enter your Email"
                        placeholder="Email"
                        outlineColor="black"
                        activeOutlineColor="#143601"
                        textColor="black"
                        placeholderTextColor="gray"
                        left={<TextInput.Icon icon="email" color='#143601' size={35} />}
                        value={email}
                        onChangeText={(value) => setemail(value)}
                     />
                     <TextInput
                        style={[styles.inputfiled, { backgroundColor: '#DEEECC' }]}
                        mode="outlined"
                        label="Enter your Address"
                        placeholder="Address"
                        outlineColor="black"
                        activeOutlineColor="#143601"
                        textColor="black"
                        placeholderTextColor="gray"
                        multiline={true}
                        numberOfLines={4}
                        left={<TextInput.Icon icon="home" color='#143601' size={35} />}
                        value={address}
                        onChangeText={(value) => setaddress(value)}
                     />
                     <TextInput
                        style={[styles.inputfiled, { backgroundColor: '#DEEECC' }]}
                        mode="outlined"
                        label="Enter your car name"
                        placeholder="Email"
                        outlineColor="black"
                        activeOutlineColor="#143601"
                        textColor="black"
                        placeholderTextColor="gray"
                        left={<TextInput.Icon icon="car" color='#143601' size={35} />}
                        value={carname}
                        onChangeText={(value) => setcarname(value)}
                     />

                     <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                        <Text style={styles.buttontext}>Update</Text>
                     </TouchableOpacity>
                  </View>
               </SafeAreaView>
            </KeyboardAvoidingView>
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
      </LinearGradient >
   );
};

export default ProfilePage;

const styles = StyleSheet.create({
   gradient: {
      flex: 1,
      alignItems: "center",
   },
   container: {
      marginTop: height * 0.05,
      marginHorizontal: 20,
      alignItems: "center",
   },
   profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 5,
      borderColor: "#F9D754",
      elevation: 50, // For Android shadow
      shadowColor: "#F9D754",  // Color of the shadow
      shadowOffset: { width: 10, height: 10 },  // Position of the shadow
      shadowOpacity: 0.25,  // Shadow opacity for iOS
      shadowRadius: 5,  // Shadow blur radius for iOS
   },
   placeholder: {
      width: 150,
      height: 150,
      borderRadius: 75,
      backgroundColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
   },
   placeholderText: {
      color: "#666",
      fontSize: 16,
   },
   header: {
      fontSize: 35,
      fontWeight: "600",
      textAlign: "center", // Centers text within its container
      flex: 1,
      marginLeft: 20, // Adjust margin for the left side
   },
   row: {
      marginTop: 10,
      marginBottom: 19,
      flexDirection: "row", // Align items in a row
      justifyContent: "space-between", // Space the text and icon
      alignItems: "center", // Vertically align text and icon
      width: "100%",
      paddingHorizontal: 10, // Add horizontal padding to avoid edge touching
   },
   namecontainer: {
      marginTop: 20,
      alignItems: 'center'
   },
   text: {
      fontSize: 20,
      fontWeight: 600
   },
   text2: {
      fontSize: 15,
      fontWeight: 500
   },

   inputecontainer: {
      top: 20,
      backgroundColor: '#F1F7EE',
      width: width * 0.87,
      height: height * 0.58,
      borderRadius: 8,
      elevation: 9
   },
   inputfiled: {
      top: 10,
      marginTop: 10,
      marginHorizontal: 10,
   },
   button: {
      top: 55,
      backgroundColor: '#538D22',
      height: 50,
      marginHorizontal: 10,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      borderColor: 'black',
      borderWidth: 0.02
   },
   buttontext: {
      textAlign: 'center',
      color: 'white',
      fontSize: 23,
      fontWeight: '600'
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
});

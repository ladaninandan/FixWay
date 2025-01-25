import React from "react"
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";


const Beforlogin = (props) => {
   return (
      <View style={styles.container} >

         <Image
            source={require('../img/logo2.png')} // Replace with your image path
            style={styles.logo}
         />
         <Image
            source={require('../img/Groupround.png')} // Replace with your image path
            style={styles.roundImg}
         />
         <View style={styles.textContainer}>
            <Text style={styles.text}> Simplifying Solutions</Text>
            <Text style={styles.text}> Anytime </Text>
            <Text style={styles.text}> Anywhere </Text>
         </View>
         <View style={styles.buttons}>
            <TouchableOpacity style={styles.button1}>
               <Text style={styles.button1text} >Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => { props.navigation.navigate("Login") }} >
               <Text style={styles.button1text2} >Sign In</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: -120,
      paddingHorizontal: 20,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   logo: {
      marginTop: 50,
      width: 320,    // Adjust the width to your desired size
      height: 150,   // Adjust the height to your desired size
      resizeMode: 'contain',
      alignItems: "center",
      justifyContent: "center",
   },
   roundImg: {
      // marginTop: 5,
      width: 260,
      height: 280,

   },
   textContainer: {
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      color: "black",
      fontSize: 35,
      fontWeight: "500",
      alignItems: "center",
   },
   buttons: {
      paddingHorizontal: 10,
   },
   button1: {
      paddingHorizontal: 100,
      backgroundColor: "#327701",
      borderRadius: 8,
      paddingVertical: 10,
      marginTop: 20,
      justifyContent: "center",  // Centers content vertically
      alignItems: "center",
   },
   button1text: {
      fontSize: 25,
      color: "#BFD7A3"

   },
   button2: {
      backgroundColor: "#BFD7A3",
      paddingHorizontal: 100,
      borderRadius: 8,
      paddingVertical: 10,
      marginTop: 20,
      justifyContent: "center",  // Centers content vertically
      alignItems: "center",
   },
   button1text2: {
      fontSize: 25,
      color: "#327701",
   },


})



export default Beforlogin;
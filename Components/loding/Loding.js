import React, { useEffect, useRef } from "react";
import {
   View,
   Text,
   StyleSheet,
   ImageBackground,
   Animated,
   Easing,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Import FontAwesome
import Pin from "react-native-vector-icons/MaterialIcons";
// Dotted Line Component
const DottedLine = ({ position }) => {
   const dots = Array.from({ length: 50 }); // Adjust the number of dots

   return (
      <Animated.View
         style={[
            styles.dottedLineContainer,
            { transform: [{ translateX: position }] },
         ]}
      >
         {dots.map((_, index) => (
            <View key={index} style={styles.dot} />
         ))}
      </Animated.View>
   );
};

const LoadingScreen = () => {
   const jumpAnimation = useRef(new Animated.Value(0)).current;
   const carPosition = useRef(new Animated.Value(-200)).current;
   const roadLinePosition = useRef(new Animated.Value(0)).current; // To animate the dotted line


   // Jumping animation for "FixWay"
   useEffect(() => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(jumpAnimation, {
               toValue: -10,
               duration: 500,
               easing: Easing.inOut(Easing.quad),
               useNativeDriver: true,
            }),
            Animated.timing(jumpAnimation, {
               toValue: 0,
               duration: 500,
               easing: Easing.inOut(Easing.quad),
               useNativeDriver: true,
            }),
         ])
      ).start();
   }, []);

   // Car moving animation (Faster speed)
   useEffect(() => {
      Animated.loop(
         Animated.timing(carPosition, {
            toValue: 300,
            duration: 1000, // Speed up the car by reducing duration
            easing: Easing.linear,
            useNativeDriver: true,
         })
      ).start();
   }, []);

   // Dotted line moving animation
   useEffect(() => {
      Animated.loop(
         Animated.timing(roadLinePosition, {
            toValue: -300, // Move the line to the right
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
         })
      ).start();
   }, []);

   return (
      <View style={styles.container}>
         {/* Background with opacity */}
         <View style={styles.backgroundContainer}>
            <ImageBackground
               source={require("../../img/lodinimg2.jpeg")} // Background image
               style={styles.backgroundImage}
               resizeMode="cover"
            />
         </View>

         {/* Content on top of background */}
         <View style={styles.contentContainer}>




            {/* Animated FixWay Text */}
            {/* <Pin name='location-pin' size={60} style={styles.pinicon} /> */}
            <Animated.Text
               style={[
                  styles.logoText,
                  { transform: [{ translateY: jumpAnimation }] },
               ]}
            >
               <Text style={{ color: 'darkgreen', fontSize: 70 }}>Fix</Text><Text>Way</Text>
            </Animated.Text>

            {/* Road and Car Animation */}
            <View style={styles.roadContainer}>
               <View style={styles.road}>
                  {/* Animated Dotted Line */}
                  <DottedLine position={roadLinePosition} />
               </View>
               <Animated.View
                  style={[
                     styles.carContainer,
                     { transform: [{ translateX: carPosition }] },
                  ]}
               >
                  <Text>
                     <Icon name="car-side" size={60} color="green" /> {/* Car Icon */}
                  </Text>
               </Animated.View>
            </View>

            {/* Fetching Location Text */}
            <Text style={styles.loadingText}>Fetching your current location...</Text>
         </View>
      </View>
   );
};

// Styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   backgroundContainer: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.2, // Only background opacity
   },
   backgroundImage: {
      flex: 1,
   },
   contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   logoText: {
      fontSize: 50,
      fontWeight: "bold",
      color: "#000",
      marginBottom: 20,
   },
   roadContainer: {
      width: "100%",
      height: 150,
      position: "absolute",
      bottom: 100,
      justifyContent: "center",
      alignItems: "center",
   },
   road: {
      width: "100%",
      height: 15,
      backgroundColor: "#444",
      position: "relative",
      overflow: "hidden",
      bottom: 100
   },
   dottedLineContainer: {
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "200%", // Extend for scrolling animation
   },
   dot: {
      top: 5.5,
      width: 10,
      height: 3,
      backgroundColor: "#fff",
      borderRadius: 2.5,
      marginHorizontal: 5,
   },
   carContainer: {
      position: "absolute",
      bottom: 175,
   },
   loadingText: {
      marginTop: 320,
      fontSize: 20,
      color: "black",
      fontWeight: 500
   },
   pinicon: {
      bottom: 10
   }
});

export default LoadingScreen;

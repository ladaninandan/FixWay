import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Animated, {
   useSharedValue,
   useAnimatedStyle,
   withTiming,
   withDelay,
   Easing
} from "react-native-reanimated";

const Beforlogin = (props) => {
   // Animation values
   const fadeIn = useSharedValue(0);
   const scaleLogo = useSharedValue(0.5);
   const rotateImage = useSharedValue(180);
   const slideUp = useSharedValue(50);
   const fadeInText1 = useSharedValue(0);
   const fadeInText2 = useSharedValue(0);
   const fadeInText3 = useSharedValue(0);

   useEffect(() => {
      fadeIn.value = withTiming(1, { duration: 1000 });
      scaleLogo.value = withTiming(1, { duration: 800, easing: Easing.bounce });
      rotateImage.value = withTiming(0, { duration: 1200, easing: Easing.out(Easing.exp) });
      slideUp.value = withTiming(0, { duration: 1000 });

      // Staggered text animations
      fadeInText1.value = withDelay(500, withTiming(1, { duration: 800 }));
      fadeInText2.value = withDelay(1000, withTiming(1, { duration: 800 }));
      fadeInText3.value = withDelay(1500, withTiming(1, { duration: 800 }));
   }, []);

   // Animated styles
   const fadeInStyle = useAnimatedStyle(() => ({
      opacity: fadeIn.value,
   }));

   const scaleLogoStyle = useAnimatedStyle(() => ({
      opacity: fadeIn.value,
      transform: [{ scale: scaleLogo.value }],
   }));

   const rotateImageStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotateImage.value}deg` }],
   }));

   const slideUpStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: slideUp.value }],
   }));

   const fadeInTextStyle1 = useAnimatedStyle(() => ({
      opacity: fadeInText1.value,
   }));

   const fadeInTextStyle2 = useAnimatedStyle(() => ({
      opacity: fadeInText2.value,
   }));

   const fadeInTextStyle3 = useAnimatedStyle(() => ({
      opacity: fadeInText3.value,
   }));

   return (
      <View style={styles.container}>
         <Animated.Image
            source={require('../img/logo2.png')}
            style={[styles.logo, scaleLogoStyle]}
         />
         <Animated.Image
            source={require('../img/Groupround.png')}
            style={[styles.roundImg, rotateImageStyle]}
         />
         <View style={styles.textContainer}>
            <Animated.Text style={[styles.text, fadeInTextStyle1]}> Simplifying Solutions</Animated.Text>
            <Animated.Text style={[styles.text, fadeInTextStyle2]}> Anytime </Animated.Text>
            <Animated.Text style={[styles.text, fadeInTextStyle3]}> Anywhere </Animated.Text>
         </View>
         <Animated.View style={[styles.buttons, slideUpStyle]}>
            <TouchableOpacity style={styles.button1}>
               <Text style={styles.button1text}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => { props.navigation.navigate("Login") }}>
               <Text style={styles.button1text2}>Sign In</Text>
            </TouchableOpacity>
         </Animated.View>
      </View>
   );
};

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
      width: 320,
      height: 150,
      resizeMode: 'contain',
      alignItems: "center",
      justifyContent: "center",
   },
   roundImg: {
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
      justifyContent: "center",
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
      justifyContent: "center",
      alignItems: "center",
   },
   button1text2: {
      fontSize: 25,
      color: "#327701",
   },
});

export default Beforlogin;

import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Prevent auto-hiding
SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ onAnimationEnd }) => {
   useEffect(() => {
      const hideSplash = async () => {
         await new Promise(resolve => setTimeout(resolve, 500)); // 1-second delay
         await SplashScreen.hideAsync();
         onAnimationEnd();
      };
      hideSplash();
   }, []);

   return (
      <View style={styles.container}>
         <Image source={require("../img/logo2.png")} style={styles.logo} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
   },
   logo: {
      width: 120,
      height: 100,
      marginBottom: 20,
   },
});

export default SplashScreenComponent;

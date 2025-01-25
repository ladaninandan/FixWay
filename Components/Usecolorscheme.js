import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

const AutoThemeApp = () => {
   // Detect the system's color scheme (dark or light)
   const systemTheme = useColorScheme();

   const isDarkMode = systemTheme === "dark";

   // Apply styles based on the system theme
   const themeStyles = isDarkMode ? styles.darkTheme : styles.lightTheme;
   const textStyles = isDarkMode ? styles.darkText : styles.lightText;

   return (
      <View style={[styles.container, themeStyles]}>
         <Text style={[styles.text, textStyles]}>
            {isDarkMode ? "Dark Mode Active" : "Light Mode Active"}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      fontSize: 24,
      fontWeight: "bold",
   },
   // Light Theme Styles
   lightTheme: {
      backgroundColor: "white",
   },
   lightText: {
      color: "black",
   },
   // Dark Theme Styles
   darkTheme: {
      backgroundColor: "black",
   },
   darkText: {
      color: "white",
   },
});

export default AutoThemeApp;

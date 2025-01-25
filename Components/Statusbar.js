import React, { useState } from "react";
import { View, StatusBar, Text, TouchableOpacity, StyleSheet } from 'react-native';


const Statusbar = () => {

   const [hidde, sethidde] = useState(false);
   const [style, setstyle] = useState('dark-content');
   const [backroundcolor, setbackroundcolor] = useState('lightgreen');
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerText}>This is status bar code  controle using state</Text>
         </View>
         <StatusBar
            backgroundColor={backroundcolor}
            barStyle={style}
            hidden={hidde}
         />
         <View style={styles.buttoncontainer}>
            <TouchableOpacity style={styles.button1} onPress={() => { sethidde(!hidde) }} >
               <Text style={styles.text}>
                  Hide
               </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => { setbackroundcolor(backroundcolor === 'lightgreen' ? 'darkorange' : 'lightgreen'), setstyle(backroundcolor === 'lightgreen' ? 'light-content' : 'dark-content') }}  >
               <Text style={styles.text}>
                  style status Bar
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,
   },
   header: {
      backgroundColor: 'black',
      justifyContent: 'flex-start',
      marginTop: 10,
      padding: 7
   },
   headerText: {
      color: 'white',
      fontSize: 17,
   },
   buttoncontainer: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
   },
   button1: {
      backgroundColor: 'skyblue',
      height: 50,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginTop: 10,
   },
   button2: {
      backgroundColor: 'lightgray',
      height: 50,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginTop: 10,
   },
   text: {
      fontSize: 25,
      fontWeight: '600',
   }
});

export default Statusbar;
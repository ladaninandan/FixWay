import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Loding = () => {
   const [show, setShow] = useState(true);
   const text = "Hide";


   const handleclick = () => {
      setShow(true);

      setTimeout(() => {
         setShow(false);
      }, 5000);
   }



   return (
      <View style={styles.main}>
         <ActivityIndicator color={'blue'} size={90} animating={show} />
         <TouchableOpacity style={styles.button} onPress={handleclick}>
            <Text style={styles.text}>
               {show ? text : "Unhide"}
            </Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      // backgroundColor: 'red',
   },
   button: {
      backgroundColor: 'black',
      borderRadius: 8,
      width: 200,         // Fixed width
      height: 50,        // Fixed height
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      marginTop: 20,
   },
   text: {
      color: 'white',
      fontSize: 18,
      elevation: 5,

   }
});

export default Loding;

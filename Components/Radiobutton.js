import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Radiobutton = () => {

   const [button, setbutton] = useState(true);

   return (
      <View style={styles.container}>
         <View>
            <TouchableOpacity onPress={() => { setbutton(true) }}>
               <View style={styles.wapper}>
                  <View style={styles.radio}>
                     {
                        button == true ? <View style={styles.round}></View> : null
                     }
                  </View>
                  <Text style={styles.text}>male</Text>
               </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { setbutton(false) }}>
               <View style={styles.wapper}>
                  <View style={styles.radio}>
                     {
                        button == false ? <View style={styles.round}></View> : null
                     }
                  </View>
                  <Text style={styles.text}>female</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      // padding: 60,
      flex: 1,
      backgroundColor: "blue",
      textAlign: 'center',
      justifyContent: 'center',
   },
   text: {
      margin: 3,
      fontSize: 30
   },
   radio: {
      borderColor: 'red',
      borderWidth: 3,
      height: 30,
      width: 30,
      borderRadius: 30,
   },
   wapper: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   round: {
      width: 20,
      height: 20,
      backgroundColor: 'red',
      borderRadius: 20,
      margin: 2
   }
})

export default Radiobutton;
import React from "react";

import { View, Text, Platform, StyleSheet } from 'react-native';


export const Platformchack = () => {

   return (
      <View style={styles.container}>
         <Text style={styles.header}>
            PlatFoem chack os is android or ios
         </Text>
         <View style={styles.innerview}>
            <Text style={styles.innertext}>
               Your Platform is {Platform.OS}
            </Text>
            {
               Platform.OS === 'android' ? <View style={{ height: 100, width: 100, backgroundColor: 'green' }}></View> : <View style={{ height: 100, width: 100, backgroundColor: 'red' }}></View>
            }
            <View>
               <Text style={styles.boxtext}>
                  hi os is {Platform.OS} change color
               </Text>
               <Text>
                  {JSON.stringify(Platform.constants)}
               </Text>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,
      // justifyContent: 'center',
      // alignItems: 'center',
   },
   header: {
      backgroundColor: 'gray',
      marginTop: 10,
      padding: 10,
      textAlign: 'center',
      color: "white",
      fontSize: 20,
   },
   innerview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   innertext: {
      fontSize: 20,
   },
   boxtext: {
      color: Platform.OS === "android" ? 'blue' : 'red'
   }

})
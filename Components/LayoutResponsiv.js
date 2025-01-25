import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


const LayoutResponsiv = () => {
   return (
      <View style={styles.Container}>
         <View style={styles.box1}>
            <View style={styles.innerbox1}></View>
            <View style={styles.innerbox2}></View>
            <View style={styles.innerbox3}></View>
         </View>
         <View style={styles.box2}></View>
         <View style={styles.box3}>
         </View>
      </View>
   )
};

const styles = StyleSheet.create({
   Container: {
      flex: 1,
   },
   box1: {
      flex: 2,
      backgroundColor: 'black',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   box2: {
      flex: 1,
      backgroundColor: 'red',
   },
   box3: {
      flex: 1,
      width: 1500,
      height: 1500,
      backgroundColor: "green"
   },
   innerbox1: {
      margin: 20,
      flex: 1,
      backgroundColor: 'yellow',
   },
   innerbox2: {
      margin: 20,
      flex: 1,
      backgroundColor: "orange",
   },
   innerbox3: {
      margin: 20,
      flex: 2,
      backgroundColor: "blue",
   }

});

export default LayoutResponsiv;
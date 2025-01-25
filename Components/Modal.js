import React, { useState } from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet } from 'react-native'

const ExampleModal = () => {

   const [close, setclose] = useState(false);

   return (
      <View style={styles.container}>
         <Text>This is Modal Example </Text>

         <Modal transparent={true} visible={close} animationType='fade'
         // slide
         >
            <View style={styles.centerview} >
               <View style={styles.centerbox}>
                  <Text style={styles.textcose}>Title</Text>
                  <Text style={styles.body}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt officia consequuntur ea veritatis nihil animi ratione, pariatur nostrum qui repudiandae? </Text>
                  <TouchableOpacity style={styles.buttonclose} onPress={() => { setclose(false) }}>
                     <Text style={styles.textopen} >
                        close
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
         <View style={styles.buttonview}>
            <TouchableOpacity style={styles.buttonopen} onPress={() => { setclose(true) }}>
               <Text style={styles.textopen}>
                  Open
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
      alignItems: 'center',
      // justifyContent: 'center',
   },
   buttonopen: {
      backgroundColor: 'skyblue',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
   },
   buttonclose: {
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 190,
      borderRadius: 5,
      marginHorizontal: 60,
      marginTop: 30,
   },
   textopen: {
      fontSize: 25,
      fontWeight: '700',
   },
   buttonview: {
      flex: 1,
      justifyContent: 'flex-end',
      width: '100%', height: 30,
      paddingBottom: 20,
   },
   centerview: {
      flex: 1,
      // backgroundColor: 'black',
      marginHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   centerbox: {
      borderRadius: 8,
      width: '100%',
      height: 190,
      backgroundColor: 'skyblue',
      padding: 5,
   },
   textcose: {
      fontSize: 30,
      textAlign: 'center'
   },
   body: {
      textAlign: 'center',
      paddingTop: 10
   }
})
export default ExampleModal;
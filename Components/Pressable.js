import React from "react";
import { Text, Pressable, View, StyleSheet } from 'react-native';


const PressableExample = () => {
   return (
      <View style={styles.container}>
         <Text>on Press Event all console.log show</Text>
         <Pressable style={styles.PressableExample}
            onPress={() => { console.warn("on press") }}
            onPressIn={() => { console.warn("on press in") }}
            onPressOut={() => { console.log("on press out") }}
            onLongPress={() => { console.warn("On long press") }}
         >
            <Text style={styles.text}>
               Pressable
            </Text>
         </Pressable>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center'
   },
   PressableExample: {
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      height: 60,
      width: '100%'
   },
   text: {
      fontSize: 26,
      fontWeight: '700'
   }

})

export default PressableExample;
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";


const Gride = () => {
   return (
      <View style={{ padding: 10 }}>
         <Text style={{ fontSize: 31 }}>Grid whith ststic Data</Text>

         <ScrollView >
            <View style={styles.itemscontainer}>


               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>

               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>
               <Text style={styles.items}>sam</Text>

            </View>
         </ScrollView>
      </View >
   );
};

const styles = StyleSheet.create({
   itemscontainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      // justifyContent: "space-between",
   },
   items: {
      marginHorizontal: 6,
      backgroundColor: 'lightblue',
      padding: 20,
      width: 100,
      height: 100,
      marginVertical: 10,
      borderRadius: 5,
      textAlign: 'center',
      textAlignVertical: 'center'
   }
})

export default Gride;
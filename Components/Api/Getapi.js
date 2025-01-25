import React, { useEffect, useState } from "react";
import {
   View,
   Text,
   TouchableOpacity,
   FlatList,
   StyleSheet,
   Dimensions,
   ActivityIndicator,
} from "react-native";

export const Getapi = () => {
   const [data, setdata] = useState([]);
   const [expandedIds, setExpandedIds] = useState([]); // State to manage expanded items
   const [loding, setloding] = useState(true);




   const handlegetapi = async () => {
      try {
         const url = "https://jsonplaceholder.typicode.com/posts";
         let result = await fetch(url);
         result = await result.json();
         setdata(result);
      } catch (error) {
         console.log(error);
      } finally {
         setloding(false);
      }
   };

   useEffect(() => {
      handlegetapi();
   }, []);


   const toggleExpand = (id) => {
      setExpandedIds((prevExpandedIds) =>
         prevExpandedIds.includes(id)
            ? prevExpandedIds.filter((item) => item !== id)
            : [...prevExpandedIds, id]
      );
   };



   if (loding) {
      return <ActivityIndicator size={90} color="#0000ff" style={styles.loader} />;
   }

   return (
      <View style={styles.container}>

         <Text style={styles.heading}>API Example</Text>
         <View style={styles.listContainer}>
            <FlatList
               data={data}
               keyExtractor={(item) => item.id.toString()}
               renderItem={({ item }) => (
                  <View style={styles.list}>
                     <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                        <Text style={styles.titleText}>Title: {item.title}</Text>
                     </TouchableOpacity>

                     {expandedIds.includes(item.id) && (
                        <View style={styles.bodyContainer}>
                           <Text style={styles.text}>Body: {item.body}</Text>
                        </View>
                     )}
                  </View>
               )}
            />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: "#f4f4f4",
   },

   heading: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 10,
   },

   listContainer: {
      paddingVertical: 10,
   },

   list: {
      backgroundColor: "lightblue",
      marginVertical: 5,
      padding: 15,
      borderRadius: 10,
      elevation: 5,
   },

   titleText: {
      fontSize: 15,
      fontWeight: "bold",
      color: "Black",
   },

   bodyContainer: {
      paddingTop: 10,
      paddingLeft: 15,
   },

   text: {
      fontSize: 16,
      color: "black",
   },
   loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
});

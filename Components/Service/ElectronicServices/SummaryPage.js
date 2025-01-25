import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Coins from 'react-native-vector-icons/FontAwesome5';
import CornerRight from 'react-native-vector-icons/Feather';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SummaryPage = () => {
   const [count, setCount] = useState(1);
   const [isChecked, setChecked] = useState(false);
   const [cart, setCart] = useState([]);
   const [total, setTotal] = useState();

   const priceQuantity = cart.map((item) => item.price * count);

   const increment = () => {
      setCount(count + 1);
      setTotal(priceQuantity);
   };

   const decrement = () => {
      if (count > 1) {
         setCount(count - 1);
         setTotal(priceQuantity);
      }
   };

   const handleremove = async (item) => {
      try {
         const updateCart = cart.filter(cartItem => cartItem.id !== item.id);
         setCart(updateCart)
         await AsyncStorage.setItem('Cart_items', JSON.stringify(updateCart));
         console.log('Item removed:', item.id);
      } catch (error) {
         console.log("error", error);
      }
   }
   useEffect(() => {
      const fetchData = async () => {
         try {
            const result = await AsyncStorage.getItem('Cart_items');
            if (result !== null) {
               setCart(JSON.parse(result)); // Parse the stored JSON string back into an array
            }
         } catch (error) {
            console.log('error', error);
         }
      };
      fetchData();
   }, []);



   return (
      <View style={styles.maincontainer}>
         <View style={styles.header}>
            <View style={styles.headerrow}>
               <Text style={styles.headerText}>Summary</Text>
            </View>
         </View>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
               <View style={styles.row}>
                  <Text style={styles.titlemafirstrow}>You are saving total 100 on this order</Text>
                  <Coins name='coins' size={30} style={styles.icon} />
               </View>
               {cart.map((item, index) => (
                  <View key={index} style={styles.row2}>
                     <Text style={styles.serviceText}>{item.serviceName}</Text>

                     {/* Counter */}
                     <View style={styles.counterContainer}>
                        <TouchableOpacity onPress={decrement} style={styles.button}>
                           <Text style={styles.buttonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.count}>{count}</Text>
                        <TouchableOpacity onPress={increment} style={styles.button}>
                           <Text style={styles.buttonText}>+</Text>
                        </TouchableOpacity>
                     </View>

                     {/* Price Section */}
                     <View style={styles.priceContainer}>
                        <Text style={styles.newPrice}>₹{total} </Text>
                        <Text style={styles.oldPrice}>₹{item.price + 100}</Text>
                     </View>
                     <TouchableOpacity style={{ backgroundColor: 'red', marginLeft: 10, padding: 1, borderRadius: 10 }} onPress={() => handleremove(item)}>
                        <Delete name='delete' color='white' size={30} />
                     </TouchableOpacity>
                  </View>
               ))}
               <View style={styles.row3}>
                  <CornerRight name='corner-up-right' size={30} />
                  <Text style={styles.title2}>FixWay</Text>
                  <Text>Protection on this booking</Text>
               </View>

               <View style={styles.rowContainer}>
                  <Text style={styles.title}>Service Preference</Text>
                  <View style={styles.row4}>
                     <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                     />
                     <Text style={styles.subtext}>Avoid calling before reaching the location </Text>
                  </View>
               </View>

               <View style={styles.rowContainer}>
                  <Text style={styles.patmentheader}>Payment summary</Text>
                  <View style={styles.row5}>
                     <Text style={styles.label}>Item total</Text>
                     <View style={styles.paymentContainer}>
                        <Text style={styles.strikeThrough}>₹1,298</Text>
                        <Text style={styles.finalPrice}>₹1,198</Text>
                     </View>
                  </View>
                  <View style={styles.row5}>
                     <Text style={styles.label}>Taxes and Fee</Text>
                     <Text style={styles.price}>₹89</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row5}>
                     <Text style={styles.totalLabel}>Total amount</Text>
                     <Text style={styles.totalPrice}>₹1,287</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row5}>
                     <Text style={styles.finalLabel}>Amount to pay</Text>
                     <Text style={styles.finalPrice}>₹1,287</Text>
                  </View>
               </View>

               <View style={styles.policyContainer}>
                  <Text style={styles.policytitle}>Cancellation policy</Text>
                  <Text style={styles.policytext}>Free cancellations if done more than 12hrs before the service or if a professional isn't assigned. A fee will be charged otherwise.</Text>
                  <Text style={styles.readmore}>Read full policy</Text>
               </View>
               <TouchableOpacity style={styles.mainbutton}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Add address and slot</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   maincontainer: {
      flex: 1
   },
   container: {
      marginHorizontal: 10
   },
   header: {
      height: 50,
      backgroundColor: '#143601',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50
   },
   headerrow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   headerText: {
      color: 'white',
      fontSize: 25,
      textAlign: 'center',
      top: 7,
      fontWeight: 'bold'
   },
   row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'white',
      elevation: 4,
      borderRadius: 8
   },
   title: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   titlemafirstrow: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "#245501"
   },
   icon: {
      marginLeft: 10,
      color: 'goldenrod',
   },
   row2: {
      height: 80,
      marginTop: 14,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'white',
      elevation: 4,
      borderRadius: 8
   },
   serviceText: {
      flex: 1,
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
   },
   counterContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#d1c4e9",
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 2,
      backgroundColor: "#f3e5f5",
   },
   button: {
      paddingHorizontal: 8,
      paddingVertical: 5,
   },
   buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#673ab7",
   },
   count: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#673ab7",
      marginHorizontal: 5,
   },
   priceContainer: {
      alignItems: "flex-end",
      marginLeft: 10,
   },
   newPrice: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
   },
   oldPrice: {
      fontSize: 14,
      color: "#999",
      textDecorationLine: "line-through",
   },
   row3: {
      height: 50,
      marginTop: 6,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: 'white',
      elevation: 4,
      borderRadius: 8
   },
   title2: {
      right: 20,
      fontSize: 20,
      fontWeight: 'bold',
      color: "#245501"
   },
   rowContainer: {
      marginTop: 3,
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   row4: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingBlock: 7
   },
   subtext: {
      fontSize: 16,
      color: "#333",
      marginLeft: 10,
   },
   patmentheader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
   },
   row5: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
   },
   label: {
      fontSize: 16,
      color: '#333',
   },
   paymentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   strikeThrough: {
      fontSize: 16,
      color: '#888',
      textDecorationLine: 'line-through',
      marginRight: 8,
   },
   finalPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
   },
   price: {
      fontSize: 16,
      color: '#000',
   },
   divider: {
      height: 1,
      backgroundColor: '#ddd',
      marginVertical: 8,
   },
   totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
   },
   totalPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
   },
   finalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 8,
   },
   policyContainer: {
      marginTop: 10,
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 2,
      shadowOpacity: 0.1,
      shadowRadius: 4,
   },
   policytitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
   },
   policytext: {
      fontSize: 16,
      color: '#333',
   },
   readmore: {
      fontSize: 16,
      color: '#245501',
      marginTop: 8,
      borderBottomColor: '#245501',
      borderBottomWidth: 1,
   },
   mainbutton: {
      height: 50,
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 8,
      backgroundColor: '#245501',
      justifyContent: 'center',
      alignItems: 'center',
   }
});

export default SummaryPage;
import React, { useEffect, useRef, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   Animated,
   Image,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import Icon from "react-native-vector-icons/Entypo";

const { height, width } = Dimensions.get('window');

const CartPage = () => {
   const bounceAnim = useRef(new Animated.Value(0)).current;
   const [selectedAction, setSelectedAction] = useState(null);
   const actionScale = useRef(new Animated.Value(1)).current; // For button animation
   const scrollViewRef = useRef(null);

   useEffect(() => {
      Animated.spring(bounceAnim, {
         toValue: 1,
         friction: 20,
         tension: 160,
         useNativeDriver: true,
      }).start();
   }, []);

   const handleActionClick = (action) => {
      setSelectedAction(action);

      // Animate the button scale
      Animated.sequence([
         Animated.timing(actionScale, {
            toValue: 1.2,
            duration: 100,
            useNativeDriver: true,
         }),
         Animated.timing(actionScale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
         }),
      ]).start();

      // Scroll smoothly to the related section
      if (scrollViewRef.current) {
         scrollViewRef.current.scrollTo({
            y: 500, // Adjust this to match the section height
            animated: true,
         });
      }
   };

   const renderActionDetails = () => {
      switch (selectedAction) {
         case 'Action 1':
            return <Text style={styles.detailsText}>Details for Action 1: Learn about Product Discounts.</Text>;
         case 'Action 2':
            return <Text style={styles.detailsText}>Details for Action 2: Check Product Availability.</Text>;
         case 'Action 3':
            return <Text style={styles.detailsText}>Details for Action 3: Explore Trending Products.</Text>;
         default:
            return <Text style={styles.detailsText}>Click an action to see details.</Text>;
      }
   };

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <View style={styles.innerheader}>
               <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
                  <Icon name="shopping-cart" color="#F9D754" size={30} style={styles.icon} />
               </Animated.View>
               <Text style={styles.headertext}>Cart</Text>
            </View>
         </View>
         <ScrollView ref={scrollViewRef} contentContainerStyle={styles.maincontainer}>
            <View style={styles.row}>
               <View style={styles.imgcontainer}>
                  <Image
                     style={styles.image}
                     source={require('../../img/drop.png')}
                  />
               </View>

               <View>
                  <Text style={styles.text}>Item Name</Text>
                  <Text style={styles.text}>Item Details</Text>
               </View>
            </View>

            <View style={styles.list}>
               <Text>Product 1</Text>
               <Text>Product 2</Text>
               <Text>Product 3</Text>
               <Text>Product 4</Text>
               <Text>Product 5</Text>
            </View>

            <View style={styles.secondlist}>
               <View style={styles.navigates}>
                  {['Action 1', 'Action 2', 'Action 3'].map((action, index) => (
                     <TouchableOpacity
                        key={index}
                        onPress={() => handleActionClick(action)}
                     >
                        <Animated.View
                           style={[
                              styles.actionButton,
                              selectedAction === action && styles.selectedActionButton,
                              selectedAction === action && { transform: [{ scale: actionScale }] },
                           ]}
                        >
                           <Text style={styles.actionText}>{action}</Text>
                        </Animated.View>
                     </TouchableOpacity>
                  ))}
               </View>
               <View style={styles.actionDetails}>
                  {renderActionDetails()}
               </View>
            </View>
         </ScrollView>
         <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default CartPage;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
   },
   header: {
      backgroundColor: '#143601',
      height: 60,
      borderBottomLeftRadius: 60,
      borderBottomRightRadius: 60,
   },
   innerheader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
   },
   headertext: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 10,
   },
   icon: {
      marginRight: 5,
   },
   maincontainer: {
      paddingHorizontal: 20,
      paddingBottom: 100, // Space for button
   },
   row: {
      backgroundColor: 'white',
      width: '100%',
      height: 90,
      borderRadius: 10,
      elevation: 10,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom: 10,
   },
   imgcontainer: {
      backgroundColor: '#FBF6E9',
      height: 60,
      width: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 9,
   },
   image: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
   },
   text: {
      marginLeft: 15,
      fontSize: 16,
      color: '#333',
   },
   buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   button: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
   },
   buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
   },
   list: {
      marginTop: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      elevation: 10,
   },
   secondlist: {
      marginTop: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 8,
      elevation: 10,
   },
   navigates: {
      backgroundColor: 'gray',
      borderRadius: 50,
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      justifyContent: 'space-around',
   },
   actionButton: {
      padding: 10,
      borderRadius: 5,
   },
   selectedActionButton: {
      borderRadius: 50,
      borderWidth: 2,
      backgroundColor: 'black',
      paddingVertical: 6,
      paddingHorizontal: 25,
   },
   actionText: {
      color: 'white',
   },
   actionDetails: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
   },
   detailsText: {
      color: '#333',
   },
   bold: {
      fontWeight: 'bold',
   },
});
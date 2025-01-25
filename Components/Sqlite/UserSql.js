import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const UserSql = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [address, setAddress] = useState('');
   const navigation = useNavigation();

   const handleSubmit = () => {
      if (name && email && address) {
         navigation.navigate('HomeSql');
      } else {
         Alert.alert('Fill all the fields');
      }
   };

   return (
      <View style={styles.container}>
         <Text style={[styles.title]}>User Details</Text>
         <TextInput
            placeholder="Enter your name"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
         />
         <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
         />
         <TextInput
            placeholder="Enter your address"
            style={styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
         />
         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.text}>Submit</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 20,
   },
   input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      marginVertical: 10,
      borderRadius: 10,
      height: 50,
   },
   button: {
      top: 20,
      backgroundColor: 'black',
      height: 50,
      borderRadius: 10,
   },
   text: {
      color: 'white',
      textAlign: 'center',
      padding: 10,
      fontSize: 25,
      fontWeight: 'bold',
   },
   title: {
      color: 'black',
      textAlign: 'center',
      padding: 10,
      fontSize: 25,
      fontWeight: 'bold',
   },
});

export default UserSql;
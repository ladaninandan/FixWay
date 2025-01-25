import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Button, Alert } from 'react-native';


const Pratics = () => {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [display, setdisplay] = useState(false);

   const handlename = (text) => {
      setName(text);
   }

   const handelemail = (text) => {
      setEmail(text.toLowerCase().trim());
   }

   const handlepassword = (text) => {
      setPassword(text.trim());
   }

   const handelsubmit = () => {
      if (handlevalidate()) {
         setdisplay(true);
      }
   }

   const handleClear = () => {
      setName("");
      setEmail("");
      setPassword("");
      setdisplay(null)
   }


   const handlevalidate = () => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if (name.trim() === "") {
         Alert.alert("Validation Error", "Please enter your name.");
         return false;
      }

      if (email.trim() === "") {
         Alert.alert("Validation Error", "Please enter your email.");
         return false;
      }

      if (!emailPattern.test(email)) {
         Alert.alert("Validation Error", "Please enter a valid email address.");
         return false;
      }

      if (password.trim() === "") {
         Alert.alert("Validation Error", "Please enter your password.");
         return false;
      }

      if (password.length < 8) {
         Alert.alert(
            "Validation Error",
            "Password must be at least 8 characters long."
         );
         return false;
      }

      if (!/\d/.test(password)) {
         Alert.alert("Validation Error", "Password must include at least one number.");
         return false;
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
         Alert.alert(
            "Validation Error",
            "Password must include at least one special character."
         );
         return false;
      }
      return true;
   }

   return (
      <View>
         <View style={styles.container}>
            <Text>
               name
            </Text>
            <TextInput
               placeholder='Enter your name'
               cursorColor="green"
               placeholderTextColor="black"
               onChangeText={handlename}
               style={styles.inputetext}
               value={name}
            />
            <Text>
               Email
            </Text>
            <TextInput
               placeholder='Enter your Email'
               cursorColor="green"
               placeholderTextColor="black"
               onChangeText={handelemail}
               style={styles.inputetext}
               value={email}
            />

            <Text>
               Password
            </Text>
            <TextInput
               placeholder='Enter your password'
               cursorColor="green"
               placeholderTextColor="black"
               onChangeText={handlepassword}
               style={styles.inputetext}
               value={password}
               secureTextEntry={true}
            />
            <View style={{ marginTop: 30 }}>
               <Button title='submit' onPress={handelsubmit} />
            </View>
            <View style={{ marginTop: 30 }}>
               <Button title='Reset' color="red" onPress={handleClear} />
            </View>
            {
               display ?

                  <View>
                     <Text>
                        user Name:-{name}
                     </Text>
                     <Text>
                        email : {email}
                     </Text>
                     <Text>
                        password:{password}
                     </Text>
                  </View> : null
            }
         </View>
      </View>
   );
};


const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,  // Fixed padding on both sides
      marginTop: 90,
   },
   inputetext: {
      backgroundColor: "#f1f7ee",
      width: 359,
      height: 60,
      borderRadius: 8,
      fontSize: 20,
      color: "black"

   }
})

export default Pratics;
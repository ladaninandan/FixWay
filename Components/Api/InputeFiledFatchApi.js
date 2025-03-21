import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InputFieldFetchApi = () => {
   const [focusedField, setFocusedField] = useState(null);

   const [name, setName] = useState('');
   const [email, setEmail] = useState("");
   const [password, setpassword] = useState("");
   const [showdata, setshowdata] = useState("");


   // const handlesubmit = () => {
   //    console.warn(name, email, password);
   //    fatchapis();
   // }

   const handlesubmit = async () => {
      const url = "http://192.168.69.73:3000/user";
      let result = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, email, password }),
      });
      const response = await result.json();
      if (response) {
         console.log('hiSS');
      } else {
         console.log("error")
      }
      console.log(name, email, password);
   };

   useEffect(() => {
      const fatchdata = async () => {
         const url = "http://192.168.69.73:3000/user";
         const result = await fetch(url);
         const response = await result.json();

         setshowdata(response);
      }
      fatchdata();

   }, [])



   return (

      <View style={styles.container}>
         <ScrollView>


            <View style={styles.header}>
               <Text style={styles.text}>Hi, this is InputFieldFetchAPI</Text>
            </View>
            <View>
               <FlatList
                  data={showdata}
                  renderItem={({ item }) => (
                     <View>
                        <Text>Name:-{item.name}</Text>
                        <Text>Email:-{item.email}</Text>
                        <Text>password:-{item.password}</Text>
                     </View>
                  )}
               />
            </View>

            <View style={styles.body}>
               <View
                  style={[
                     styles.inputContainer,
                     focusedField === "name" && styles.inputContainerFocused,
                  ]}
               >
                  <Icon name="user" size={20} color="gray" style={styles.icon} />
                  <TextInput
                     placeholder="Enter your Name"
                     placeholderTextColor="gray"
                     style={styles.input}
                     value={name}
                     onFocus={() => setFocusedField("name")}
                     // onBlur={() => setFocusedField(null)}
                     onChangeText={(text) => { setName(text) }}
                  />
               </View>
               <View
                  style={[
                     styles.inputContainer,
                     focusedField === "email" && styles.inputContainerFocused,
                  ]}
               >
                  <Icon name="envelope" size={20} color="gray" style={styles.icon} />
                  <TextInput
                     placeholder="Enter your Email"
                     placeholderTextColor="gray"
                     style={styles.input}
                     value={email}
                     onFocus={() => setFocusedField("email")}
                     // onBlur={() => setFocusedField(null)}
                     onChangeText={(text) => { setEmail(text) }}
                  />
               </View>
               <View
                  style={[
                     styles.inputContainer,
                     focusedField === "password" && styles.inputContainerFocused,
                  ]}
               >
                  <Icon name="lock" size={20} color="gray" style={styles.icon} />
                  <TextInput
                     placeholder="Enter your Password"
                     placeholderTextColor="gray"
                     style={styles.input}
                     secureTextEntry
                     value={password}
                     onFocus={() => setFocusedField("password")}
                     // onBlur={() => setFocusedField(null)}
                     onChangeText={(text) => { setpassword(text) }}
                  />
               </View>
               <TouchableOpacity style={styles.submitbutton} onPress={handlesubmit}>
                  <Text style={styles.buttontext}>Submit</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,
   },
   header: {
      marginTop: 10,
      alignItems: "center",
      backgroundColor: "skyblue",
      padding: 10,
      borderRadius: 8,
      elevation: 8,
   },
   text: {
      fontSize: 20,
      fontWeight: "700",
   },
   body: {
      flex: 1,
      justifyContent: "center",
   },
   inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "lightgray",
      borderRadius: 8,
      marginVertical: 10,
      height: 50,
      paddingHorizontal: 10,
      elevation: 8,
   },
   inputContainerFocused: {
      borderWidth: 2,
      borderColor: "gray", // Highlight color when focused
   },
   icon: {
      marginRight: 10,
   },
   input: {
      flex: 1,
      fontSize: 18,
      color: "black",
   },
   submitbutton: {
      backgroundColor: "darkgreen",
      height: 50,
      borderRadius: 8,
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
   },
   buttontext: {
      color: "white",
      fontSize: 20,
      textAlign: "center",
   },
});

export default InputFieldFetchApi;

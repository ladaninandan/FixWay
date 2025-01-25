import React from "react";
import { useState } from "react";
import { Text, Button, View, Alert } from "react-native";

const User = (props) => {

   const [name, setName] = useState("nandan");

   const handelname = () => {
      setName("kaka")
   }
   return (
      <View>
         <Text>Hi, I am a component {name} </Text>
         <Text>{props.name}</Text>

         <Button title="press" onPress={handelname}></Button>

      </View>
   );
};

export default User;

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from 'react-native-styled-text';

export const Button = ({ title = "Button", onPress,}) => {

    return (
      <TouchableOpacity style={style.button} onPress={onPress}>
        <Text style={style.text}>{title}</Text>
      </TouchableOpacity>
    );
  };


const style = StyleSheet.create({
   button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
      width: 250,
      height: 70,
      backgroundColor: "#FF1607"
    },

    text: {
      
      fontSize: 25,
      color:'#FFFFFF',
     
       
    
    },
});

export default Button;
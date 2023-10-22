import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";



const TextInputt = ({text, onChangeText, placeholder, }) => {
  

  return (
    <View style={styles.inputGeral}>
      <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth:1,
    padding: 10,
    
  },
  inputGeral:{
    gap:10,
    flexDirection:"row",
    width: "100%",
    alignItems:"center",
  },

  inputContainer:{
    backgroundColor:"#fff",
    flex:1,
    
  },

});

export default TextInputt;
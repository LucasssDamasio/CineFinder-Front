import React from "react";
import { Image,View, StyleSheet, TouchableOpacity, Pressable, } from "react-native";




export const CardMovie = ({data, ...rest }) => {
    return (
      <Pressable {...rest} style={style.cardMovies}>
        <Image 
        source={{
            uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }} 
        style={style.cardImage}
        />
      </Pressable>
    );
  };
  const style = StyleSheet.create({
    cardMovies: {
      width:100,
      height:145,
    },
    cardImage:{
      width:100,
      height:145,
      borderRadius:15,
      backgroundColor: "#424242"
    },
  });
  
  export default CardMovie;
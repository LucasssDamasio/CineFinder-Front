
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { api } from "../services/api";
import CardMovie from "../components/cardmovie";
import React, { useEffect, useState } from "react";



const CinemaPage = ({ navigation }) => {
  const [CinemaMovies, setCinemaMovies] = useState([])
  const [UpcomingMovies, setUpcomingMovies] = useState([])

   useEffect(()=>{
    loadNowPlaying();
    loadUpcoming();
   },[])

  const loadNowPlaying = async () =>{
    const response = await api.get("movie/now_playing");
    setCinemaMovies(response.data.results)

  }
  const loadUpcoming = async () =>{
    const response = await api.get("/movie/upcoming");
    setUpcomingMovies(response.data.results)

  }

  

  const renderMoviesItem = ({item}) =>(
    <CardMovie data={item} onPress={() => navigation.navigate("DetailsPage",{movieId: item.id})}/>
  ) 

   
  return (
    <>
      <View style={style.pagina}>
        <View style={style.header}> 
          <ImageBackground
            source={require("../../assets/Pipoca.png")}
            style={style.pipoca}
            resizeMode="center"
          />
        </View>
        


          <View style={style.lista}>
            <Text style={style.h1}>HOJE NOS CINEMAS</Text>
            <FlatList
            data={CinemaMovies}
            horizontal={true}
            numColunns={3}
            style={{gap: 10}}s
            
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            renderItem={renderMoviesItem}  
             
              
              contentContainerStyle={{
                padding:10,
              }}
            />
             
          </View>
          <View style={style.lista}>
          <Text style={style.h1}>EM BREVE NOS CINEMAS</Text>
          <FlatList
            data={UpcomingMovies}
            horizontal={true}
            numColunns={3}s
            renderItem={renderMoviesItem}   
              contentContainerStyle={{
                padding:35,
                paddingBottom: 100,
              }}
            />

</View>
        
      </View>
    </>
  );
};

const style = StyleSheet.create({
  pagina: {
    flex: 1,
    padding: 10,
    gap: 10
  },
  header: { 
    padding:10,
    width: "100%",
    alignItems:"center",
    justifyContent:"center",
  },
  pipoca: {
    width: 200,
    height: 200,
  },
  h1: {
    fontSize: 25,
    color: "#FF1607",
    fontWeight: "bold",
  },
  lista: {
    width: "100%",
  },
  
});

export default CinemaPage;

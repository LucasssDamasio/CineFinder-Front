
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import CardMovie from "../components/cardmovie";

const ProfilePage = ({ navigation }) => {
  const [WatchedMovies, setWatchedMovies] = useState([]);
  const [WatchLaterMovies, setWatchLaterMovies] = useState([]);
  const [SelectMovies, setSelectMovies] = useState([]);
  const [SimilarMovies, setSimilarMovies] = useState([]);
  const [SimilarMovies2, setSimilarMovies2] = useState([]);

  useEffect(() => {
    loadWatched();
    loadWatchLater();
    loadSelect();
    loadSimilar();
    loadSimilar2();
  }, []);

  const loadWatched = async () => {
    const response = await api.get("movie/now_playing");
    setWatchedMovies(response.data.results);
  };
  const loadWatchLater = async () => {
    const response = await api.get("/movie/upcoming");
    setWatchLaterMovies(response.data.results);
  };
  const loadSelect = async () => {
    const response = await api.get("/movie/upcoming");
    setWatchLaterMovies(response.data.results);
  };
  const loadSimilar = async () => {
    const response = await api.get("/movie/upcoming");
    setWatchLaterMovies(response.data.results);
  };
  const loadSimilar2 = async () => {
    const response = await api.get("/movie/upcoming");
    setWatchLaterMovies(response.data.results);
  };
  return (
    <>
      <ScrollView>
        <View style={style.pagina}>
          <Text style={style.h1}>PERFIL </Text>

          <View style={style.header}></View>

          <Text style={style.h1}>SEUS FILMES ASSISTIDOS </Text>

          <View style={style.lista}>
          <FlatList
            data={WatchedMovies}
            horizontal={true}
            numColunns={3}
            style={{gap: 10}}s
            
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            renderItem={item =>(  
              <CardMovie data={item.item}/>  )}  
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding:10,
              }}
            />
          </View>

          <Text style={style.h1}>ASSISTIR MAIS TARDE</Text>

          <View style={style.lista}>

          <FlatList
            data={WatchLaterMovies}
            horizontal={true}
            numColunns={3}s
            renderItem={item =>(  
              <CardMovie data={item.item}/>  )}  
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding:35,
                paddingBottom: 100,
              }}
            />
          </View>

          <Text style={style.h1}> SELECIONADOS PARA VOCÊ</Text>
          <View style={style.lista}>

          <FlatList
            data={SelectMovies}
            horizontal={true}
            numColunns={3}s
            renderItem={item =>(  
              <CardMovie data={item.item}/>  )}  
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding:35,
                paddingBottom: 100,
              }}
            />


          </View>

          <Text style={style.h1}> JA QUE GOSTOU DE X, QUE TAL:</Text>

          <View style={style.lista}>

          <FlatList
            data={SimilarMovies}
            horizontal={true}
            numColunns={3}s
            renderItem={item =>(  
              <CardMovie data={item.item}/>  )}  
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding:35,
                paddingBottom: 100,
              }}
            />

          </View>

          <Text style={style.h1}> JA QUE GOSTOU DE X, QUE TAL:</Text>
          <View style={style.lista}>

          <FlatList
            data={SimilarMovies2}
            horizontal={true}
            numColunns={3}s
            renderItem={item =>(  
              <CardMovie data={item.item}/>  )}  
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding:35,
                paddingBottom: 100,
              }}
            />

          </View>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  pagina: {
    width: "100%",

    padding: 50,
    alignItems: "center",
    justifyContent: "space-around",
  },
  pipoca: {
    width: 200,
    height: 200,
  },
  h1: {
    fontSize: 20,
    color: "#FF1607",
    fontWeight: "bold",
  },
  lista: {
    width: "100%",
  },
  
});

export default ProfilePage;

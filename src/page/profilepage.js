
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState ,useContext} from "react";
import { api } from "../services/api";
import CardMovie from "../components/cardmovie";
import { MovieContext } from "../contexts/MoviesContext";


const ProfilePage = ({ navigation }) => {
  const [WatchedMovies, setWatchedMovies] = useState([]);
  const [WatchLaterMovies, setWatchLaterMovies] = useState([]);
  const [SelectMovies, setSelectMovies] = useState([]);
  const [SimilarMovies, setSimilarMovies] = useState([]);
  const [SimilarMovies2, setSimilarMovies2] = useState([]);
  const { allFavoriteMovies } = useContext(MovieContext);

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
    const response = await api.get("/movie/popular");
    setWatchLaterMovies(response.data.results);
  };
  const loadSelect = async () => {
    const response = await api.get("/movie/upcoming");
    setSelectMovies(response.data.results);
  };
  const loadSimilar = async () => {
    const response = await api.get("/movie/upcoming");
    setSimilarMovies(response.data.results);
  };
  const loadSimilar2 = async () => {
    const response = await api.get("/movie/upcoming");
    setSimilarMovies2(response.data.results);
  };
  
  const renderMoviesItem = ({item}) =>(
    <CardMovie data={item} onPress={() => navigation.navigate("DetailsPage",{movieId: item.id})}/>
  ) 
  return (
    <>
      <ScrollView>
        <View style={style.pagina}>
          <Text style={style.h1}>PERFIL </Text>

          <View style={style.header}></View>

          <Text style={style.h1}>SEUS FILMES FAVORITIOS </Text>

          
         
          {allFavoriteMovies.length > 0 && (
        <ScrollView style={style.contentMyList}>
          {allFavoriteMovies.map((movie) => (
            <TouchableOpacity
              onPress={() => navigate("Details", { movieId: movie.id })}
              key={movie.id}
              style={style.card}
            >
              <Image
                style={style.cardImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      {allFavoriteMovies.length <= 0 && (
       <Text style={style.h1}> voce ainda não adicionou nenhum filme ao favorito </Text>
      )}
    
  









        

          <Text style={style.h1}>ASSISTIR MAIS TARDE</Text>

          <View style={style.lista}>

          <FlatList
            data={WatchLaterMovies}
            horizontal={true}
            numColunns={3}s
            renderItem={renderMoviesItem} 
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
            renderItem={renderMoviesItem} 
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
            renderItem={renderMoviesItem}
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
  contentMyList: {
    width: "100%",
    padding: 20,
    gap: 25,
    marginBottom: 25,
  },
  card: {
    width: 250,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cardImage: {
    width: 110,
    height: 160,
    borderRadius: 16,
  },
 
  
});

export default ProfilePage;

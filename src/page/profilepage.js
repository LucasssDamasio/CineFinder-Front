import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import CardMovie from "../components/cardmovie";
import { MovieContext } from "../contexts/MoviesContext";

const ProfilePage = ({ navigation }) => {
  const [SelectMovies, setSelectMovies] = useState([]);
  const [SimilarMovies, setSimilarMovies] = useState([]);
  const [SimilarMovies2, setSimilarMovies2] = useState([]);
  const { allFavoriteMovies, allLaterMovies } = useContext(MovieContext);

  useEffect(() => {}, [allFavoriteMovies, allLaterMovies]);

  useEffect(() => {
    loadSelect();
    loadSimilar();
    loadSimilar2();
  }, []);

  const loadSelect = async () => {
    const response = await api.get("/movie/popular");
    setSelectMovies(response.data.results);
  };
  const loadSimilar = async () => {
    const response = await api.get("/movie/popular");
    setSimilarMovies(response.data.results);
  };
  const loadSimilar2 = async () => {
    const response = await api.get("/movie/popular");
    setSimilarMovies2(response.data.results);
  };

  const renderMoviesItem = ({ item }) => (
    <CardMovie
      data={item}
      onPress={() => navigation.navigate("DetailsPage", { movieId: item.id })}
    />
  );
  return (
    <>
      <ScrollView>
        <View style={style.pagina}>
          <Text style={style.h1}>PERFIL </Text>

          <View style={style.header}></View>

          <Text style={style.h1}>SEUS FILMES FAVORITIOS </Text>

          {allFavoriteMovies.length > 0 && (
            <View style={style.lista}>
              <FlatList
                horizontal
                data={allFavoriteMovies}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailsPage", { movieId: item.id })
                    }
                    key={index}
                    style={style.card}
                  >
                    <Image
                      style={style.cardImage}
                      source={{
                        uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          {allFavoriteMovies.length <= 0 && (
            <Text style={style.h1}>
              {" "}
              voce ainda não adicionou nenhum filme ao favorito{" "}
            </Text>
          )}

          <Text style={style.h1}>ASSISTIR MAIS TARDE</Text>

          {allLaterMovies.length > 0 && (
             <View style={style.lista}>
             <FlatList
               horizontal
               data={allLaterMovies}
               renderItem={({ item, index }) => (
                 <TouchableOpacity
                   onPress={() =>
                     navigation.navigate("DetailsPage", { movieId: item.id })
                   }
                   key={index}
                   style={style.card}
                 >
                   <Image
                     style={style.cardImage}
                     source={{
                       uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                     }}
                   />
                 </TouchableOpacity>
               )}
             />
           </View>
          )}
          {allLaterMovies.length <= 0 && (
            <Text style={style.h1}>
              {" "}
              voce ainda não adicionou nenhum filme para assistir mais tarde{" "}
            </Text>
          )}

          <Text style={style.h1}> SELECIONADOS PARA VOCÊ</Text>
          <View style={style.lista}>
            <FlatList
              data={SelectMovies}
              horizontal={true}
              numColunns={3}
              s
              renderItem={renderMoviesItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding: 35,
                paddingBottom: 100,
              }}
            />
          </View>

          <Text style={style.h1}> JA QUE GOSTOU DE X, QUE TAL:</Text>

          <View style={style.lista}>
            <FlatList
              data={SimilarMovies}
              horizontal={true}
              numColunns={3}
              s
              renderItem={renderMoviesItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding: 35,
                paddingBottom: 100,
              }}
            />
          </View>

          <Text style={style.h1}> JA QUE GOSTOU DE X, QUE TAL:</Text>
          <View style={style.lista}>
            <FlatList
              data={SimilarMovies2}
              horizontal={true}
              numColunns={3}
              s
              renderItem={(item) => <CardMovie data={item.item} />}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={{
                padding: 35,
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
    width:100,
      height:145,
      borderRadius:15,
      backgroundColor: "#424242"
  },
});

export default ProfilePage;

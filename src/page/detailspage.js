import React, { useEffect, useState , useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Button from "../components/button";
import TextInputt from "../components/textinput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { MovieContext } from "../contexts/MoviesContext";

const DetailsPage = ({ navigation }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const { addFavoriteMovie, removeFavoriteMovie, favoriteMovies,addLaterMovie, removeLaterMovie, laterMovies } =  useContext(MovieContext);

  const route = useRoute();
  const { movieId } = route.params || {};

  useEffect(() => {
    const fetchMoviedetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchCast = async () => {
      try {
        const response = await api.get(`/movie/${movieId}/credits`);
        setCast(response.data.cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMoviedetails();
    fetchCast();
  }, [movieId]);

  if (!movieDetails) {
    return null;
  }

  return (
    <>
      <ScrollView style={style.pagina}>
        <View style={style.header}>
          <TouchableOpacity  onPress={()=> navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              color="#FF1607"
              size={32}
            ></Ionicons>
          </TouchableOpacity>
          <Text style={style.headerText}>Detalhes</Text>
          <TouchableOpacity
          onPress={() => {
            favoriteMovies.includes(movieId)
             ? removeFavoriteMovie(movieDetails.id)
             : addFavoriteMovie(movieDetails.id);
          }}>
            <Ionicons
            name={favoriteMovies.includes(movieId) ? "bookmark" : "bookmark-outline"}
             // name="bookmark-outline"
              color="#FF1607"
              size={32}
             //weight={favoriteMovies.includes(movieId) ? "fill" : "light"}
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => {
            laterMovies.includes(movieId)
             ? removeLaterMovie(movieDetails.id)
             : addLaterMovie(movieDetails.id);
          }}>
            <Ionicons
            name={favoriteMovies.includes(movieId) ? "time" : "time-outline"}
             // name="bookmark-outline"
              color="#FF1607"
              size={32}
             //weight={favoriteMovies.includes(movieId) ? "fill" : "light"}
            ></Ionicons>
          </TouchableOpacity>
          
        </View>
        {loading && <ActivityIndicator size="large" color="#FF1607"/>}
         {!loading && <>
          <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
            }}
            style={style.detailsImage}
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
            }}
            style={style.detailsPosterImage}
          />

          <Text style={style.titleMovie}>{movieDetails?.title} </Text>
          <View style={style.description}>
            <View style={style.descriptionGroup}>
              <Ionicons
                name="calendar-outline"
                color="#FF1607"
                size={25}
              ></Ionicons>
              <Text style={style.descriptionText}>
                {movieDetails?.release_date}{" "}
              </Text>
            </View>

            <View style={style.descriptionGroup}>
              <Ionicons
                name="time-outline"
                color="#FF1607"
                size={25}
              ></Ionicons>
              <Text style={style.descriptionText}>
                {`${movieDetails?.runtime} minutos`}{" "}
              </Text>
            </View>

            <View style={style.descriptionGroup}>
              <Ionicons
                name="star-half-outline"
                color="#FF1607"
                size={25}
              ></Ionicons>
              <Text style={style.descriptionText}>
                {movieDetails?.vote_average.toFixed(1)}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.about}>
          <Text style={style.aboutSubTitle}>Sinopse </Text>
          <Text style={style.aboutText}>
            {movieDetails?.overview === ""
              ? "Infelizmente a sinpose desse filme não esta disponivel"
              : movieDetails?.overview}{" "}
          </Text>
        </View>
        <View style={style.about}>
  <Text style={style.aboutSubTitle}>Elenco</Text>
  <ScrollView horizontal>
    {cast.map((actor) => (
      <View key={actor.id} style={style.actorContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w185${actor.profile_path}`,
          }}
          style={style.actorImage}
        />
        <Text style={style.actorName}>{actor.name}</Text>
      </View>
    ))}
  </ScrollView>
</View>
         
         </>}
       
        


      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    fontSize: 25,
    color: "#FF1607",
    fontWeight: "bold",
  },
  detailsImage: {
    position: "absolute",
    width: "100%",
    height: 210,
  },
  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140,
  },
  titleMovie: {
    position: "absolute",
    height: 50,
    left: 140,
    right: 32,
    top: 240,
    fontSize: 18,
    color: "#FF1607",
    fontWeight: "700",
    lineHeight: 27,
  },
  description: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
  },
  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  descriptionText: {
    marginLeft: 10,
    color: "#FF1607",
  },
  about: {
    padding: 20,
  },
  aboutText: {
    textAlign: "justify",
    color: "#000",
  },
  aboutSubTitle: {
    textAlign: "justify",
    color: "#FF1607",
  },
  actorContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  actorImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
  },
  actorName: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default DetailsPage;

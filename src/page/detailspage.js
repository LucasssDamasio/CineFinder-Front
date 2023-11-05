import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { Ionicons } from "@expo/vector-icons";
import { MovieContext } from "../contexts/MoviesContext";

const DetailsPage = ({ navigation }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const [streamingProviders, setStreamingProviders] = useState([]);
  const [certification, setCertification] = useState("");
  const {
    addFavoriteMovie,
    removeFavoriteMovie,
    favoriteMovies,
    addLaterMovie,
    removeLaterMovie,
    laterMovies,
  } = useContext(MovieContext);

  const route = useRoute();
  const { movieId } = route.params || {};

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);

        const certificationResponse = await api.get(
          `/movie/${movieId}/release_dates`
        );
        const certifications = certificationResponse.data.results.find(
          (result) => result.iso_3166_1 === "BR"
        );
        if (
          certifications &&
          certifications.release_dates &&
          certifications.release_dates.length > 0
        ) {
          const certification = certifications.release_dates[0].certification;
          setCertification(certification);
        }
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
    
    const fetchGenres = async () => {
      try {
        const response = await api.get(`/movie/${movieId}`);
        const genreNames = response.data.genres.map((genre) => genre.name);
        setMovieGenres(genreNames);
      } catch (error) {
        console.log(error);
      }
    };
    

    const fetchStreamingProviders = async () => {
      try {
        const country = "BR";
        const response = await api.get(`/movie/${movieId}/watch/providers`, {
          params: {
            watch_region: country,
          },
        });
        const streamingData = response.data.results;

        if (country in streamingData) {
          const countryProviders = streamingData[country];
          if (
            countryProviders.flatrate &&
            Array.isArray(countryProviders.flatrate)
          ) {
            setStreamingProviders(countryProviders.flatrate);
          } else {
            setStreamingProviders([]);
          }
        } else {
          setStreamingProviders([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStreamingProviders();
    fetchMovieDetails();
    fetchCast();
    fetchGenres();
  }, [movieId]);

  if (!movieDetails) {
    return null;
  }

  return (
    <>
      <ScrollView style={style.pagina}>
        <View style={style.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            }}
          >
            <Ionicons
              name={
                favoriteMovies.includes(movieId)
                  ? "bookmark"
                  : "bookmark-outline"
              }
              color="#FF1607"
              size={32}
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              laterMovies.includes(movieId)
                ? removeLaterMovie(movieDetails.id)
                : addLaterMovie(movieDetails.id);
            }}
          >
            <Ionicons
              name={laterMovies.includes(movieId) ? "time" : "time-outline"}
              color="#FF1607"
              size={32}
            ></Ionicons>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator size="large" color="#FF1607" />}
        {!loading && (
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
        )}
        <View style={style.about}>
          <Text style={style.aboutSubTitle}>Gênero </Text>
          <Text style={style.aboutText}>
            {movieDetails.genres && movieDetails.genres.length > 0
              ? movieDetails.genres.map((genre) => genre.name).join(", ")
              : "Gênero não disponível"}
          </Text>
          <Text style={style.aboutSubTitle}>Sinopse </Text>
          <Text style={style.aboutText}>
            {movieDetails?.overview === ""
              ? "Infelizmente a sinopse desse filme não está disponível"
              : movieDetails?.overview}{" "}
          </Text>
          <Text style={style.aboutSubTitle}>Classificação Indicativa</Text>
          <Text style={style.aboutText}>
            {certification || "Classificação indisponível"}
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
        <View style={style.streamingProviders}>
          <Text style={style.aboutSubTitle}>Onde assistir</Text>
          <ScrollView horizontal>
            {streamingProviders.map((provider) => (
              <View key={provider.provider_id} style={style.streamingProvider}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${provider.logo_path}`,
                  }}
                  style={style.streamingProviderLogo}
                />
                <Text style={style.streamingProviderName}>
                  {provider.provider_name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
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
  streamingProviders: {
    padding: 20,
  },
  streamingProvider: {
    marginRight: 10,
    alignItems: "center",
  },
  streamingProviderLogo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  streamingProviderName: {
    marginTop: 5,
    textAlign: "center",
    color: "#000",
  },
  certificationText: {
    textAlign: "justify",
    color: "#000",
  },
});

export default DetailsPage;

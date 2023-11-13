
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Button from "../components/button";
import TextInputt from "../components/textinput";
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import CardMovie from "../components/cardmovie";
import { Search } from "../components/searchbar";

const HomePage = ({ navigation }) => {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  

  
  const BuscaAleatorio = () => {
    const randomMovieId = Math.floor(Math.random() * 10000) + 1;

    navigation.navigate("DetailsPage", { movieId: randomMovieId });
  };
  

  return (
    <>
      <View style={style.pagina}>
        <Text style={style.h1}>CineFinder</Text>
        <Image
          source={require("../../assets/clapper.png")}
          style={style.clapperboard}
        />
        <Search></Search>
        <View style={style.opcoes}>

          <Button title="Titulo Aleatorio" onPress={BuscaAleatorio}></Button>

        </View>

        <View style={style.footer}></View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  h1: {
    fontSize: 45,
    color: "#FF1607",
    fontWeight: "bold",
  },
  pagina: {
    width: "100%",
    flex: 10,
    padding: 20,
    alignItems: "center",
    gap:10,
    justifyContent:"space-between",
  },
  clapperboard: {
    width: 150,
    height: 150,
  },
  opcoes: {
    width: "100%",
    alignItems: "center"
  },
  pesquisa: {
    borderRadius: 50,
    backgroundColor: "gray",
  },
});

export default HomePage;

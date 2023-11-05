import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { api } from "../services/api";

export function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { navigate, goBack } = useNavigation();

  const searchMovies = async (query) => {
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });
    setSearchResults(response.data.results);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          placeholderTextColor="#fff"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      <FlatList
        data={searchResults}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            key={item.id}
            onPress={() => navigate("DetailsPage", { movieId: item.id })}
          >
            <Image
              style={styles.cardImage}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  padding: 20,
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  
  },
  containerInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3A3F47",
    height: 42,
    padding: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  input: {
    color: "#fff",
    width: "80%",
  },
  card: {
    width: 150,
    marginLeft: 10,
  },
  cardImage: {
    width: 150,
    height: 220,
    borderRadius: 16,
  },
});

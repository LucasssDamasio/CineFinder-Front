import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../services/api";

export const MovieContext = createContext({
  favoriteMovies: [],
  allFavoriteMovies: [],
  addFavoriteMovie: () => {},
  removeFavoriteMovie: () => {},
});

export const MovieProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState([]);

  useEffect(() => {
    async function loadFavoriteMovies() {
      const favoriteMovies = await AsyncStorage.getItem("@FavoriteMovies");
      if (favoriteMovies) {
        setFavoriteMovies(JSON.parse(favoriteMovies));
      }
    }
    loadFavoriteMovies();
  }, []);

  const addFavoriteMovie = async (movieId) => {
    if (!favoriteMovies.includes(movieId)) {
      const newFavoriteMovies = [...favoriteMovies, movieId];
      setFavoriteMovies(newFavoriteMovies);
      await AsyncStorage.setItem(
        "@FavoriteMovies",
        JSON.stringify(newFavoriteMovies)
      );
    }
  };

  const removeFavoriteMovie = async (movieId) => {
    const newFavoriteMovies = favoriteMovies.filter((id) => id !== movieId);
    setFavoriteMovies(newFavoriteMovies);
    await AsyncStorage.setItem(
      "@FavoriteMovies",
      JSON.stringify(newFavoriteMovies)
    );
  };

  const parsedFavoriteMovies = useMemo(() => favoriteMovies, [favoriteMovies]);

  const getAllFavoriteMovies = async () => {
    try {
      const movies = await Promise.all(
        parsedFavoriteMovies.map(async (movieId) => {
          const response = await api.get(`/movie/${movieId}`);
          return response.data;
        })
      );
      setAllFavoriteMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFavoriteMovies();
  }, [parsedFavoriteMovies, getAllFavoriteMovies]);

  const contextData = {
    favoriteMovies: parsedFavoriteMovies,
    allFavoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
  };

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";


export const MovieContext = createContext({
  favoriteMovies: [],
  allFavoriteMovies: [],
  addFavoriteMovie: () => {},
  removeFavoriteMovie: () => {},
  laterMovies: [],
  allLaterMovies: [],
  addLaterMovie: () => {},
  removeLaterMovie: () => {},
});

export const MovieProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState([]);
  const [laterMovies, setLaterMovies] = useState([]);
  const [allLaterMovies, setAllLaterMovies] = useState([]);

  useEffect(() => {
    async function loadFavoriteMovies() {
      const favoriteMovies = await AsyncStorage.getItem("@FavoriteMovies");
      if (favoriteMovies) {
        setFavoriteMovies(JSON.parse(favoriteMovies));
      }
    }

    async function loadLaterMovies() {
      const laterMovies = await AsyncStorage.getItem("@LaterMovies");
      if (laterMovies) {
        setLaterMovies(JSON.parse(laterMovies));
      }
    }
    loadFavoriteMovies();
    loadLaterMovies();
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

  const addLaterMovie = async (movieId) => {
    if (!laterMovies.includes(movieId)) {
      const newLaterMovies = [...laterMovies, movieId];
      setLaterMovies(newLaterMovies);
      await AsyncStorage.setItem(
        "@LaterMovies",
        JSON.stringify(newLaterMovies)
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

  const removeLaterMovie = async (movieId) => {
    const newLaterMovies = laterMovies.filter((id) => id !== movieId);
    setLaterMovies(newLaterMovies);
    await AsyncStorage.setItem(
      "@LaterMovies",
      JSON.stringify(newLaterMovies)
    );
  };

  const parsedFavoriteMovies = useMemo(() => favoriteMovies, [favoriteMovies]);
  const parsedLaterMovies = useMemo(() => laterMovies, [laterMovies]);

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
      
    }
  };

  const getAllLaterMovies = async () => {

    try {
      const movies = await Promise.all(
        parsedLaterMovies.map(async (movieId) => {
          const response = await api.get(`/movie/${movieId}`);
          return response.data;
        })
      );
      setAllLaterMovies(movies);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getAllFavoriteMovies();
    getAllLaterMovies();
  }, [parsedFavoriteMovies, parsedLaterMovies]);

  const contextData = {
    favoriteMovies: parsedFavoriteMovies,
    allFavoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
    laterMovies: parsedLaterMovies,
    allLaterMovies,
    addLaterMovie,
    removeLaterMovie,
  };

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );
};

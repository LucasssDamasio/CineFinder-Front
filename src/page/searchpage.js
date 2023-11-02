import React from "react";
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

const HomePage = ({ navigation }) => {
  

  return (
    <>
      <View style={style.pagina}>
        <Text style={style.h1}>CineFinder</Text>
        <Image
          source={require("../../assets/clapper.png")}
          style={style.clapperboard}
        />
        <TextInputt
          style={style.pesquisa}
          placeholder={"Buscando Algum Filme?"}
        ></TextInputt>

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
    justifyContent: "space-around",
  },
  clapperboard: {
    width: 150,
    height: 150,
  },
  opcoes: {
    width: "100%",
    gap: 10,
    alignItems: "center"
  },
  pesquisa: {
    borderRadius: 50,
    backgroundColor: "gray",
  },
});

export default HomePage;

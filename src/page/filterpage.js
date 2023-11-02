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

const FilterPage = ({ navigation }) => {
  

  return (
    <>
      <View style={style.pagina}>
        <Text style={style.h1}>CineFinder</Text>
        <Image
          source={require("../../assets/clapper.png")}
          style={style.clapperboard}
        />
        <Text style={style.h1}>Quer predefinir alguns filtros?</Text>
        <View style={style.opcoes}>
         


        
        </View>

        <View style={style.footer}>

        <Button title="Não" onPress={() => navigation.navigate("QuestionPage")}></Button>
        </View>
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

export default FilterPage;

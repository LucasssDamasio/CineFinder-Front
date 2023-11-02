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

const QuestionPage = ({ navigation }) => {
  const Sim = () => {
    alert(" Em Obra");
  };
  const Nao = () => {
    alert(" Em Obra");
  };

  const Talvez = () => {
    alert(" Em Obra");
  };

  return (
    <>
      <View style={style.pagina}>
        <Text style={style.h1}>CineFinder</Text>
        <Image
          source={require("../../assets/clapper.png")}
          style={style.clapperboard}
        />
        <Text style={style.h1}>Perguntas aqui</Text>
        <View style={style.opcoes}>
          <Button title="Sim " onPress={Sim}></Button>

          <Button title="Talvez" onPress={Talvez}></Button>

          <Button title="Não" onPress={Nao}></Button>
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

export default QuestionPage;

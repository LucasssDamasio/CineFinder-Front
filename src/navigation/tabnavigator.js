import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import { Dashboard } from "../screens/Dashboard";
import { Data } from "../screens/Data";
import { Grafo } from "../screens/Grafo";

const Tab = createMaterialTopTabNavigator();

export const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator >
        <Tab.Screen name="Sinopse" component={Sinopse} />
        <Tab.Screen name="OndeAssistir" component={OndeAssistir} />
        <Tab.Screen name="Elenco" component={Elenco} />
      </Tab.Navigator>
    </>
  );
};

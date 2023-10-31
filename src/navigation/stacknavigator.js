import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DetailsPage from "../page/detailspage";
import Routes from "./bottonnavigator";

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Routes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailsPage"
          component={DetailsPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
export default StackNavigator;

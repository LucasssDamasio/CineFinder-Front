import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DetailsPage from "../page/detailspage";
import QuestionPage from "../page/questionpage";
import Routes from "./bottonnavigator";
import FilterPage from "../page/filterpage";
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
         <Stack.Screen
          name="QuestionPage"
          component={QuestionPage}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FilterPage"
          component={FilterPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
export default StackNavigator;

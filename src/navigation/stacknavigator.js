import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import DetailsPage from "../page/detailspage";

const Stack = createStackNavigator();

 function StackNavigator() {
  return (
    <>
   <Stack.Navigator>
   <Stack.Screen name="DetailsPage" component={DetailsPage} 
     options={{
      headerShown: false,
     }}/>
   </Stack.Navigator>
    
    </>
  )
}
export default StackNavigator;
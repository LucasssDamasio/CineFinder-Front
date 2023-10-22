import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import DetailsPage from "../page/detailspage";

const Stack = createNativeStackNavigator();

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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CinemaPage from '../page/cinemapage';
import HomePage from '../page/homepage';
import ProfilePage from '../page/profilepage';
import{ Ionicons} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

function Routes() {
  return (
    <Tab.Navigator initialRouteName='HomePage' screenOptions={{
      tabBarActiveTintColor: "#000000",
      tabBarInactiveTintColor: "#FFFFFF",
      tabBarShowLabel: false,
      tabBarStyle:{
        position:'absolute',
        backgroundColor:"#FF1607",
        borderTopWidth:0,
        height: 90
        
      }
      
      
    }}>
    
      <Tab.Screen name="CinemaPage" component={CinemaPage}
       options={{
        headerShown: false,
        tabBarIcon: ({ color, size, focused}) => {
          if(focused){
            return <Ionicons name="tablet-landscape" size={50} color={color}/>
          }
          return <Ionicons name="tablet-landscape-outline" size={50} color={color}/>

        }
       }}
       />
      <Tab.Screen name="HomePage" component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused}) => {
            if(focused){
              return <Ionicons name="videocam" size={50} color={color}/>
            }
            return <Ionicons name="videocam-outline" size={50} color={color}/>

          }
         }}
       />
      <Tab.Screen name="ProfilePage" component={ProfilePage} 
       options={{
        headerShown: false,
        tabBarIcon: ({ color, size, focused}) => {
          if(focused){
            return <Ionicons name="person" size={50} color={color}/>
          }
          return <Ionicons name="person-outline" size={50} color={color}/>

        }
       }}
      />
    </Tab.Navigator>
  );
}

export default Routes;
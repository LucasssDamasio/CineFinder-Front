import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/navigation/bottonnavigator';
import { NavigationContainer} from '@react-navigation/native'
import StackNavigator from './src/navigation/stacknavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator>
      <Routes/>
      </StackNavigator>
        
    </NavigationContainer>
    
  );
}

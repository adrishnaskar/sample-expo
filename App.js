import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AppNavigation from './navigation/appNavigation';
import WelcomeScreen from './screens/WelcomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from './theme'



export default function App() {
  return (
      <AppNavigation />
  );
}
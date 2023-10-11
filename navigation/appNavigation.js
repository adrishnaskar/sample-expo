import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import CarteScreen from '../views/CarteScreen';
import ProfileScreen from '../views/ProfileScreen';
import FavoriteScreen from '../views/FavoriteScreen';
import HistoricScreen from '../views/HistoricScreen';
import InviteScreen from '../views/InviteScreen';
import PisschoolScreen from '../views/PisschoolScreen';
import PromoScreen from '../views/PromoScreen';
import StoreScreen from '../views/StoreScreen';
import ContactScreen from '../views/ContactScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const {user} = useAuth();
    if(user){
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
                    <Stack.Screen name="Map" options={{headerShown: false}} component={CarteScreen} />
                    <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
                    <Stack.Screen name="Favorite" options={{headerShown: false}} component={FavoriteScreen} />
                    <Stack.Screen name="History" options={{headerShown: false}} component={HistoricScreen} />
                    <Stack.Screen name="Invite Friends" options={{headerShown: false}} component={InviteScreen} />
                    <Stack.Screen name="Pisschool" options={{headerShown: false}} component={PisschoolScreen} />
                    <Stack.Screen name="Promo" options={{headerShown: false}} component={PromoScreen} />
                    <Stack.Screen name="Store" options={{headerShown: false}} component={StoreScreen} />
                    <Stack.Screen name="Contact" options={{headerShown: false}} component={ContactScreen} />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }else{
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Welcome'>
                    <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
                    <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
                    <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } 
}
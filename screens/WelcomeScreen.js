import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import tw from 'twrnc';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
      const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
               <Text style={styles.title}>Let's get Started</Text>
               <View style={styles.welcomeImage}>
                    <Image source={require("../assets/images/welcome.png")}
                        style={{width:350, height: 350, justifyContent: 'center'}} />
               </View>
               <View>
                    <TouchableOpacity 
                      onPress={()=> navigation.navigate('SignUp')} 
                      style={styles.SignUpButton}
                      >
                        <Text style={styles.body}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.Button}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                            <Text style={styles.bottomText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </View>
               </View>
            </View>
        </SafeAreaView>
      )
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#18688B',
          padding: 8,
        },
        title: {
            color: '#FFFFFF',
            fontWeight: "bold",
            fontSize: 30,
            textAlign: "center"
            
        },
        body: {
            color: '#000000',
            fontWeight: "bold",
            fontSize: 20,
            margin: 8,
            textAlign: 'center'
            
        },
        bottomText: {
            color: '#E0E7EE',
            fontWeight: "semibold",
            fontSize: 13,
            textAlign: 'center'
            
        },
        SignUpButton: {
            backgroundColor: '#E0E7EE',
            borderRadius: 10,
            margin: 20,
            height: 45
        },
        welcomeImage: {
          verticalAlign: 'center',
          padding: 60,
          alignSelf: 'center'

        },
        Button: {
            alignItems: 'center'
  
          },
      });
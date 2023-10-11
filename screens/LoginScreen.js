import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth } from '../config/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

export default function LoginScreen() {
      const navigation = useNavigation();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const authPassword = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
      
      const handleSubmit = async ()=>{
        if(email && password){
            try{
                await signInWithEmailAndPassword(auth, email, password);
            }catch(err){
                console.log('got error: ',err.message)
            }
        }
      }
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View>
                    <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.BackButton}>
                        <ArrowLeftIcon style={styles.LetfArrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.loginImage}>
                    <Image source={require('../assets/images/login.png')}
                        style={{width: 200, height: 200 }} />
                </View>
            </SafeAreaView>
            <View style={styles.vue}>
                <View>
                    <Text style={styles.inputTextEmail}>Email Address :</Text>
                    <TextInput value={email} onChangeText={value=> setEmail(value)} style={styles.inputCase} placeholder='Email' />
                    <Text style={styles.inputTextPassword}>Password :</Text>
                    <TextInput secureTextEntry value={password} onChangeText={value=> setPassword(value)} style={styles.inputCase} placeholder='Password' />
                    <TouchableOpacity style={styles.forgotCase} >
                        <Text style={styles.forgotText} onPress={sendPasswordResetEmail} >Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit} style={styles.LoginButton}>
                        <Text style={styles.LoginText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>
                    Or
                </Text>
                <Text style={styles.TextSignInWith}>
                    Login with :
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                    <TouchableOpacity style={styles.socialCase} >
                        <Image source={require('../assets/icons/google.png')}
                            style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialCase}>
                        <Image source={require('../assets/icons/apple.png')}
                            style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialCase}>
                        <Image source={require('../assets/icons/facebook.png')}
                            style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                        <Text style={styles.TextAlready}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#18688B', // Pissoo Blue
      padding: 8,
    },
    BackButton: {
        backgroundColor: '#E0E7EE',
        borderRadius: 10,
        height: 35,
        width: 35,
    },
    LetfArrow: {
        color: 'black',
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginTop: 6
    },
    loginImage: {
        verticalAlign: 'center',
        padding: 20,
        alignSelf: 'center'

    },
    vue: {
        backgroundColor: '#E0E7EE', // Pissoo light blue 
        width: '100%',
        height: '60%',
        borderRadius: 50,
        marginBottom: '3%',
    },
    inputTextEmail: {
        color: '#242424', //Dark gray
        paddingTop: 40,
        paddingBottom: 6,
        marginLeft: 35,
        fontWeight: "semibold",
        fontSize: 12,
    },
    inputTextPassword: {
        color: '#242424', //Dark gray
        paddingTop: 20,
        paddingBottom: 6,
        marginLeft: 35,
        fontWeight: "semibold",
        fontSize: 12,
    },
    inputCase: {
        paddingLeft: 10,
        backgroundColor: '#fafafa', // Very Soft gray
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        height: 45,

        color: '#c9c9c9', // Soft gray
        textAlign: 'left',
        fontSize: 12,
        
    },
    forgotCase: {
        alignSelf: 'flex-end',
        paddingEnd: 20,
        paddingTop: 15
    },
    forgotText: {
        color: '#8c8c8c', // Mid Gray
        fontWeight: "semibold",
        fontSize: 12,
        textAlign: 'center'
        
    },
    LoginButton: {
        backgroundColor: '#18688B', // Pissoo Blue
        borderRadius: 10,
        margin: 20,
        paddingVertical: 4,
        height: 45
    },
    LoginText: {
        color: '#E0E7EE', // Pissoo light blue 
        fontWeight: "bold",
        fontSize: 15,
        margin: 8,
        textAlign: 'center',
        
    },
    orText: {
        color: '#242424', //Dark gray
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center'
        
    },
    TextSignInWith: {
        color: '#242424', //Dark gray
        fontWeight: "semibold",
        fontSize: 14,
        textAlign: 'center',
        marginTop:10,
        
    },
    socialCase: {
        alignSelf: 'center',
        backgroundColor: '#fafafa', // Very Soft gray
        padding: 6,
        borderRadius: 10,
        marginLeft: 12,
        marginRight: 12,
    },
    TextAlready: {
        color: '#8c8c8c',
        fontWeight: "semibold",
        fontSize: 13,
        textAlign: 'center'
    },
    
});
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection, addDoc, getDoc, setDoc, doc, Firestore } from "firebase/firestore"; 
import { setUserId } from 'firebase/analytics';

export default function SignUpScreen() {
      const navigation = useNavigation();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [fullname, setFullName] = useState('');

      const handleSubmit = async ()=>{
        if(email && password){
            try{
                await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    fullname: fullname,
                    email: email,
                    credit: 0
                });
                await updateProfile(auth.currentUser, { displayName: fullname });
                console.log("Document written with ID: ", handleSubmit.id);
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
                    <Image source={require('../assets/images/signup.png')}
                        style={{width: 135, height: 90 }} />
                </View>
            </SafeAreaView>
            <View style={styles.vue}>
                <View>
                    <Text style={styles.inputTextName}>Full Name :</Text>
                    <TextInput value={fullname} onChangeText={value=> setFullName(value)} style={styles.inputCase} placeholder='Enter Full Name' />
                    <Text style={styles.inputTextPassword}>Email Address :</Text>
                    <TextInput value={email} onChangeText={value=> setEmail(value)} style={styles.inputCase} placeholder='Enter Email' />
                    <Text style={styles.inputTextPassword}>Password :</Text>
                    <TextInput secureTextEntry value={password} onChangeText={value=> setPassword(value)} style={styles.inputCase} placeholder='Enter Password' />
                    <TouchableOpacity style={styles.LoginButton} onPress={handleSubmit}>
                        <Text style={styles.LoginText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.orText}>
                    Or
                </Text>
                <Text style={styles.TextSignInWith}>
                    Sign Up with :
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10}}>
                    <TouchableOpacity style={styles.socialCase}>
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
                    <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                        <Text style={styles.TextAlready}>Already have an account? Login</Text>
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
        alignSelf: 'center',
        width: '100%',
        height: '70%',
        borderRadius: 50,
        marginBottom: '3%',
    },
    inputTextName: {
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

        color: '#242424', //Dark gray
        textAlign: 'left',
        fontSize: 12,
        
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

export const usersFetch = async ()=>{

    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
};
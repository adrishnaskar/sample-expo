import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import back from '../assets/icons/fleche-gauche.png';
import profile from '../assets/images/profile.jpg';
import { auth, db } from '../config/firebase';
import notification from '../assets/icons/bell.png';
import flecheDroite from '../assets/icons/fleche-droite.png'
import wallet from '../assets/icons/wallet.png'
import info from '../assets/icons/info.png'
import logout from '../assets/icons/logout.png'
import close from '../assets/icons/close.png'


import { signOut } from 'firebase/auth';


export default function ProfileScreen() {    
    const navigation = useNavigation();

    const handleLogout = async ()=>{
        await signOut(auth)
    }

  return (
    <View>

        <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 70, marginLeft: 20}}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection: 'row'}}>
                <Image source={back} style={styles.imageBack}></Image>
                <Text style={{alignSelf: 'center'}}> Back </Text>
            </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
            <Image source={profile} style={{
                    width: 160,
                    height:160,
                    borderRadius: 160/ 2,
                }}></Image>
            <Text style={styles.textFullname}>{auth.currentUser.displayName}</Text>
            <Text style={styles.textEmail}>{auth.currentUser.email}</Text>
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity style={{flexDirection: 'row', width: 280, height: 40, backgroundColor: '#E0E7EE', borderRadius: 20, marginBottom: 10}}>
                <Image source={notification} style={styles.iconMenus}></Image>
                <Text style={styles.textMenus}>Notifications</Text>
                <Image source={flecheDroite} style={styles.flecheMenus}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', width: 280, height: 40, backgroundColor: '#E0E7EE', borderRadius: 20, marginBottom: 10}}>
                <Image source={wallet} style={styles.iconMenus}></Image>
                <Text style={styles.textMenus}>Billing Details</Text>
                <Image source={flecheDroite} style={styles.flecheMenus}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', width: 280, height: 40, backgroundColor: '#E0E7EE', borderRadius: 20, marginBottom: 10}}>
                <Image source={info} style={styles.iconMenus}></Image>
                <Text style={styles.textMenus}>Information</Text>
                <Image source={flecheDroite} style={styles.flecheMenus}></Image>
            </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity style={{flexDirection: 'row', width: 280, height: 40, backgroundColor: '#E0E7EE', borderRadius: 20, marginBottom: 10}} onPress={handleLogout}>
                <Image source={logout} style={styles.iconMenus}></Image>
                <Text style={styles.textMenusRed}>Logout</Text>
                <Image source={flecheDroite} style={styles.flecheMenus}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', width: 280, height: 40, backgroundColor: '#E0E7EE', borderRadius: 20, marginBottom: 10}}>
                <Image source={close} style={styles.iconMenus}></Image>
                <Text style={styles.textMenusRed}>Delete my account</Text>
                <Image source={flecheDroite} style={styles.flecheMenus}></Image>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    imageBack: {
      height: 20,
      width: 20,
    },
    textFullname: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    },
    textEmail: {
        fontWeight: 'semibold',
        fontSize: 13,
        color: 'black'
    },
    editProfileButton: {
        backgroundColor: '#18688B', // Pissoo Blue
        width:180,
        height: 40,
        borderRadius: 20,
        flexDirection: 'column',
    },
    editProfileText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        color: '#E0E7EE', // Pissoo light blue
        marginTop: 10 
    },
    iconMenus: {
        alignSelf: 'center',
        tintColor: '#18688B', // Pissoo Blue
        height: 20,
        width: 20,
        marginHorizontal: 15
    },
    textMenus: {
        fontWeight: 'semibold',
        alignSelf: 'center',
        fontSize: 13,
        color: 'black',
    },
    textMenusRed: {
        fontWeight: 'semibold',
        alignSelf: 'center',
        fontSize: 13,
        color: 'red',
    },
    flecheMenus: {
        alignSelf: 'center',
        tintColor: '#18688B', // Pissoo Blue
        height: 20,
        width: 20,
        position:'absolute',
        left: 250
    },
})
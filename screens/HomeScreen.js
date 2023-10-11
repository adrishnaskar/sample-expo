import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { auth, db } from '../config/firebase'
import profile from '../assets/images/profile.jpg'
import pissooDarkPng from '../assets/images/Pissoo_Dark_PNG.png'
import { QuerySnapshot, doc, getDoc } from "firebase/firestore";
import { collection, addDoc, getDocs, setDoc, firestore, firebase } from "firebase/firestore"; 
import MapView from 'react-native-maps';
import { StyleImport } from '@rnmapbox/maps';
import { Camera } from '@rnmapbox/maps';
import { UserLocation } from '@rnmapbox/maps';


import * as Location from 'expo-location';




import { useIsFocused, useNavigation } from '@react-navigation/native';
// Tab icons
import search from '../assets/icons/search.png';
import notification from '../assets/icons/bell.png';
import settings from '../assets/icons/settings.png';
import home from '../assets/icons/home.png';
import logout from '../assets/icons/logout.png';
import contact from '../assets/icons/contact.png';
import historic from '../assets/icons/historic.png';
import favorite from '../assets/icons/favorite.png';
import store from '../assets/icons/store.png';
import gift from '../assets/icons/gift.png';
import promo from '../assets/icons/promo.png';
import pisschool from '../assets/icons/pisschool.png';
import map from '../assets/icons/map.png';
// Menu icons
import menu from '../assets/icons/menu.png';
import close from '../assets/icons/close.png';
import { async } from '@firebase/util'
import { usersFetch } from './SignUpScreen'
import Mapbox from '@rnmapbox/maps'

export default function HomeScreen() {

    const [currentTab, setCurrentTab] = useState("Home");
    const [showMenu, setShowMenu] = useState(false);
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const [dataUser, setDataUser] =useState(null)
    const [credit, setCredit] =useState('credit')

    const fetchUsersData = async () => {
        try {
          const usersCollection = doc(db, 'users', auth.currentUser.uid);
      
          const querySnapshot = await getDoc(usersCollection);

          if (querySnapshot.exists()) { 
            console.log("Document data:", querySnapshot.data())
            setDataUser(querySnapshot.data())
            setCredit(querySnapshot.data().credit)
        }
        
        return querySnapshot;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };
    
    useEffect(() => {
      fetchUsersData()
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{justifyContent: 'flex-start', padding: 15}}>
                <Image source={profile} style={{
                    width: 60,
                    height:60,
                    borderRadius: 10,
                    marginTop: 8
                }}></Image>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: 20
                }}>{auth.currentUser.displayName}</Text>

                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                <Text style={{
                        marginTop: 6,
                        color: 'white'
                    }}>View Profile</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 50 }} >
                    {
                        // Tab bar Buttons ...
                    }

                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Map", map)}
                    {TabButton(currentTab, setCurrentTab, "Store", store)}
                    {TabButton(currentTab, setCurrentTab, "Invite Friends", gift)}
                    {TabButton(currentTab, setCurrentTab, "Promo", promo)}
                    {TabButton(currentTab, setCurrentTab, "History", historic)}
                    {TabButton(currentTab, setCurrentTab, "Favorite", favorite)}
                    {TabButton(currentTab, setCurrentTab, "Contact", contact)}
                    {TabButton(currentTab, setCurrentTab, "Pisschool", pisschool)}                    

                </View> 
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: '#E0E7EE', fontWeight: 'bold'}}>V1.0.0</Text>
                </View>
            </View>

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: '#E0E7EE', // Light Pissoo blue
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: 20,
                borderRadius: showMenu ? 30 : 10,
                // Transforming View ...
                transform:[
                    {scale: scaleValue},
                    {translateX: offsetValue}
                ]
            }}>
                <Animated.View style={{
                    transform:[{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <TouchableOpacity onPress={() => {
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.88,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()
                        
                        Animated.timing(closeButtonOffset, {
                            toValue: showMenu ? 0 : 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(offsetValue, {
                            toValue: showMenu ? 0 : 230,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                            setShowMenu(!showMenu);
                    }}>
                        <Image source={showMenu ? close : menu} style={{
                            width: 20,
                            height: 20,
                            tintColor: 'black',
                            marginTop: 40,
                        }} ></Image>
                    </TouchableOpacity>
                    <Image source={pissooDarkPng} style={styles.pissooImage}></Image>
                    <ScrollView
                    style={{position: 'absolute', left: 10, top: '100%'}}
                    horizontal= {true}
                    snapToAlignment={"center"}
                    alignItems= {true}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.backButton}>
                                <Text style={{alignSelf: 'center', fontSize: 50, fontWeight: 'bold', paddingTop: 5, color: '#18688B'}}>{credit}</Text>
                                <Text style={{alignSelf: 'center', fontWeight: 'semibold', color: '#18688B'}}>Credits</Text>
                            </View>
                            <View style={styles.backButton}>
                                <Text style={{alignSelf: 'center', fontSize: 50, fontWeight: 'bold', paddingTop: 5, color: '#18688B'}}>121</Text>
                                <Text style={{alignSelf: 'center', fontWeight: 'semibold', color: '#18688B'}}>Bars</Text>
                            </View>
                            <View style={styles.backButton}>
                                <Text style={{alignSelf: 'center', fontSize: 50, fontWeight: 'bold', paddingTop: 5, color: '#18688B'}}>8</Text>
                                <Text style={{alignSelf: 'center', fontWeight: 'semibold', color: '#18688B'}}>Femmes aidés</Text>
                            </View>
                        </View>
                        <View style={styles.backButtonCitation}>

                        </View>
                        <View style={styles.backButtonCitation}>

                        </View>
                    </ScrollView>
                    <View style={styles.mapView} >
                        <Mapbox.MapView
                            style={styles.map}
                            styleURL='mapbox://styles/thomasperr/clnh92ui0009501o0e9oqcqox' 
                            zoomEnabled={true}
                            rotateEnabled={true}>
                            
                            <UserLocation
                            visible={true}
                            animated={true}
                            showsUserHeadingIndicator={true}
                            />
                            <Camera
                            followUserLocation={true}
                            animationMode='flyTo'
                            />
                        </Mapbox.MapView>
                    </View>
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    )
}

// Boutton de choix de vue (navigation)
const TabButton = (currentTab, setCurrentTab, title, image) => { 
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => {
                setCurrentTab(title)
                navigation.navigate(title)
        }}>

            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 5,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 10

            }}>

                <Image source={image} style={{
                    width: 18, height: 18,
                    tintColor: currentTab == title ? "#18688B" : "white",
                }}></Image>

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#18688B" : "white"
                }}>{title}</Text>
                    
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#18688B', // Pissoo Blue
      padding: 8,
    },
    pissooImage: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 8,
        width: 100,
        height: 100
    },
    backButton: {
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 20
    },
    mapView: {
        height: 300,
        width: 300,
        position: 'absolute',
        alignSelf: 'center',
        top: 300,
        borderRadius: 20,
    },
    map: {
        flex: 1,
    },
    backButtonCitation: {
        backgroundColor: 'white',
        width: 320,
        height: 100,
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 20,
    },
});
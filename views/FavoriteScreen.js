import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import back from '../assets/icons/fleche-gauche.png';
import { collection, addDoc, getDoc,getDocs, setDoc, doc, firestore } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; 

export default function FavoriteScreen() {    
    const navigation = useNavigation();
    const [name, setName] =useState('name')
    const [data, setData] =useState(null)
    const isFocused = useIsFocused()
   
    const fetchBarsData = async () => {
      try {
        const barsCollection = collection(db, 'bars');
    
        const querySnapshot = await getDocs(barsCollection);
    
        const barsData = await querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        console.log('Bars Data here:', barsData);
        if (barsData.length > 0) { 
            setData(barsData[0]); 
            setName(barsData[0].name); 
        }
        
        return barsData;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };

 
    useEffect(() => {
      fetchBarsData()
    }, [isFocused]);
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 70, marginLeft: 20}}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection: 'row'}}>
            <Image source={back} style={styles.imageBack}></Image>
            <Text style={{alignSelf: 'center'}}> Back </Text>
        </TouchableOpacity>  
        <Text>{name}</Text>
    </View> 
  )
}
const styles = StyleSheet.create({
    imageBack: {
      height: 20,
      width: 20,
    },
})
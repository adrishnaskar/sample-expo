import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import back from '../assets/icons/fleche-gauche.png';



export default function ContactScreen() {    
    const navigation = useNavigation();


  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 70, marginLeft: 20}}>
        <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection: 'row'}}>
            <Image source={back} style={styles.imageBack}></Image>
            <Text style={{alignSelf: 'center'}}> Back </Text>
        </TouchableOpacity>
    </View>
    )
}
const styles = StyleSheet.create({
    imageBack: {
      height: 20,
      width: 20,
    },
})
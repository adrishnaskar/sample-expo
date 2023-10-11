import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import back from '../assets/icons/fleche-gauche.png';
import promo from '../assets/images/promo.png';
import { themeColors } from '../theme';



export default function PromoScreen() {    
    const navigation = useNavigation();


  return (
    <View>
        <View style={{backgroundColor: themeColors.light_blue, width: '100%', height: 200, shadowOpacity: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 70, marginLeft: 20}}>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection: 'row'}}>
                    <Image source={back} style={styles.imageBack}></Image>
                    <Text style={{alignSelf: 'center'}}> Back </Text>
                </TouchableOpacity>
            </View>
            <Text>Do you have any promo code?</Text>
        </View>
        <Image source={promo} style={styles.promoPhoto}></Image>
        <TextInput style={styles.inputCase} ></TextInput>
    </View>
    )
}
const styles = StyleSheet.create({
    imageBack: {
      height: 20,
      width: 20,
    },
    promoPhoto: {
        height: 290,
        width: 290,
        position: 'absolute',
        top: 90,
        left: -30
    },
    inputCase: {
        paddingLeft: 10,
        backgroundColor: '#fafafa', // Very Soft gray
        marginLeft: 30,
        marginRight: 30,
        marginTop: 80,
        borderRadius: 10,
        height: 45,
        shadowOpacity: 0.2,


        color: '#242424', //Dark gray
        textAlign: 'left',
        fontSize: 17,
        
    },
})
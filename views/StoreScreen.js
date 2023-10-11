import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import back from '../assets/icons/fleche-gauche.png';
import { collection, addDoc, getDoc,getDocs, setDoc, doc, firestore } from "firebase/firestore"; 
import { auth, db } from '../config/firebase';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; 
import toilet_100 from '../assets/images/toilets/toilet_100.png';
import toilet_50 from '../assets/images/toilets/toilet_50.png';
import toilet_30 from '../assets/images/toilets/toilet_30.png';
import toilet_10 from '../assets/images/toilets/toilet_10.png';
import toilet_5 from '../assets/images/toilets/toilet_5.png';
import toilet_5_badge from '../assets/images/toilets/toilet_5_badge.png';
import toilet_10_badge from '../assets/images/toilets/toilet_10_badge.png';



export default function StoreScreen() {    
    const navigation = useNavigation();

    // Product list const
    const [name0, setName0] =useState('name0')
    const [value0, setValue0] =useState('value0')
    const [price0, setPrice0] =useState('price0')
    const [pourcent0, setPourcent0] =useState('pourcent0')
    const [name1, setName1] =useState('name1')
    const [value1, setValue1] =useState('value1')
    const [price1, setPrice1] =useState('price1')
    const [pourcent1, setPourcent1] =useState('pourcent1')
    const [name2, setName2] =useState('name2')
    const [value2, setValue2] =useState('value2')
    const [price2, setPrice2] =useState('price2')
    const [pourcent2, setPourcent2] =useState('pourcent2')
    const [name3, setName3] =useState('name3')
    const [value3, setValue3] =useState('value3')
    const [price3, setPrice3] =useState('price3')
    const [pourcent3, setPourcent3] =useState('pourcent3')
    const [name4, setName4] =useState('name4')
    const [value4, setValue4] =useState('value4')
    const [price4, setPrice4] =useState('price4')
    const [pourcent4, setPourcent4] =useState('pourcent4')
    const [data, setData] =useState(null)

    const isFocused = useIsFocused()
    
    const [dataUser, setDataUser] =useState(null)
    const [credit, setCredit] =useState('credit')
   
    const fetchProductsData = async () => {
      try {
        const productsCollection = collection(db, 'products');
    
        const querySnapshot = await getDocs(productsCollection);
    
        const productsData = await querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
    
        console.log('Products Data here:', productsData);
        if (productsData.length > 0) { 
            setData(productsData[0]); 
            setName0(productsData[0].name);
            setValue0(productsData[0].value); 
            setPrice0(productsData[0].price);
            setPourcent0(productsData[0].pourcent);
            setName1(productsData[1].name);
            setValue1(productsData[1].value); 
            setPrice1(productsData[1].price);
            setPourcent1(productsData[1].pourcent);
            setName2(productsData[2].name);
            setValue2(productsData[2].value); 
            setPrice2(productsData[2].price); 
            setPourcent2(productsData[2].pourcent);
            setName3(productsData[3].name);
            setValue3(productsData[3].value); 
            setPrice3(productsData[3].price);
            setPourcent3(productsData[3].pourcent);
            setName4(productsData[4].name);
            setValue4(productsData[4].value); 
            setPrice4(productsData[4].price);
            setPourcent4(productsData[4].pourcent);
        }
        
        return productsData;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };

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
      fetchProductsData()
      fetchUsersData()
    }, [isFocused]);
  return (
    <View style={{backgroundColor: '#E0E7EE', height: '100%', width: '100%'}}>
        <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 70, marginLeft: 20}}>
            <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection: 'row'}}>
                <Image source={back} style={styles.imageBack}></Image>
                <Text style={{alignSelf: 'center'}}> Back </Text>
            </TouchableOpacity> 
        </View> 
        <ScrollView>
            <View style={styles.boxWallet}>
                <Text style={styles.creditWallet} >{credit}</Text>
                <Text style={styles.textWallet} >wallet</Text>
            </View>
            <View style={{marginVertical: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: 10}} >Credit packs</Text>
                <Text style={{fontSize: 14, fontWeight: '300', marginHorizontal: 10}} >Credits are valids in every bar and without any expiration date. In average one pipi will cost you 0.5 credit.</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.buttonToilet}>
                    <Image source={toilet_5} style={styles.imageToilet}></Image>
                    <Text style={styles.textToiletName}>{name3}</Text>
                    <View style={styles.cardPrice}>
                        <Text style={styles.textPrice} >{price3}€</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', top: 55, left: 90}}>
                        <Text style={styles.textToiletDescription} >{value3} credits</Text>
                        <Text style={styles.textToiletSubDescription} >+{pourcent3}% free</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonToilet}>
                    <Image source={toilet_10} style={styles.imageToilet}></Image>
                    <Text style={styles.textToiletName}>{name0}</Text>
                    <View style={styles.cardPrice}>
                        <Text style={styles.textPrice} >{price0}€</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', top: 55, left: 90}}>
                        <Text style={styles.textToiletDescription} >{value0} credits</Text>
                        <Text style={styles.textToiletSubDescription} >+{pourcent0}% free</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonToilet}>
                    <Image source={toilet_30} style={styles.imageToilet}></Image>
                    <Text style={styles.textToiletName}>{name2}</Text>
                    <View style={styles.cardPrice}>
                        <Text style={styles.textPrice} >{price2}€</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', top: 55, left: 90}}>
                        <Text style={styles.textToiletDescription} >{value2} credits</Text>
                        <Text style={styles.textToiletSubDescription} >+{pourcent2}% free</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonToilet}>
                    <Image source={toilet_50} style={styles.imageToilet}></Image>
                    <Text style={styles.textToiletName}>{name4}</Text>
                    <View style={styles.cardPrice}>
                        <Text style={styles.textPrice} >{price4}€</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', top: 55, left: 90}}>
                        <Text style={styles.textToiletDescription} >{value4} credits</Text>
                        <Text style={styles.textToiletSubDescription} >+{pourcent4}% free</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonToilet}>
                    <Image source={toilet_100} style={styles.imageToilet}></Image>
                    <Text style={styles.textToiletName}>{name1}</Text>
                    <View style={styles.cardPrice}>
                        <Text style={styles.textPrice} >{price1}€</Text>
                    </View>
                    <View style={{flexDirection: 'row', position: 'absolute', top: 55, left: 90}}>
                        <Text style={styles.textToiletDescription} >{value1} credits</Text>
                        <Text style={styles.textToiletSubDescription} >+{pourcent1}% free</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{marginVertical: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginBottom: 10}} >Periodic passes</Text>
                <Text style={{fontSize: 14, fontWeight: '300', marginHorizontal: 10}} >Passes are very easy to use and will allow you to use as many toilets as you want for a chosen perdiod.</Text>
            </View>
        </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    imageBack: {
      height: 20,
      width: 20,
    },
    boxWallet: {
        height: 120,
        width: '75%',
        backgroundColor: 'white', // Dark Gray
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 30,
      },

      buttonToilet: {
        backgroundColor: 'white', //'#18688B', // Pissoo Blue #fcba03(yellow)
        borderRadius: 15,
        marginVertical: 10,
        height: 100,
        width: '70%',
        alignSelf: 'center',
        shadowColor: 'gray',
        shadowOpacity: 100,
        shadowOffset: 0,
        shadowRadius: 5,
      },
      cardPrice: {
        backgroundColor: '#fcba03',
        borderRadius: 20,
        height: 20,
        width: 50,
        position: 'absolute',
        top: 10,
        left: 215,
      },
      textPrice: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        marginTop: 1
      },
      imageToilet: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        position: 'absolute',
        top: 15,
        left: 0,
      },
      textToiletName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#18688B', // Pissoo Blue
        position: 'absolute',
        top: 25,
        left: 90,
        
      },
      textToiletDescription: {
        fontSize: 13,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'center',
      },
      textToiletSubDescription: {
        fontSize: 10,
        fontWeight: '400',
        color: 'black',
        alignSelf: 'center',
        marginLeft: 5,
      },
      creditWallet: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        fontFamily: 'cursive',
        marginTop: 10,
      },
      textWallet:{
        position: 'absolute',
        top: 80,
        fontSize: 25,
        fontWeight: 600,
        alignSelf: 'center'
      },
})
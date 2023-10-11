import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Mapbox, { PointAnnotation } from '@rnmapbox/maps';
import { UserLocation } from '@rnmapbox/maps';
import MapView from 'react-native-maps';
import { StyleImport } from '@rnmapbox/maps';
import { Camera } from '@rnmapbox/maps';
import { SymbolLayer } from '@rnmapbox/maps';
import * as Location from 'expo-location';
import back from '../assets/icons/fleche-gauche.png';
import { ShapeSource } from '@rnmapbox/maps';



Mapbox.setAccessToken('pk.eyJ1IjoidGhvbWFzcGVyciIsImEiOiJjbG1zeG9icHgwa2ZoMm5xd3BjY294M2gxIn0.VDW__P_ez5M-zU6lB7TsvQ');


export default function SettingsScreen() {


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Get user location permission
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  const navigation = useNavigation();

  // Camera begin
  const camera = useRef<Camera>(null);

  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: [lon, lat],
    });
  }, []);
  // Camera end

    return (
    <View>
      <View style={styles.container}>
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
          />
          
        </Mapbox.MapView>
      </View>
      <TouchableOpacity onPress={()=> navigation.goBack()} style={{flexDirection: 'row', position: 'absolute', top: 90, left: 15, height: 50, width: 150}}>
            <Image source={back} style={styles.imageBack}></Image>
            <Text style={{alignSelf: 'center', color: 'white'}}> Back </Text>
      </TouchableOpacity>
    </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    map: {
      flex: 1,
    },
    imageBack: {
      height: 20,
      width: 20,
      alignSelf: 'center',
      tintColor: 'white'
    },
  });
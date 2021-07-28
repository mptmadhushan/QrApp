/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  View,
  Alert,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  const onSuccess = response => {
    console.log(response);
    storeData(response);
    navigation.navigate('Results', {
      response,
    });
  };
  const storeData = async response => {
    let data = await AsyncStorage.getItem('FAVORITES');
    let arr = JSON.parse(data);
    arr.push(response);
    await AsyncStorage.setItem('FAVORITES', JSON.stringify(arr));
  };
  // const storeData = async value => {
  //   console.log('async');
  //   try {
  //     const jsonValue = JSON.stringify(value);
  //     await AsyncStorage.setItem('@storage_Key', jsonValue);
  //   } catch (e) {
  //     // saving error
  //     console.log(e);
  //   }
  // };
  function renderHome() {
    let cam;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // colors={['#000046', '#1CB5E0']}
        colors={['#1FA2FF', '#12D8FA', '#A6FFCB']}
        style={styles.container}>
        <View style={styles.preview}>
          <RNCamera
            showMarker={true}
            style={styles.camera}
            ref={ref => (cam = ref)}
            onBarCodeRead={onSuccess}
            onGoogleVisionBarcodesDetected={({barcodes}) => {
              console.log(barcodes);
            }}
            googleVisionBarcodeMode={
              RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode
                .ALTERNATE
            }></RNCamera>
        </View>
        <View>
          <Text style={styles.title}>QR Code Scanner</Text>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffff', '#ffffff']}
          style={styles.cardView}>
          <Text style={styles.centerText}>
            📱📸🔥Consectetur aute cupidatat nisi amet commodo et qui ad
            excepteur.cupidatat nisi amet commodo et qui ad excepteur.
          </Text>
        </LinearGradient>
      </LinearGradient>
    );
  }

  return <SafeAreaView style={styles.container}>{renderHome()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c0034',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: SIZES.width,
  },
  container2: {
    flex: 1,
    backgroundColor: 'red',
    padding: 30,
    borderRadius: 25,
  },
  preview: {
    height: SIZES.width * 0.8,
    width: SIZES.width * 0.8,
    borderRadius: SIZES.width * 0.1,
    overflow: 'hidden',
  },
  cardView: {
    height: SIZES.height * 0.15,
    width: SIZES.width * 0.8,
    borderRadius: SIZES.width * 0.05,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#470000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 1,
  },
  camera: {
    height: SIZES.width * 0.8,
    width: SIZES.width * 0.8,
  },

  title: {
    fontFamily: 'SMARC___',
    fontSize: 35,
    color: COLORS.white,
    textAlign: 'center',
  },
  title2: {
    fontSize: 15,
    padding: 10,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centerText: {
    fontSize: 12,
    padding: 2,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
});

export default Home;

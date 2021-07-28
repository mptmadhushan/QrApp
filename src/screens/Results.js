/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

import {icons, images, SIZES, COLORS, FONTS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation, route}) => {
  useEffect(() => {
    // Update the document title using the browser API
    getData();
  });
  const {response} = route.params;
  const getData = async () => {
    console.log('get dats ');
    try {
      const value = await AsyncStorage.getItem('@FAVORITES');
      if (value !== null) {
        // value previously stored
        console.log('👨‍🦯', value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const onSuccess = e => {
    console.log(e);
    Alert.alert('Barcode value is ' + e.data, 'Barcode type is' + e.type);

    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };
  function renderResult() {
    let cam;
    const onBarCodeRead = async e => {
      console.log(e);
      // Alert.alert('Barcode value is ' + e.data, 'Barcode type is' + e.type);
    };
    return (
      <LinearGradient
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#1FA2FF', '#12D8FA', '#A6FFCB']}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffff', '#ffffff']}
          style={styles.cardView}>
          <Text style={styles.title}>Search Results</Text>
          <Text style={styles.centerText}>📱📸🔥Consectetur</Text>
          <Text style={styles.centerText2}>Response: {response.data}</Text>
        </LinearGradient>
        <Text style={styles.title}>Recent Results</Text>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffff', '#ffffff']}
          style={styles.cardView2}>
          <Text style={styles.centerTextRes}>📱📸🔥Consectetur</Text>
          <Text style={styles.centerText2}>{response.data}</Text>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffff', '#ffffff']}
          style={styles.cardView2}>
          <Text style={styles.centerTextRes}>📱📸🔥Consectetur</Text>
          <Text style={styles.centerText2}>{response.data}</Text>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffff', '#ffffff']}
          style={styles.cardView2}>
          <Text style={styles.centerTextRes}>📱📸🔥Consectetur</Text>
          <Text style={styles.centerText2}>{response.data}</Text>
        </LinearGradient>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffff', '#ffffff']}
          style={styles.cardView2}>
          <Text style={styles.centerTextRes}>📱📸🔥Consectetur</Text>
          <Text style={styles.centerText2}>{response.data}</Text>
        </LinearGradient>
        {/* <Text>itemId: {response.data}</Text> */}
      </LinearGradient>
    );
  }

  return <SafeAreaView style={styles.container}>{renderResult()}</SafeAreaView>;
};

const styles = StyleSheet.create({
  centerText: {
    fontSize: 12,
    marginTop: 30,
    padding: 2,
    color: '#777',
  },
  centerTextRes: {
    fontSize: 12,
    marginTop: 3,
    padding: 2,
    color: '#777',
  },
  centerText2: {
    fontSize: 12,
    marginTop: 10,
    padding: 2,
    color: '#777',
  },
  containerNew: {
    height: SIZES.height / 2,
    marginTop: SIZES.height / 3,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  cardView: {
    marginTop: 20,
    height: SIZES.height * 0.3,
    width: SIZES.width * 0.8,
    borderRadius: SIZES.width * 0.05,
    overflow: 'hidden',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#1111',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    elevation: 5,
  },
  cardView2: {
    marginTop: 20,
    height: SIZES.height * 0.1,
    width: SIZES.width * 0.8,
    borderRadius: SIZES.width * 0.05,
    overflow: 'hidden',
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#1111',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    width: SIZES.width,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontFamily: 'SMARC___',
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  title2: {
    fontSize: 15,
    padding: 10,
    color: COLORS.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default Home;

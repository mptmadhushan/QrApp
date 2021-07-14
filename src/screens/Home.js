/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const Home = ({navigation}) => {
  const onSuccess = e => {
    console.log(e);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };
  function renderHome() {
    return (
      <SafeAreaView style={styles.container}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>Please Scan code to contine</Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.container}>{renderHome()}</SafeAreaView>;
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'SMARC___',
    marginTop: SIZES.height / 8.5,
    fontSize: 35,
    marginRight: SIZES.width / 2.7,
    color: COLORS.white,
    // fontWeight: 'bold',
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
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
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

/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../constants';

const OnBoard = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        style={{flex: 1}}
        source={require('../assets/images/pngtree-cartoon-kid-meadow-green-background-material-image_124473.jpg')}> */}
      <View style={styles.contentCenter}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{...FONTS.titleHome}}>Welcome to QR Scanner</Text>
          {/* <Image
              // source={require('../assets/images/logo-wali.png')}
              style={{
                width: SIZES.width * 0.8,
                marginTop: 50,
              }}
            /> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{
            elevation: 8,
            borderRadius: 30,
            paddingVertical: 15,
            paddingHorizontal: 25,
            marginBottom: 50,
            justifyContent: 'center',
            backgroundColor: '#007795',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Let's Go</Text>
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};
export default OnBoard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'butterfly-kids.regular',
    fontSize: 25,
    margin: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentCenter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: SIZES.height,
  },
  textStyle: {
    color: 'white',
    padding: 10,
  },
});

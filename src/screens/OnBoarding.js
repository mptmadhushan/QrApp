/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SIZES, COLORS, FONTS} from '../constants';
import LinearGradient from 'react-native-linear-gradient';

const OnBoard = ({navigation}) => {
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#1FA2FF', '#12D8FA', '#A6FFCB']}>
      <View style={styles.contentCenter}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{...FONTS.titleHome}}>Smart Cart</Text>
          <Image
            source={require('../assets/images/arInt.png')}
            style={{
              marginTop: 50,
              width: SIZES.width * 0.8,
              height: SIZES.width * 0.8,
            }}
          />
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
    </LinearGradient>
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

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import Home from './src/screens/Home';
import OnBoard from './src/screens/OnBoarding';

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'OnBoard'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OnBoard" component={OnBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

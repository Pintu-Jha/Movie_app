import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Constants} from '../Utility/imdex';
import Home from '../Components/Screen/Home/Home';
import Movie from '../Components/Screen/Movie/Movie';
import PersonScreen from '../Components/Screen/PersonScreen/PersonScreen';
import SearchScreen from '../Components/Screen/SearchScreen/SearchScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Constants.SCREEN_HOME}
          component={Home}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={Constants.SCREEN_MOVIE}
          component={Movie}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={Constants.Screen_PERSON}
          component={PersonScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={Constants.Screen_SEARCH}
          component={SearchScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

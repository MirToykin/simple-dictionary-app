import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text, View} from "react-native";
import ProfileScreen from "../screens/loggedInScreens/ProfileScreen";
import DictionariesNavigator from "./DictionariesNavigator";
import AppHeader from "../components/AppHeader";
import {dictionariesRoute, profileRoute, testingRoute} from "./constants";

const Drawer = createDrawerNavigator()

const TestingScreen = () => {
  return (
    <>
      <AppHeader/>
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Тестирование</Text>
      </View>
    </>
  );
}

const AuthenticatedNavigator = () => {
  return (
    <>
      <Drawer.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Drawer.Screen name={profileRoute} component={ProfileScreen} options={{drawerLabel: 'Профиль'}}/>
        <Drawer.Screen name={dictionariesRoute} component={DictionariesNavigator} options={{drawerLabel: 'Словари'}}/>
        <Drawer.Screen name={testingRoute} component={TestingScreen} options={{drawerLabel: 'Тестирвоание'}}/>
      </Drawer.Navigator>
    </>
  )
}

export default AuthenticatedNavigator;

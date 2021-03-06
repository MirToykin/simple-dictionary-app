import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text, View} from "react-native";
import ProfileScreen from "../screens/loggedInScreens/ProfileScreen";
import DictionariesNavigator from "./DictionariesNavigator";
import AppHeader from "../components/AppHeader";

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
        <Drawer.Screen name="Профиль" component={ProfileScreen} />
        <Drawer.Screen name="Словари" component={DictionariesNavigator} />
        <Drawer.Screen name="Тестирвоание" component={TestingScreen} />
      </Drawer.Navigator>
    </>
  )
}

export default AuthenticatedNavigator;

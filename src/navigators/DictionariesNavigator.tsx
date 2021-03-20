import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import {Text, View} from "react-native";
import AppHeader from "../components/AppHeader";
import NextSetScreen from "../screens/loggedInScreens/dictionaries/NextSetScreen";
import {secondaryBackgroundColor} from "../assets/styles";

const Tab = createBottomTabNavigator()

const CurrentScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Текущий</Text>
    </View>
  );
}

const DoneScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Изученные</Text>
    </View>
  );
}

const DictionariesNavigator = () => {
  return (
    <>
      <AppHeader/>
      <Tab.Navigator tabBarOptions={{
        activeTintColor: '#f50',
        inactiveTintColor: '#fff',
        style: {
          backgroundColor: secondaryBackgroundColor
        }
      }}>
        <Tab.Screen
          name="На очереди"
          component={NextSetScreen}
          options={{
            tabBarLabel: 'На очереди',
            tabBarIcon: ({ color, size }) => (
              <Icon name="angle-double-right" color={color} size={size} type='font-awesome'/>
            ),
          }}
        />
        <Tab.Screen
          name="Текущий"
          component={CurrentScreen}
          options={{
            tabBarLabel: 'На изучении',
            tabBarIcon: ({ color, size }) => (
              <Icon name="graduation-cap" color={color} size={size} type='font-awesome'/>
            ),
          }}
        />
        <Tab.Screen
          name="Изученные"
          component={DoneScreen}
          options={{
            tabBarLabel: 'Изучено',
            tabBarIcon: ({ color, size }) => (
              <Icon name="check" color={color} size={size} type='font-awesome'/>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default DictionariesNavigator;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import {Text, View} from "react-native";
import AppHeader from "../components/AppHeader";

const Tab = createBottomTabNavigator()

const NextScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>На очереди !</Text>
      <Icon
        raised
        name='angle-double-right'
        type='font-awesome'
        color='#f50'
        onPress={() => console.log('hello')} />
    </View>
  );
}

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
        // tabStyle: {
        //   flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center'
        // }
        activeTintColor: '#f50',
        inactiveTintColor: '#ccc'
      }}>
        <Tab.Screen
          name="На очереди"
          component={NextScreen}
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

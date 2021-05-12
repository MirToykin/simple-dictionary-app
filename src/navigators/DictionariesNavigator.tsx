import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements'
import AppHeader from "../components/AppHeader";
import NextSetScreen from "../screens/loggedInScreens/dictionaries/NextSetScreen";
import {primaryBackgroundColor, secondaryBackgroundColor} from "../assets/styles";
import CurrentSetScreen from "../screens/loggedInScreens/dictionaries/CurrentSetScreen";
import DoneSetScreen from "../screens/loggedInScreens/dictionaries/DoneSetScreen";
import {setCurrentTab, TSetCurrentTabAction} from "../redux/actions/wordsActions";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {currentSetRoute, doneSetRoute, nextSetRoute} from "./constants";
import {TAB_BAR_HEIGHT} from "../constants";

const Tab = createBottomTabNavigator()

const DictionariesNavigator = () => {
  const dispatch: Dispatch<TSetCurrentTabAction> = useDispatch()

  const commonListeners = ({ navigation, route }: {navigation: any, route: any}) => ({
    tabPress: () => {
      dispatch(setCurrentTab(route.name))
    },
  })
  return (
    <>
      <AppHeader/>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#f50',
          inactiveTintColor: '#fff',
          activeBackgroundColor: primaryBackgroundColor,
          style: {
            backgroundColor: secondaryBackgroundColor,
            height: TAB_BAR_HEIGHT,
            // position: 'absolute'
          },
          tabStyle: {
            paddingVertical: 5
          }
        }}
      >
        <Tab.Screen
          name={nextSetRoute}
          component={NextSetScreen}
          options={{
            tabBarLabel: 'На очереди',
            tabBarIcon: ({color, size}) => (
              <Icon name="angle-double-right" color={color} size={size} type='font-awesome'/>
            ),
          }}
          listeners={commonListeners}
        />
        <Tab.Screen
          name={currentSetRoute}
          component={CurrentSetScreen}
          options={{
            tabBarLabel: 'На изучении',
            tabBarIcon: ({color, size}) => (
              <Icon name="graduation-cap" color={color} size={size} type='font-awesome'/>
            ),
          }}
          listeners={commonListeners}
        />
        <Tab.Screen
          name={doneSetRoute}
          component={DoneSetScreen}
          options={{
            tabBarLabel: 'Изучено',
            tabBarIcon: ({color, size}) => (
              <Icon name="done-all" color={color} size={size} type='material'/>
            )
          }}
          listeners={commonListeners}
        />
      </Tab.Navigator>
    </>
  )
}

export default DictionariesNavigator

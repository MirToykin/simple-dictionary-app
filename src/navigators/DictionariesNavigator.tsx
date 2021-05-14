import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Header from "../components/Header";
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
      <Header/>
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
              <FontAwesomeIcon name="angle-double-right" color={color} size={size}/>
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
              <FontAwesomeIcon name="graduation-cap" color={color} size={size}/>
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
              <MaterialIcon name="done-all" color={color} size={size}/>
            )
          }}
          listeners={commonListeners}
        />
      </Tab.Navigator>
    </>
  )
}

export default DictionariesNavigator

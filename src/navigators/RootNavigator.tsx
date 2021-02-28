import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store/configureStore";
import AuthenticatedNavigator from "./AuthenticatedNavigator";

const Stack = createStackNavigator()

const RootNavigator = () => {
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuth ? (
        <>
          <Stack.Screen name="Главная" component={AuthenticatedNavigator}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Вход" component={LoginScreen}/>
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator;

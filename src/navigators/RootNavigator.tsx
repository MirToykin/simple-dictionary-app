import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store/configureStore";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import RegistrationScreen from "../screens/RegistrationScreen";

export type RootStackParamList = {
  Main: undefined
  LogIn: undefined
  Registration: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}>
      {isAuth ? (
        <>
          <Stack.Screen name="Main" component={AuthenticatedNavigator}/>
        </>
      ) : (
        <>
          <Stack.Screen name="LogIn" component={LoginScreen}/>
          <Stack.Screen name="Registration" component={RegistrationScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator;

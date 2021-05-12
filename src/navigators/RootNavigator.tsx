import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store/configureStore";
import AuthenticatedNavigator from "./AuthenticatedNavigator";
import RegistrationScreen from "../screens/RegistrationScreen";
import ResetPwdScreen from "../screens/ResetPwdScreen";
import {loginRoute, mainRoute, registrationRoute, resetPwdRoute} from "./constants";
import {Platform, StyleSheet, View} from 'react-native'
import {STATUS_BAR_HEIGHT} from "../constants";

export type RootStackParamList = {
  Main: undefined
  LogIn: undefined
  Registration: undefined
  ResetPwd: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      ...Platform.select({
        android: {
          marginTop: isAuth ? STATUS_BAR_HEIGHT : 0
        }
      })

    }
  })
  return (
    <View style={styles.appContainer}>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}>
        {isAuth ? (
          <>
            <Stack.Screen name={mainRoute} component={AuthenticatedNavigator}/>
          </>
        ) : (
          <>
            <Stack.Screen name={loginRoute} component={LoginScreen}/>
            <Stack.Screen name={registrationRoute} component={RegistrationScreen} />
            <Stack.Screen name={resetPwdRoute} component={ResetPwdScreen} />
          </>
        )}
      </Stack.Navigator>
    </View>
  )
}

export default RootNavigator;

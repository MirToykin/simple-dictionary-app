import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {Text, View} from "react-native";
import LoginScreen from "../screens/LoginScreen";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store/configureStore";

const Stack = createStackNavigator()

const HomeScreen = () => {
  return (
    <View>
      <Text>Home page</Text>
    </View>
  )
}

const RootNavigator = () => {
  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      {isAuth ? (
        <>
          <Stack.Screen name="Главная" component={HomeScreen}/>
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

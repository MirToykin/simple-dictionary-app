import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {Text, View} from "react-native";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator()

// const LoginScreen = () => (
//   <View style={{
//     flex:1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }}>
//     <Text>Вход</Text>
//   </View>
// )

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Вход" component={LoginScreen} />
  </Stack.Navigator>
)

export default RootNavigator;

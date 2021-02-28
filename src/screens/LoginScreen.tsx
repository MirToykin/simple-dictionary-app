import React from 'react';
import {Text, View} from "react-native";
import LoginForm from "../components/forms/LoginForm";

const LoginScreen = () => {

  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Авторизация</Text>
      <LoginForm/>
    </View>
  );
};

export default LoginScreen;

import React, {useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import LoginForm from "../components/forms/LoginForm";

const LoginScreen = () => {

  const ajax = axios.create({
    baseURL: "http://api-simpledictionary.ru/api/"
  })

  const onSignInPress = () => {
    console.log('pressed')
    ajax.post('login', {
      email: 'miroslav.toykin@gmail.com',
      password: 'Njqrby6022'
    }).then(res => {
      console.log(res.data.user)
    })
  }

  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Авторизация</Text>
      <LoginForm/>
      <TouchableOpacity
        // style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          onSignInPress()
        }}
      >
        <Text>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

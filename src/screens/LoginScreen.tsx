import React, {useEffect} from 'react';
import {Text, View} from "react-native";

const LoginScreen = () => {
  useEffect(() => {
    fetch('http://api-simpledictionary.ru/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'miroslav.toykin@gmail.com',
        password: 'Njqrby6022',
        rememberMe: false
      }),
    }).then(data => {
        return data.json();
    }).then(json => {
        console.log(json);
    })
  })
  return (
    <View style={{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>Войти</Text>
    </View>
  );
};

export default LoginScreen;

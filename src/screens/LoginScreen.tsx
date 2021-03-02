import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import LoginForm from "../components/forms/LoginForm";
import {Icon} from "react-native-elements";

const LoginScreen = () => {

  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name='book'
        type='font-awesome'
        color='#fe9700'
        size={60}
      />
      <LoginForm/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#303030',
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  icon: {
    marginBottom: 30
  }
})

export default LoginScreen;

import React, {FC} from 'react';
import {Icon} from "react-native-elements";
import LoginForm from "../components/forms/LoginForm";
import {StyleSheet, View} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigators/RootNavigator";
import RegistrationForm from "../components/forms/RegistrationForm";
import ResetPwdForm from "../components/forms/ResetPwdForm";

type TProps = {
  type: string,
  navigation: StackNavigationProp<RootStackParamList, 'LogIn' | 'Registration' | 'ResetPwd'>
}

const AuthScreen: FC<TProps> = ({type, navigation}) => {
  return (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name='book'
        type='font-awesome'
        color='#fe9700'
        size={60}
      />
      {type === 'login' && <LoginForm navigation={navigation}/>}
      {type === 'registration' && <RegistrationForm navigation={navigation}/>}
      {type === 'reset' && <ResetPwdForm navigation={navigation}/>}
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

export default AuthScreen;

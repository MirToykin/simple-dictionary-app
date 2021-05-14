import React, {FC} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
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
    <View style={styles.title}>
      <FontAwesomeIcon
        style={styles.icon}
        name='book'
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
  title: {
    backgroundColor: '#303030',
    flex:1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  icon: {
    marginBottom: 30,
    textAlign: "center"
  }
})

export default AuthScreen;

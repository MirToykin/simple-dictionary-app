import React, {FC} from 'react';
import AuthScreen from "./AuthScreen";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigators/RootNavigator";

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LogIn'>
}

const LoginScreen: FC<TProps> = ({navigation}) => {

  return (
    <AuthScreen
      type={'login'}
      navigation={navigation}
    />
  );
};

export default LoginScreen;

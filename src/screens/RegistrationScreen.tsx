import React, {FC} from 'react';
import AuthScreen from "./AuthScreen";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigators/RootNavigator";

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LogIn'>
}

const RegistrationScreen: FC<TProps> = ({navigation}) => {

  return (
    <AuthScreen
      type={'registration'}
      navigation={navigation}
    />
  );
};

export default RegistrationScreen;

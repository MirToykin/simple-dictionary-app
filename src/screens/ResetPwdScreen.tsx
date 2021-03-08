import React, {FC} from 'react';
import AuthScreen from "./AuthScreen";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigators/RootNavigator";

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ResetPwd'>
}

const ResetPwdScreen: FC<TProps> = ({navigation}) => {

  return (
    <AuthScreen
      type={'reset'}
      navigation={navigation}
    />
  );
};

export default ResetPwdScreen;

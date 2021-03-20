import React from 'react';
import {Header, Icon} from "react-native-elements";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {primaryColor, secondaryBackgroundColor} from "../assets/styles";

const AppHeader = () => {
  const navigation = useNavigation()
  const screenName = useNavigationState((state) => state.routes[state.index].name)

  return (
    <Header
      leftComponent={{ icon: 'menu', color: primaryColor, onPress: () => {navigation.toggleDrawer()} }}
      centerComponent={{ textWrapper: screenName, style: { color: '#fff', fontSize: 18 } }}
      rightComponent={{ icon: 'search', color: primaryColor}}
      backgroundColor={secondaryBackgroundColor}
    />
  );
};

export default AppHeader;

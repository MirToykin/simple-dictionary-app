import React from 'react';
import {Header, Icon} from "react-native-elements";
import { useNavigation, useNavigationState } from '@react-navigation/native';

const AppHeader = () => {
  const navigation = useNavigation()
  const screenName = useNavigationState((state) => state.routes[state.index].name)

  return (
    <Header
      leftComponent={{ icon: 'menu', color: '#fff', onPress: () => {navigation.toggleDrawer()} }}
      centerComponent={{ text: screenName, style: { color: '#fff', fontSize: 18 } }}
      rightComponent={{ icon: 'search', color: '#fff'}}
    />
  );
};

export default AppHeader;

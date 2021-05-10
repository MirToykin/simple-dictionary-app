import React from 'react';
import {Header, Icon} from "react-native-elements";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {primaryColor, secondaryBackgroundColor} from "../assets/styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store/configureStore";
import {dictionariesRoute} from "../navigators/constants";

const AppHeader = () => {
  const navigation = useNavigation()
  const mainRoute = useNavigationState((state) => state.routes[state.index].name)
  const isTabs = mainRoute === dictionariesRoute
  const activeTab = useSelector((state: AppStateType) => state.words.currentTab)
  const count = useSelector((state: AppStateType) => state.words[activeTab].length)
  const centerComponent = isTabs ? { text: `Слов в категории: ${count}`, style: { color: '#fff', fontSize: 18 } } : undefined

  return (
    <Header
      leftComponent={{ icon: 'menu', color: primaryColor, onPress: () => {navigation.toggleDrawer()} }}
      centerComponent={centerComponent}
      rightComponent={{ icon: 'search', color: primaryColor}}
      backgroundColor={secondaryBackgroundColor}
    />
  );
};

export default AppHeader;

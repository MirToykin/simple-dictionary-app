import React from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import {primaryColor, secondaryBackgroundColor} from "../assets/styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store/configureStore";
import {dictionariesRoute} from "../navigators/constants";
import {HEADER_HEIGHT} from "../constants";
import {StatusBar, StyleSheet, Text, View} from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons'
import FontistoIcon from 'react-native-vector-icons/Fontisto'

const Header = () => {
  const navigation = useNavigation()
  const mainRoute = useNavigationState((state) => state.routes[state.index].name)
  const isTabs = mainRoute === dictionariesRoute
  const activeTab = useSelector((state: AppStateType) => state.words.currentTab)
  const count = useSelector((state: AppStateType) => state.words[activeTab].length)

  return (
    <>
      <StatusBar backgroundColor={secondaryBackgroundColor}/>
      <View style={styles.container}>
        <View>
          <IonIcon
            name={'md-menu-outline'}
            size={30}
            color={primaryColor}
            onPress={() => {navigation.toggleDrawer()}}
          />
        </View>
        <View>
          <Text style={styles.headerText}>{isTabs ? `Слов в категории: ${count}` : ''}</Text>
        </View>
        <View><FontistoIcon name={'search'} size={20} color={primaryColor}/></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    height: HEADER_HEIGHT,
    backgroundColor: secondaryBackgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  headerText: {
    color: '#fff',
    fontSize: 18
  }
})

export default Header;

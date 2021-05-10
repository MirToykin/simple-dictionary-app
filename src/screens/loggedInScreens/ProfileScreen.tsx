import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {AuthActionType, logout} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "../../components/AppHeader";
//@ts-ignore
import UserPhoto from '../../assets/images/user.png'

const ProfileScreen = () => {
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()
  const {name, email} = useSelector((state: AppStateType) => state.auth)

  const handleLogout = () => {
    thunkDispatch(logout())
  }

  const renderRow = (cells: any) => {
    return cells.map((cell: any) => (
      <View style={styles.cell} key={cell.title}>
        <Text style={styles.cellTitle}>{cell.title}</Text>
        <Text style={styles.cellValue}>{cell.value}</Text>
      </View>
    ));
  };

  return (
    <>
      <AppHeader/>
      <View style={styles.title}>
        <Image
          source={UserPhoto}
          style={styles.avatar}
          resizeMode={'contain'}
        />
        {renderRow([
          {title: 'Имя', value: name},
          {title: 'E-mail', value: email}
        ])}
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выход</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  cell: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellTitle: {
    fontSize: 13,
    color: '#b0b0b0',
  },
  cellValue: {
    marginTop: 10,
    fontSize: 16,
    color: '#2e2e2e',
  },
  logout: {
    marginTop: 15,
  },
  logoutText: {
    fontWeight: 'bold'
  }
})

export default ProfileScreen;

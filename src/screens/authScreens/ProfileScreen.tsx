import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {AuthActionType, logout} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "../../components/AppHeader";

const ProfileScreen = () => {
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()
  const options = useSelector((state: AppStateType) => state.auth.options)

  const handleLogout = () => {
    thunkDispatch(logout(options))
  }

  return (
    <>
      <AppHeader/>
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Профиль</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Выход</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default ProfileScreen;

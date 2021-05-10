import Api from "../../api/Api";
import {SET_AUTH_DATA} from "../constants";
import {setIsFetching, SetIsFetchingActionType} from "./appActions";
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from "../store/configureStore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api: any = new Api();

type SetAuthDataPayloadType = {
  id: number | null
  name: string | null
  email: string | null
  isAuth: boolean
  rememberMe: boolean
}

export type SetAuthDataActionType = {
  type: typeof SET_AUTH_DATA
  payload: SetAuthDataPayloadType
}

export type AuthActionType = SetAuthDataActionType | SetIsFetchingActionType
export type AuthThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionType>

export type TLoginData = {
  email: string,
  password: string,
  rememberMe?: boolean
}

export type TRegData = {
  name: string
  email: string,
  password: string,
  password_confirmation: string,
  rememberMe?: boolean
}

export const setAuthData = (payload: SetAuthDataPayloadType): SetAuthDataActionType => {
  return {
    type: SET_AUTH_DATA,
    payload
  }
}

export const login = (loginData: TLoginData): AuthThunkType => async (dispatch) => {
  dispatch(setIsFetching(true))
  try {
    const userData = await api.auth('login', loginData)
    const rememberMe = loginData.rememberMe

    await AsyncStorage.setItem('token', userData.token)

    dispatch(setAuthData({...userData, isAuth: true, rememberMe}))
  } catch (e) {
    let error;

    if (e.response && e.response.status === 401) {
      error = 'Неверный логин и/или пароль';
    } else {
      error = e.response && e.response.data.message;
    }

    dispatch(setIsFetching(false));
    throw new Error(error)
  }
  dispatch(setIsFetching(false));
}

export const register = (regData: TRegData): AuthThunkType => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const userData = await api.auth('register', regData)
    const rememberMe = regData.rememberMe;

    await AsyncStorage.setItem('token', userData.token)

    dispatch(setAuthData({...userData, isAuth: true, rememberMe}))
  } catch (e) {
    let error = 'Что-то пошло не так';
    if (e.response) {
      error = e.response.data.message
    }
    dispatch(setIsFetching(false))
    throw new Error(error)
  }
  dispatch(setIsFetching(false));
}

export const logout = (): AuthThunkType => async (dispatch) => {
  dispatch(setIsFetching(true));

  try {
    await api.logout();
    await AsyncStorage.removeItem('token')
  } catch (e) {

  }

  dispatch(setAuthData({
    id: null,
    name: null,
    email: null,
    isAuth: false,
    rememberMe: false
  }));
  // clearStorage();
  dispatch(setIsFetching(false));
}

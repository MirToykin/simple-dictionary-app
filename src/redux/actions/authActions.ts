import {SubmissionError} from "redux-form";
import Api from "../../api/Api";
import {SET_AUTH_DATA} from "../constants";
import {setIsFetching, SetIsFetchingActionType} from "./appActions";
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from "../store/configureStore";
import {OptionsType} from "../../types";

const api: any = new Api();

type SetAuthDataPayloadType = {
  id: number | null
  name: string | null
  email: string | null
  token: string | null
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
  rememberMe: boolean
}

export const setAuthData = (payload: SetAuthDataPayloadType): SetAuthDataActionType => {
  return {
    type: SET_AUTH_DATA,
    payload
  }
}

export const login = (loginData: TLoginData): AuthThunkType => async (dispatch, getState) => {
  dispatch(setIsFetching(true));
  try {
    const userData = await api.auth('login', loginData)
    const rememberMe = loginData.rememberMe
    const options:OptionsType = {
      headers: {
        "Authorization": `Bearer ${userData.token}`
      }
    }
    dispatch(setAuthData({...userData, isAuth: true, rememberMe, options}));
  } catch (e) {
    let error;

    if (e.response && e.response.status === 401) {
      error = 'Неверный логин или пароль!';
    } else {
      error = e.response && e.response.data.message;
    }

    throw new Error(error)
  }
  dispatch(setIsFetching(false));
}

export const register = (regData: TRegData): AuthThunkType => async (dispatch, getState) => {
  dispatch(setIsFetching(true));
  try {
    const userData = await api.auth('register', regData);
    const rememberMe = regData.rememberMe;
    const options:OptionsType = {
      headers: {
        "Authorization": `Bearer ${userData.token}`
      }
    }
    dispatch(setAuthData({...userData, isAuth: true, rememberMe, options}));
  } catch (e) {
    let error;
    if (e.response) {
      error = e.response.data.message
    }
    throw new SubmissionError({
      _error: error ? error : 'Что-то пошло не так'
    });
  }
  dispatch(setIsFetching(false));
}

// export const logout = (options: OptionsType): AuthThunkType => async (dispatch, getState) => {
export const logout = (options: any): AuthThunkType => async (dispatch, getState) => {
  dispatch(setIsFetching(true));

  try {
    await api.logout(options);
  } catch (e) {
    console.log(e.response.data.message);
  }

  dispatch(setAuthData({
    id: null,
    name: null,
    email: null,
    token: null,
    isAuth: false,
    rememberMe: false
  }));
  // clearStorage();
  dispatch(setIsFetching(false));
}

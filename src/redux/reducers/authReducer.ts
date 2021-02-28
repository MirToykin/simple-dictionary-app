import {SET_AUTH_DATA, SET_IS_FETCHING} from "../constants"
import {OptionsType} from "../../types";

let initialState = {
  id: null as number | null,
  name: null as string | null,
  email: null as string | null,
  isFetching: false,
  isAuth: false,
  token: null as string | null,
  rememberMe: false,
  options: null as OptionsType | null
}

// fixme - убрать isFetching в appReducer

export type InitialStateType = typeof initialState

const authReducer = (state: InitialStateType = initialState, action:any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {...state, ...action.payload}
    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload}
    default:
      return state
  }
}

export default authReducer

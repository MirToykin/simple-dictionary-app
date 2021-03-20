import {SET_AUTH_DATA} from "../constants"
import {SetAuthDataActionType} from "../actions/authActions";
import {OptionsType} from "../../types/types";

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

type ActionType = SetAuthDataActionType

const authReducer = (state: InitialStateType = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default authReducer

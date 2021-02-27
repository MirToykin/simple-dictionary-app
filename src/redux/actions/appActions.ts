import {SET_IS_FETCHING, SWITCH_COLOR_THEME} from "../constants";

export type SetIsFetchingActionType = {
  type: typeof SET_IS_FETCHING
  payload: boolean
}

export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching
  }
}

export type SwitchColorThemeActionType = {
  type: typeof SWITCH_COLOR_THEME
}
export const switchColorTheme = ():SwitchColorThemeActionType => {
  return {
    type: SWITCH_COLOR_THEME
  }
}

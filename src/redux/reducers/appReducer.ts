import {SET_IS_FETCHING, SWITCH_COLOR_THEME} from "../constants";
import {SetIsFetchingActionType, SwitchColorThemeActionType} from "../actions/appActions";

let initialState = {
  isFetching: false,
  darkState: false,
}

type InitialStateType = typeof initialState

type ActionType = SetIsFetchingActionType | SwitchColorThemeActionType

const authReducer = (state :InitialStateType = initialState, action: ActionType):InitialStateType => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return {...state, isFetching: action.payload};
    case SWITCH_COLOR_THEME:
      return {...state, darkState: !state.darkState};
    default:
      return state;
  }
}

export default authReducer

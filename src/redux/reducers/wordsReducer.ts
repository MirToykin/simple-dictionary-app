import {
  DELETE_WORD_FROM_STATE,
  ADD_WORD_TO_STATE,
  ADD_SET,
  UPDATE_WORD_IN_STATE,
  SET_SEARCH_INPUT,
  PUSH_TO_ADDED_MEANINGS,
  DELETE_FROM_ADDED_MEANINGS,
  SET_ADDED_MEANINGS,
  SET_SET_SIZE,
  SHUFFLE_SET,
  SET_SELECTED_WORD,
  SET_CURRENT_TAB_WORDS_COUNT
} from "../constants"
import {SetNameType, WordType} from "../../types/types"
import {
  AddSetActionType,
  AddWordToStateActionType,
  DeleteFromAddedMeaningsActionType,
  DeleteWordFromStateActionType,
  PushToAddedMeaningsActionType,
  SetAddedMeaningsActionType,
  SetSearchInputActionType,
  TSetCurrentTabAction,
  TSetSelectedWordAction,
  TSetSetSizeAction,
  TShuffleSetAction,
  UpdateWordInStateActionType
} from "../actions/wordsActions"

let initialState = {
  next: [] as Array<WordType>,
  current: [] as Array<WordType>,
  done: [] as Array<WordType>,
  searchInput: '',
  addedMeanings: [] as Array<string>,
  setSize: 30 as number,
  selectedWord: null as WordType | null,
  currentTab: 'done' as SetNameType
}

type ActionType = AddSetActionType | SetSearchInputActionType | PushToAddedMeaningsActionType |
  DeleteFromAddedMeaningsActionType | SetAddedMeaningsActionType | TSetSetSizeAction | TShuffleSetAction |
  DeleteWordFromStateActionType | AddWordToStateActionType | UpdateWordInStateActionType | TSetSelectedWordAction |
  TSetCurrentTabAction

type InitialStateType = typeof initialState

const wordsReducer = (state:InitialStateType = initialState, action:ActionType): InitialStateType => {
  switch (action.type) {
    case ADD_SET:
      return {...state, [action.payload.setName]: action.payload.set}
    case ADD_WORD_TO_STATE:
      return {...state, [action.payload.set]: [...state[action.payload.set], action.payload.word]}
    case DELETE_WORD_FROM_STATE:
      return {...state, [action.payload.set]: state[action.payload.set].filter(word => !action.payload.wordIds.includes(word.id))}
    case UPDATE_WORD_IN_STATE:
      return {...state, [action.payload.category]: state[action.payload.category].map((word:WordType) => {
          if (word.id === action.payload.id) {
            return action.payload
          }
          return word
        })}
    case SET_SEARCH_INPUT:
      return {...state, searchInput: action.payload}
    case PUSH_TO_ADDED_MEANINGS:
      return {...state, addedMeanings: [...state.addedMeanings, action.payload]}
    case DELETE_FROM_ADDED_MEANINGS:
      return {...state, addedMeanings: state.addedMeanings.filter(meaning => meaning !== action.payload)}
    case SET_ADDED_MEANINGS:
      return {...state, addedMeanings: action.payload}
    case SET_SET_SIZE:
      return {...state, setSize: action.payload}
    case SHUFFLE_SET:
      return {...state, [action.payload]: state[action.payload].sort((a, b) => 0.5 - Math.random())}
    case SET_SELECTED_WORD:
      return {...state, selectedWord: action.payload}
    case SET_CURRENT_TAB_WORDS_COUNT:
      return {...state, currentTab: action.payload}
    default:
      return state
  }
}

export default wordsReducer

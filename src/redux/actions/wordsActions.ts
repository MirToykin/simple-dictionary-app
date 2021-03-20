import {SubmissionError} from "redux-form"
import {setIsFetching, SetIsFetchingActionType} from "./appActions"
import Api, {TApi} from "../../api/Api"
import {
  ADD_SET,
  ADD_WORD_TO_STATE, SET_ADDED_MEANINGS, DELETE_FROM_ADDED_MEANINGS,
  DELETE_WORD_FROM_STATE, PUSH_TO_ADDED_MEANINGS, SET_SEARCH_INPUT, UPDATE_WORD_IN_STATE, SET_SET_SIZE, SHUFFLE_SET
} from "../constants"
import {SetAuthDataActionType, setAuthData} from "./authActions"
import {OptionsType, SetNameType, WordType} from "../../types/types"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store/configureStore"

const api: TApi = new Api()

export type TGetSet = SetIsFetchingActionType | AddSetActionType | SetAuthDataActionType
export type GetSetThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TGetSet>
export type GetSetThunkCreatorType = (uid: number, options: OptionsType) => GetSetThunkType
// export type TGetSetActions = SetIsFetchingActionType | AddSetActionType // возможно лишний тип, исползуется для типизации dispatch в SetPage

export const getSet = (set: SetNameType): GetSetThunkCreatorType => (uid, options) => async (dispatch, getState) => {
  dispatch(setIsFetching(true))
  try {
    const words = await api.getSet(set, uid, options)
    dispatch(addSet(set, words))
  } catch(e) {
    if (e.response && e.response.status === 401) {
      dispatch(setAuthData({
        id: null,
        name: null,
        email: null,
        token: null,
        isAuth: false,
        rememberMe: false
      }))
    }
  }
  dispatch(setIsFetching(false))
}

export type TAddToSetData = {
  meanings: string
  title: string
  user_id: number
}
export type TAddToSet = SetIsFetchingActionType | AddWordToStateActionType | SetAuthDataActionType
export type AddToSetThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TAddToSet>
export type addToSetThunkCreatorType = (data: TAddToSetData, options: OptionsType) => AddToSetThunkType
export type TAddToSetActions = SetIsFetchingActionType | AddSetActionType

// export const addToSet = (set: SetNameType): addToSetThunkCreatorType => (data, options) => async (dispatch) => {
//   dispatch(setIsFetching(true))
//   const newData: any = {...data, category: set}
//
//   try {
//     const word = await api.addToSet(newData, options)
//     dispatch(addWordToState(set, word))
//   } catch (e) {
//     if (e.response && e.response.status === 401) {
//       dispatch(setAuthData({
//         id: null,
//         name: null,
//         email: null,
//         token: null,
//         isAuth: false,
//         rememberMe: false
//       }))
//     }
//     throw new SubmissionError({
//       _error: e.response.data.message
//     })
//   }
//   dispatch(setIsFetching(false))
// }
export type TEditWordData = {
  meanings?: string
  category?: SetNameType
}
export type TEditWord = SetIsFetchingActionType | DeleteWordFromStateActionType | UpdateWordInStateActionType| SetAuthDataActionType
export type EditWordThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TEditWord>

// export const editWord = (setToRemoveFrom: SetNameType, wordId: number, data:TEditWordData, options: OptionsType): EditWordThunkType => async (dispatch) => {
//   dispatch(setIsFetching(true))
//   try {
//     const word = await api.editWord(wordId, data, options)
//
//     dispatch(updateWordInState(word))
//
//   } catch (e) {
//     if (e.response && e.response.status === 401) {
//       dispatch(setAuthData({
//         id: null,
//         name: null,
//         email: null,
//         token: null,
//         isAuth: false,
//         rememberMe: false
//       }))
//     }
//   }
//   dispatch(setIsFetching(false))
// }


export type TMoveAndDeleteWords = SetIsFetchingActionType | DeleteWordFromStateActionType| SetAuthDataActionType
export type MoveWordsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TMoveAndDeleteWords>

// export const moveWords = (idsArr: Array<number>, setToMove: SetNameType, setToRemoveFrom: SetNameType, options: OptionsType): MoveWordsThunkType => async (dispatch) => {
//   dispatch(setIsFetching(true))
//   const data = {
//     idsArr,
//     setToMove
//   }
//   try {
//     const updatedWordsIds = await api.moveWords(data, options)
//     dispatch(deleteWordsFromState(setToRemoveFrom, updatedWordsIds))
//
//   } catch (e) {
//     if (e.response && e.response.status === 401) {
//       dispatch(setAuthData({
//         id: null,
//         name: null,
//         email: null,
//         token: null,
//         isAuth: false,
//         rememberMe: false
//       }))
//     }
//   }
//   dispatch(setIsFetching(false))
// }

export type TDeleteWord = SetIsFetchingActionType | DeleteWordFromStateActionType | SetAuthDataActionType
export type DeleteWordThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TMoveAndDeleteWords>

// export const deleteWords = (set:SetNameType, wordIds: Array<number>, options: OptionsType): DeleteWordThunkType => async (dispatch: any) => {
//   dispatch(setIsFetching(true))
//   try {
//     const deletedWords = await api.deleteWord(wordIds, options)
//     dispatch(deleteWordsFromState(set, deletedWords))
//   } catch (e) {
//     if (e.response && e.response.status === 401) {
//       dispatch(setAuthData({
//         id: null,
//         name: null,
//         email: null,
//         token: null,
//         isAuth: false,
//         rememberMe: false
//       }))
//     }
//   }
//   dispatch(setIsFetching(false))
// }


export type SetSearchInputActionType = {
  type: typeof SET_SEARCH_INPUT
  payload: string
}
export const setSearchInput = (payload: string): SetSearchInputActionType => {
  return {
    type: SET_SEARCH_INPUT,
    payload
  }
}

export type PushToAddedMeaningsActionType = {
  type: typeof PUSH_TO_ADDED_MEANINGS
  payload: string
}
export const pushToAddedMeanings = (payload: string): PushToAddedMeaningsActionType => {
  return {
    type: PUSH_TO_ADDED_MEANINGS,
    payload
  }
}

export type DeleteFromAddedMeaningsActionType = {
  type: typeof DELETE_FROM_ADDED_MEANINGS
  payload: string
}
export const deleteFromAddedMeanings = (payload: string):DeleteFromAddedMeaningsActionType => {
  return {
    type: DELETE_FROM_ADDED_MEANINGS,
    payload
  }
}

export type SetAddedMeaningsActionType = {
  type: typeof SET_ADDED_MEANINGS
  payload: Array<string>
}
export const setAddedMeanings = (payload:Array<string>):SetAddedMeaningsActionType => {
  return {
    type: SET_ADDED_MEANINGS,
    payload
  }
}

type AddSetPayloadType = {
  setName: SetNameType
  set: Array<WordType>
}
export type AddSetActionType = {
  type: typeof ADD_SET
  payload: AddSetPayloadType
}
const addSet = (setName:SetNameType, set: Array<WordType>):AddSetActionType => {
  return {
    type: ADD_SET,
    payload: {setName, set}
  }
}

type DeleteWordFromStatePayloadType = {
  set: SetNameType
  wordIds: Array<number>
}
export type DeleteWordFromStateActionType = {
  type: typeof DELETE_WORD_FROM_STATE
  payload: DeleteWordFromStatePayloadType
}
const deleteWordsFromState = (set: SetNameType, wordIds: Array<number>):DeleteWordFromStateActionType => {
  return {
    type: DELETE_WORD_FROM_STATE,
    payload: {set, wordIds}
  }
}

type AddWordToStatePayloadType = {
  set: SetNameType
  word: WordType
}
export type AddWordToStateActionType = {
  type: typeof ADD_WORD_TO_STATE
  payload: AddWordToStatePayloadType
}
const addWordToState = (set: SetNameType, word: WordType): AddWordToStateActionType => {
  return {
    type: ADD_WORD_TO_STATE,
    payload: {set, word}
  }
}

export type UpdateWordInStateActionType = {
  type: typeof UPDATE_WORD_IN_STATE
  payload: WordType
}
const updateWordInState = (payload: WordType): UpdateWordInStateActionType => {
  return {
    type: UPDATE_WORD_IN_STATE,
    payload
  }
}

export type TSetSetSizeAction = {
  type: typeof SET_SET_SIZE
  payload: number
}
export const setSetSize = (payload: number): TSetSetSizeAction => {
  return {
    type: SET_SET_SIZE,
    payload
  }
}

export type TShuffleSetAction = {
  type: typeof SHUFFLE_SET,
  payload: SetNameType
}
export const shuffleSet = (payload: SetNameType): TShuffleSetAction => {
  return {
    type: SHUFFLE_SET,
    payload
  }
}
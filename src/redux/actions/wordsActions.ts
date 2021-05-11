import {SubmissionError} from "redux-form"
import {setIsFetching, SetIsFetchingActionType} from "./appActions"
import Api, {TApi} from "../../api/Api"
import {
  ADD_SET,
  ADD_WORD_TO_STATE,
  SET_ADDED_MEANINGS,
  DELETE_FROM_ADDED_MEANINGS,
  DELETE_WORD_FROM_STATE,
  PUSH_TO_ADDED_MEANINGS,
  SET_SEARCH_INPUT,
  UPDATE_WORD_IN_STATE,
  SET_SET_SIZE,
  SHUFFLE_SET,
  SET_SELECTED_WORD,
  RESET_ADD_WORD_FORM, SET_CURRENT_TAB_WORDS_COUNT
} from "../constants"
import {SetAuthDataActionType, setAuthData} from "./authActions"
import {SetNameType, WordType} from "../../types/types"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "../store/configureStore"

const api: TApi = new Api()

export type TGetSet = SetIsFetchingActionType | AddSetActionType | SetAuthDataActionType
export type GetSetThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TGetSet>
export type GetSetThunkCreatorType = (uid: number) => GetSetThunkType
// export type TGetSetActions = SetIsFetchingActionType | AddSetActionType // возможно лишний тип, исползуется для типизации dispatch в SetPage

export const getSet = (set: SetNameType): GetSetThunkCreatorType => (uid) => async (dispatch, getState) => {
  dispatch(setIsFetching(true))
  try {
    const words = await api.getSet(set, uid)
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
export type AddToSetThunkType = ThunkAction<Promise<string|undefined>, AppStateType, unknown, TAddToSet>
export type addToSetThunkCreatorType = (data: TAddToSetData) => AddToSetThunkType
export type TAddToSetActions = SetIsFetchingActionType | AddSetActionType

export const addToSet = (set: SetNameType): addToSetThunkCreatorType => (data) => async (dispatch) => {
  dispatch(setIsFetching(true))
  const newData: any = {...data, category: set}

  try {
    const word = await api.addToSet(newData)
    dispatch(addWordToState(set, word))
    dispatch(setIsFetching(false))
    return new Promise<string>(resolve => {
      resolve('Слово успешно добавлено')
    })
  } catch (e) {
    if (e.response && e.response.status === 401) {
      dispatch(setAuthData({
        id: null,
        name: null,
        email: null,
        token: null,
        isAuth: false,
        rememberMe: false
      }))
    } else {
      let error = e.response && e.response.data.message;
      throw new Error(error ? error : 'Не удалось сохранить слово')
    }
  }
  dispatch(setIsFetching(false))
}
export type TEditWordData = {
  meanings?: string
  category?: SetNameType
}
export type TEditWord = SetIsFetchingActionType | DeleteWordFromStateActionType | UpdateWordInStateActionType| SetAuthDataActionType
export type EditWordThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TEditWord>

export const editWord = (setToRemoveFrom: SetNameType, wordId: number, data:TEditWordData): EditWordThunkType => async (dispatch) => {
  dispatch(setIsFetching(true))
  try {
    const word = await api.editWord(wordId, data)

    dispatch(updateWordInState(word))

  } catch (e) {
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


export type TMoveAndDeleteWords = SetIsFetchingActionType | DeleteWordFromStateActionType| SetAuthDataActionType
export type MoveWordsThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TMoveAndDeleteWords>

export const moveWords = (idsArr: Array<number>, setToMove: SetNameType, setToRemoveFrom: SetNameType): MoveWordsThunkType => async (dispatch) => {
  dispatch(setIsFetching(true))
  const data = {
    idsArr,
    setToMove
  }
  try {
    const updatedWordsIds = await api.moveWords(data)
    dispatch(deleteWordsFromState(setToRemoveFrom, updatedWordsIds))

  } catch (e) {
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

export type TDeleteWord = SetIsFetchingActionType | DeleteWordFromStateActionType | SetAuthDataActionType
export type DeleteWordThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TMoveAndDeleteWords>

export const deleteWords = (set:SetNameType, wordIds: Array<number>): DeleteWordThunkType => async (dispatch: any) => {
  dispatch(setIsFetching(true))
  try {
    const deletedWords = await api.deleteWord(wordIds)
    dispatch(deleteWordsFromState(set, deletedWords))
  } catch (e) {
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

export type TSetSelectedWordAction = {
  type: typeof SET_SELECTED_WORD,
  payload: WordType | null
}
export const setSelectedWord = (payload: WordType): TSetSelectedWordAction => {
  return {
    type: SET_SELECTED_WORD,
    payload
  }
}

export type TResetAddWordFormAction = {
  type: typeof RESET_ADD_WORD_FORM
}

export const resetAddWordForm = (): TResetAddWordFormAction => {
  return {
    type: RESET_ADD_WORD_FORM
  }
}

export type TSetCurrentTabAction = {
  type: typeof SET_CURRENT_TAB_WORDS_COUNT,
  payload: SetNameType
}

export const setCurrentTab = (payload: SetNameType): TSetCurrentTabAction => {
  return {
    type: SET_CURRENT_TAB_WORDS_COUNT,
    payload
  }
}

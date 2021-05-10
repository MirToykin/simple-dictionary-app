import axios, {AxiosInstance, AxiosResponse} from "axios";
import {TLoginData, TRegData} from "../redux/actions/authActions";
import {SetNameType, WordType} from "../types/types";
import {TAddToSetData, TEditWordData} from "../redux/actions/wordsActions";
import AsyncStorage from '@react-native-async-storage/async-storage';

type TGetSetResponse = {
  words: Array<WordType>
}

type TAuthResponse = {
  user: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    token: string
    updated_at: string | null
    created_at: string | null
  }
}

type TAddAndEditResponse = {
  word: WordType
}

type TMoveResponse = {
  updatedWords: Array<number>
}

type TDeleteResponse = {
  deletedWords: Array<number>
}

class Api {
  ajax: AxiosInstance

  constructor() {
    // this.ajax = axios.create({
    let instance = axios.create({
      baseURL: "http://api-simpledictionary.ru/api/"
    });

    instance.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('token')

        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      })
    this.ajax = instance
  }

  getSet(set: SetNameType, uid: number) {
    return this.ajax.get<TGetSetResponse>(`words/${set}/${uid}`).then(res => res.data.words)
  }

  auth(endpoint: string, data: TLoginData | TRegData) {
    return this.ajax.post<TAuthResponse>(endpoint, data).then(res => res.data.user)
  }

  logout() {
    this.ajax.post('logout', null)
  }

  addToSet(data: TAddToSetData) {
    return this.ajax.post<TAddAndEditResponse>(`words`, data).then(res => res.data.word)
  }

  editWord(wordId: number, data: TEditWordData) {
    return this.ajax.patch<TAddAndEditResponse>(`words/${wordId}`, data).then(res => res.data.word)
  }

  moveWords(data: { idsArr: Array<number>, setToMove: SetNameType }) {
    return this.ajax.post<TMoveResponse>(`words/move`, data).then(res => res.data.updatedWords)
  }

  deleteWord(wordIds: Array<number>) {
    return this.ajax.post<TDeleteResponse>(`words/delete`, {idsArr: wordIds}).then(res => res.data.deletedWords)
  }

}

const apiInstance = new Api()

export type TApi = typeof apiInstance

export default Api;



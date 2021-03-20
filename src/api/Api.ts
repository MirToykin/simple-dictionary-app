import axios, {AxiosInstance, AxiosResponse} from "axios";
import {TLoginData, TRegData} from "../redux/actions/authActions";
import {OptionsType, SetNameType, WordType} from "../types/types";

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

// type TAddAndEditResponse = {
//   word: WordType
// }

type TMoveResponse = {
  updatedWords: Array<number>
}

type TDeleteResponse = {
  deletedWords: Array<number>
}

class Api {
  ajax: AxiosInstance

  constructor() {
    this.ajax = axios.create({
      baseURL: "http://api-simpledictionary.ru/api/"
    });
  }

  getSet(set: SetNameType, uid: number, options: OptionsType) {
    return this.ajax.get<TGetSetResponse>(`words/${set}/${uid}`, options).then(res => res.data.words)
  }

  auth(endpoint: string, data: TLoginData | TRegData) {
    return this.ajax.post<TAuthResponse>(endpoint, data).then(res => res.data.user)
  }

  logout(options: OptionsType) {
    this.ajax.post('logout', null, options)
  }

  // addToSet(data: TAddToSetData, options: OptionsType) {
  //   return this.ajax.post<TAddAndEditResponse>(`words`, data, options).then(res => res.data.word)
  // }
  //
  // editWord(wordId: number, data: TEditWordData, options: OptionsType) {
  //   return this.ajax.patch<TAddAndEditResponse>(`words/${wordId}`, data, options).then(res => res.data.word)
  // }
  //
  // moveWords(data: {idsArr: Array<number>, setToMove: SetNameType}, options: OptionsType) {
  //   return this.ajax.post<TMoveResponse>(`words/move`, data, options).then(res => res.data.updatedWords)
  // }
  //
  // deleteWord(wordIds: Array<number>, options: OptionsType) {
  //   return this.ajax.post<TDeleteResponse>(`words/delete`,{idsArr: wordIds}, options).then(res => res.data.deletedWords)
  // }

}

const apiInstance = new Api()

export type TApi = typeof apiInstance

export default Api;



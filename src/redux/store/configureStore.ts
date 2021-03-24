import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import authReducer from "../reducers/authReducer";
import appReducer from "../reducers/appReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import wordsReducer from "../reducers/wordsReducer";
import {RESET_ADD_WORD_FORM} from "../constants";

const rootReducer = combineReducers({
  form: formReducer.plugin({
    AddWordForm: (state, action) => {
      switch (action.type) {
        case RESET_ADD_WORD_FORM:
          return undefined
        default:
          return state
      }
    }
  }),
  auth: authReducer,
  app: appReducer,
  words: wordsReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const configureStore = () => {
  const middlewares = [thunk];

  const store = createStore(persistedReducer, applyMiddleware(...middlewares));
  const persistor = persistStore(store);

  return {store, persistor};
};

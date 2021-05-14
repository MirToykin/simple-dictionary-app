import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {errorColor, textPrimaryColor, textSecondaryColor} from "./styles";
import React, {FC} from "react";
import {Dispatch} from "redux";
import {change, FormAction} from "redux-form";
import {
  deleteFromAddedMeanings,
  DeleteFromAddedMeaningsActionType,
  pushToAddedMeanings,
  PushToAddedMeaningsActionType
} from "../redux/actions/wordsActions";
import {useDispatch} from "react-redux";

const mapTranslationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  delete: {
    marginRight: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    color: textPrimaryColor
  },
  textContainer: {

  }
})


type TMapTranslationProps = {
  item: string
  i: number
  arr: Array<string>
  allowDeleteLast?: boolean
}
export const MapTranslation: FC<TMapTranslationProps> = ({item, i, arr, allowDeleteLast}) => {
  const dispatch: Dispatch<DeleteFromAddedMeaningsActionType> = useDispatch()

  return (
    <TouchableOpacity style={mapTranslationStyles.container} activeOpacity={1}>
      {(arr.length > 1 || allowDeleteLast) &&
      <TouchableOpacity
        style={mapTranslationStyles.delete}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={() => dispatch(deleteFromAddedMeanings(item))}
      >
        <AntDesignIcon
          name='delete'
          size={23}
          color={errorColor}
        />
      </TouchableOpacity>
      }
      <View style={mapTranslationStyles.textContainer}>
        <Text style={mapTranslationStyles.text}>{item}</Text>
      </View>
    </TouchableOpacity>
  )
}

type TDispatch = Dispatch<FormAction | PushToAddedMeaningsActionType>
type TFormName = 'AddToSetForm' | 'AddMeaningForm' | 'TestForm' | 'AddWordForm'
type TOnAddMeaning = (meaning: string, dispatch: TDispatch, formName: TFormName, repeatValue: boolean) => void
export const onAddMeaning: TOnAddMeaning = (meaning, dispatch, formName, repeatValue) => {
  if (!meaning || repeatValue) return;
  dispatch(change(formName, 'meaning', ''));
  dispatch(pushToAddedMeanings(meaning.toLowerCase()));
}

export const handleAddMeaning = (addedMeanings: Array<string>, meaningValue: string, onAddMeaning: TOnAddMeaning, dispatch: TDispatch, formName: TFormName, correctMeaningValue: boolean) => {
  const repeat = addedMeanings.includes(meaningValue);
  correctMeaningValue && onAddMeaning(meaningValue, dispatch, formName, repeat);
}

export const showAlert = (title: string, message: string, confirmBtnText: string, confirmBtnAction: ()=>void) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "Отмена",
        style: "cancel"
      },
      { text: confirmBtnText,
        onPress: confirmBtnAction,
        style: "default" }
    ]
  )
}

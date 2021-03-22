import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {errorColor, textPrimaryColor, textSecondaryColor} from "./styles";
import React from "react";
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


export type TMapTranslations = (item: string, i: number, arr: Array<string>) => Element
export const mapTranslations: TMapTranslations = (item, i, arr) => {
  const dispatch: Dispatch<DeleteFromAddedMeaningsActionType> = useDispatch()

  return (
    <View style={mapTranslationStyles.container} key={item}>
      {arr.length > 1 && <TouchableOpacity
        style={mapTranslationStyles.delete}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={() => dispatch(deleteFromAddedMeanings(item))}
      >
        <Icon
          name='delete'
          type='antdesign'
          color={errorColor}
        />
      </TouchableOpacity>}
      <View style={mapTranslationStyles.textContainer}>
        <Text style={mapTranslationStyles.text}>{item}</Text>
      </View>
    </View>
  )
}

type TDispatch = Dispatch<FormAction | PushToAddedMeaningsActionType>
type TFormName = 'AddToSetForm' | 'AddMeaningForm' | 'TestForm'
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

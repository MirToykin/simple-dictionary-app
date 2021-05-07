import React, {FC, useEffect} from 'react';

import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import {errorColor, secondaryColor, successColor, textPrimaryColor,} from "../../assets/styles";
import {OptionsType, SetNameType, TSliderSpacer, WordType} from "../../types/types";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from "react-native-reanimated";
import {showAlert} from "../../assets/helpers";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import {
  deleteWords,
  moveWords,
  setSelectedWord,
  TMoveAndDeleteWords,
  TSetSelectedWordAction
} from "../../redux/actions/wordsActions";
import {Dispatch} from "redux";
import {ACTION_BUTTON_SIZE} from "../../constants";


type TSetData = {
  title: string
  icon: {
    name: string
    type: string
  }
}
type TProps = {
  setModalShown: (shown: boolean) => void
  isSlider: boolean
  shownSlideWord: WordType | null
  shownSlideWordIndex: number | null
  flatListRef: any
}

const CardActionButtons: FC<TProps> = ({
                                         setModalShown, isSlider, shownSlideWord,
                                         shownSlideWordIndex, flatListRef
}) => {
  const options = useSelector((state: AppStateType) => state.auth.options)
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const dispatch: Dispatch<TSetSelectedWordAction> = useDispatch()

  const handleMove = (setToMoveTo: SetNameType): void => {
    // thunkDispatchMoveAndDelete(moveWords([word.id], setToMoveTo, 'current', options as OptionsType)).catch(() => {})
  }
  const handleMoveToDone = () => handleMove('done')
  const handleMoveToNext = () => handleMove('next')
  const handleChangeMeanings = () => {
    // dispatch(setSelectedWord(word))
    setModalShown(true)
  }
  const handleDelete = () => {
    thunkDispatchMoveAndDelete(deleteWords('current', [shownSlideWord ? shownSlideWord.id : 0], options as OptionsType)).catch(() => {})
      .then(() => {
        if (shownSlideWordIndex !== null) {
          let targetIndex = shownSlideWordIndex == 1 ? ++shownSlideWordIndex : --shownSlideWordIndex
          flatListRef.scrollToIndex({index: targetIndex, animated: true})
        }
      })
    // setDeletedIndex(index)
  }

  type TActionButton = {
    name: string
    type: string
    color: string
    size: number
    onPress: () => void
  }
  const buttonsArray: Array<TActionButton> = [
    {
      name: 'angle-double-right',
      type: 'font-awesome',
      color: textPrimaryColor,
      size: 30,
      // onPress: () => {showAlert('Перемещение', `Переместить слово "${word.title}" в набор На очереди?`, 'Переместить', handleMoveToNext)}
      onPress: () => {console.log('press')}
    },
    {
      name: 'file-edit-outline',
      type: 'material-community',
      color: textPrimaryColor,
      size: 30,
      onPress: handleChangeMeanings
    },
    {
      name: 'delete',
      type: 'antdesign',
      color: errorColor,
      size: 30,
      onPress: () => showAlert('Удаление',`Удалить слово "${shownSlideWord && shownSlideWord.title}" из набора?`, 'Удалить', handleDelete)
    },
    {
      name: 'done-all',
      type: 'material',
      color: textPrimaryColor,
      size: 30,
      // onPress: () => {showAlert('Перемещение', `Переместить слово "${word.title}" в набор Изученные?`, 'Переместить', handleMoveToDone)}
      onPress: () => {}
    },
  ]

  return (
    <>
      {buttonsArray.map((item) => <TouchableOpacity style={styles.actionBtn} key={item.name} onPress={item.onPress}>
        <Icon
          name={item.name}
          type={item.type}
          size={item.size}
          color={item.color}
        />
      </TouchableOpacity>)}
    </>
  );
};

const styles = StyleSheet.create({
  actionBtn: {
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE/2,
    justifyContent: "space-evenly",
  },
  btnContainer: {
    position: "absolute",
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE/2,
  }
})

export default CardActionButtons;

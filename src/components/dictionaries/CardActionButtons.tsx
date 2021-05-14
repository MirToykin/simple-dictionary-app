import React, {FC, ReactElement} from 'react';

import {Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {errorColor, textPrimaryColor,} from "../../assets/styles";
import {SetNameType, TSliderSpacer, WordType} from "../../types/types";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from "react-native-reanimated";
import {showAlert} from "../../assets/helpers";
import {useDispatch} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {ThunkDispatch} from "redux-thunk";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {
  deleteWords,
  setSelectedWord,
  TMoveAndDeleteWords,
  TSetSelectedWordAction
} from "../../redux/actions/wordsActions";
import {Dispatch} from "redux";
import {ACTION_BUTTON_SIZE, CARD_BUTTONS_HEIGHT} from "../../constants";

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
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const dispatch: Dispatch<TSetSelectedWordAction> = useDispatch()

  const handleMove = (setToMoveTo: SetNameType): void => {
    // thunkDispatchMoveAndDelete(moveWords([word.id], setToMoveTo, 'current', options as OptionsType)).catch(() => {})
  }
  const handleMoveToDone = () => handleMove('done')
  const handleMoveToNext = () => handleMove('next')
  const handleChangeMeanings = () => {
    if (shownSlideWord !== null) {
      dispatch(setSelectedWord(shownSlideWord))
      setModalShown(true)
    }

  }
  const handleDelete = () => {
    thunkDispatchMoveAndDelete(deleteWords('current', [shownSlideWord ? shownSlideWord.id : 0]))
      .then(() => {
        if (shownSlideWordIndex !== null) {
          shownSlideWordIndex !== 1 && flatListRef.scrollToIndex({index: shownSlideWordIndex - 1, animated: true})
        }
      })
  }

  type TActionButton = {
    id: number
    onPress: () => void
    icon?: ReactElement
  }
  const buttonsArray: Array<TActionButton> = [
    {
      id: 1,
      icon: <FontAwesomeIcon name={'angle-double-right'} color={textPrimaryColor} size={30}/>,
      // onPress: () => {showAlert('Перемещение', `Переместить слово "${word.title}" в набор На очереди?`, 'Переместить', handleMoveToNext)}
      onPress: () => {console.log('press')}
    },
    {
      id: 2,
      icon: <MaterialCommunityIcon name={'file-edit-outline'} color={textPrimaryColor} size={30}/>,
      onPress: handleChangeMeanings
      // onPress: () => {}
    },
    {
      id: 3,
      icon: <AntDesignIcon name={'delete'} color={errorColor} size={30}/>,
      onPress: () => showAlert('Удаление',`Удалить слово "${shownSlideWord && shownSlideWord.title}" из набора?`, 'Удалить', handleDelete)
    },
    {
      id: 4,
      icon: <MaterialIcon name={'done-all'} color={textPrimaryColor} size={30}/>,
      // onPress: () => {showAlert('Перемещение', `Переместить слово "${word.title}" в набор Изученные?`, 'Переместить', handleMoveToDone)}
      onPress: () => {}
    },
  ]

  const offset = useSharedValue(-CARD_BUTTONS_HEIGHT)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(offset.value * +!isSlider)
    };
  });

  return (
    <Animated.View style={[styles.cardButtonsContainer, animatedStyle, {height: CARD_BUTTONS_HEIGHT}]}>
      {buttonsArray.map((item) => <TouchableOpacity style={styles.actionBtn} key={item.id} onPress={item.onPress}>
        {item.icon}
      </TouchableOpacity>)}
    </Animated.View>
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
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: "absolute",
    alignItems: "center",
    top: -55,
    right: 0,
    left: 0,
    zIndex: 2,
  },
})

export default CardActionButtons;

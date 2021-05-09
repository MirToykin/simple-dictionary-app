import React, {FC, useEffect, useState} from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  errorColor,
  primaryColor,
  secondaryBackgroundColor, successColor,
  textPrimaryColor, textSecondaryColor
} from "../../assets/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {MapTranslation} from "../../assets/helpers";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import AddWordForm from "../forms/AddWordForm";
import {Dispatch} from "redux";
import {
  addToSet, resetAddWordForm,
  setAddedMeanings,
  SetAddedMeaningsActionType,
  TAddToSet,
  TAddToSetData, TResetAddWordFormAction
} from "../../redux/actions/wordsActions";
import {formValueSelector} from "redux-form";
import {ThunkDispatch} from "redux-thunk";
import {OptionsType, SetNameType} from "../../types/types";

const {width, height} = Dimensions.get('window')

type TProps = {
  modalShown: boolean,
  setModalShown: (shown: boolean) => void
  setName: SetNameType
}

const selector = formValueSelector('AddWordForm');

const AddWordModal: FC<TProps> = ({modalShown, setModalShown, setName}) => {
  const addedMeanings = useSelector((state: AppStateType) => state.words.addedMeanings)
  const options = useSelector((state: AppStateType) => state.auth.options)
  const uid = useSelector((state: AppStateType) => state.auth.id)
  const dispatch: Dispatch<SetAddedMeaningsActionType|TResetAddWordFormAction> = useDispatch();
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, TAddToSet> = useDispatch();
  let titleValue = useSelector((state: AppStateType) => selector(state, 'title'))
  let meaningValue = useSelector((state: AppStateType) => selector(state, 'meaning'))
  const saveAllowed = titleValue && addedMeanings.length
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const closeModal = () => {
    dispatch(setAddedMeanings([]))
    setModalShown(false)
    setError('')
    setMessage('')
  }

  useEffect(() => {
    if (addedMeanings.length) {
      setError('')
      setMessage('')
    }
  }, [addedMeanings.length])

  const onSaveWord = () => {
    dispatch(resetAddWordForm())
    const newWord: TAddToSetData = {title: '', meanings: '', user_id: 0}
    newWord['title'] = titleValue.toLowerCase().trim()
    newWord['user_id'] = uid as number
    newWord['meanings'] = addedMeanings.join('/').toLowerCase()
    dispatch(setAddedMeanings([]))
    return thunkDispatch(addToSet(setName)(newWord, options as OptionsType))
      .then((message) => {
        message && setMessage(message)
      })
      .catch(err => {
      setError(err.message)
    })
  }

  const offset = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(offset.value * 100) }],
    };
  });

  useEffect(() => {
    if (saveAllowed) {
      offset.value = 0
    } else {
      offset.value = 1
    }
  })


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalShown}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={closeModal}
      >
        <View
          style={styles.centeredView}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
                <Text style={styles.title}>Добавить слово</Text>
                <AddWordForm {...{titleValue, meaningValue}}/>
                {!!error && <Text style={styles.error}>
                  {error}
                </Text>}
              {!!message && <Text style={styles.message}>
                {message}
              </Text>}
                <ScrollView
                    keyboardShouldPersistTaps='always'
                  // directionalLockEnabled={true}
                  // contentContainerStyle={styles.centeredView}
                >
                  {addedMeanings && addedMeanings.map((item, i, arr) => <MapTranslation {...{item, i, arr}}
                                                                                        key={item} allowDeleteLast/>)}
                </ScrollView>
                <View style={[styles.controlsWrapper]}>
                    <Animated.View style={animatedStyles}>
                        <TouchableOpacity
                          disabled={!saveAllowed}
                          style={styles.saveBtn}
                          onPress={onSaveWord}>
                          <Text style={[styles.saveBtnText, styles.btnText]}>СОХРАНИТЬ</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <TouchableOpacity onPress={closeModal}><Text
                        style={[styles.closeBtnText, styles.btnText]}>ЗАКРЫТЬ</Text></TouchableOpacity>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginBottom: 15,
    backgroundColor: secondaryBackgroundColor,
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    // height: height * 0.55,
    width: width - 20,
    bottom: 0,
    maxHeight: height * 0.55
  },
  title: {
    color: primaryColor,
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20
  },
  inputStyle: {
    color: textPrimaryColor
  },
  btnText: {
    fontWeight: '800',
    fontSize: 16
  },
  closeBtnText: {
    color: textSecondaryColor,
  },
  saveBtn: {
    marginRight: 20
  },
  saveBtnText: {
    color: textPrimaryColor
  },
  controlsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  error: {
    textAlign: 'center',
    color: errorColor
  },
  message: {
    textAlign: 'center',
    color: successColor
  }
})

export default AddWordModal;

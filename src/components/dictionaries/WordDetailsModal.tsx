import React, {FC, useEffect} from 'react';
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
  primaryColor,
  secondaryBackgroundColor,
  textPrimaryColor, textSecondaryColor
} from "../../assets/styles";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {MapTranslation} from "../../assets/helpers";
import AddMeaningForm from "../forms/AddMeaningForm";
import {OptionsType} from "../../types/types";
import {
  editWord,
  setAddedMeanings,
  TEditWord
} from "../../redux/actions/wordsActions";
import {ThunkDispatch} from "redux-thunk";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";

const {width, height} = Dimensions.get('window')

type TProps = {
  modalShown: boolean,
  setModalShown: (shown: boolean) => void
}

const WordDetailsModal: FC<TProps> = ({modalShown, setModalShown}) => {
  const selectedWord = useSelector((state: AppStateType) => state.words.selectedWord)
  const addedMeanings = useSelector((state: AppStateType) => state.words.addedMeanings)
  const options = useSelector((state: AppStateType) => state.auth.options)
  const dispatchEdit: ThunkDispatch<AppStateType, unknown, TEditWord> = useDispatch()
  const dispatch = useDispatch();

  const onSaveChanges = (meaningsArray: Array<string>, id: number, options: OptionsType) => {
    const meanings = meaningsArray.join('/').toLowerCase();
    dispatchEdit(editWord('current', id, {meanings}, options)); // current - указан в качестве заглушки, как валидный для типа SetNameType
    // в данном вызове этот параметр не используется
    dispatch(setAddedMeanings([]));
    setModalShown(false)
  }

  const closeModal = () => {
    setModalShown(false)
  }

  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset.value * 100) }],
    };
  });

  useEffect(() => {
    if(selectedWord?.meanings === addedMeanings.join('/')) {
      offset.value = 1
    } else {
      offset.value = 0
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
        // onPressOut={() => onSaveChanges(addedMeanings, selectedWord ? selectedWord.id as number : 0,options as OptionsType)}
        onPressOut={closeModal}
      >
        <View
          style={styles.centeredView}
        >
          <TouchableWithoutFeedback>
            {selectedWord && <View style={styles.modalView}>
                <Text style={styles.title}>{selectedWord.title}</Text>
                <AddMeaningForm meanings={selectedWord.meanings.split('/')}/>
                <ScrollView
                  // directionalLockEnabled={true}
                  // contentContainerStyle={styles.centeredView}
                >
                  {addedMeanings && addedMeanings.map((item, i, arr) => <MapTranslation {...{item, i, arr}}
                                                                                        key={item}/>)}
                </ScrollView>
                <View style={[styles.controlsWrapper]}>
                  <Animated.View style={animatedStyles}>
                      <TouchableOpacity
                          style={styles.saveBtn}
                          onPress={() => onSaveChanges(addedMeanings, selectedWord ? selectedWord.id as number : 0, options as OptionsType)}>
                          <Text style={[styles.saveBtnText, styles.btnText]}>СОХРАНИТЬ</Text>
                      </TouchableOpacity>
                  </Animated.View>
                    <TouchableOpacity onPress={closeModal}><Text
                        style={[styles.closeBtnText, styles.btnText]}>ЗАКРЫТЬ</Text></TouchableOpacity>
                </View>
            </View>}
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
  }
})

export default WordDetailsModal;

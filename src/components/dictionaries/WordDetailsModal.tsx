import React, {FC} from 'react';
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
import {secondaryBackgroundColor, secondaryColor, textPrimaryColor, textSecondaryColor} from "../../assets/styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {mapTranslations} from "../../assets/helpers";

const {width, height} = Dimensions.get('window')

type TProps = {
  modalShown: boolean,
  setModalShown: (shown: boolean) => void
}

const WordDetailsModal: FC<TProps> = ({modalShown, setModalShown}) => {
  const selectedWord = useSelector((state: AppStateType) => state.words.selectedWord)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalShown}
    >
      <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPressOut={() => {setModalShown(false)}}
      >
        <View
          style={styles.centeredView}
        >
          <TouchableWithoutFeedback>
            {selectedWord && <View style={styles.modalView}>
              <Text style={styles.title}>{selectedWord.title}</Text>
              <ScrollView
                // directionalLockEnabled={true}
                // contentContainerStyle={styles.centeredView}
              >
                {selectedWord.meanings.split('/').map(mapTranslations)}
              </ScrollView>
            </View>}
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity >
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
    // height: height * 0.6,
    width: width - 20,
    bottom: 0,
  },
  title: {
    color: textPrimaryColor,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  }
})

export default WordDetailsModal;

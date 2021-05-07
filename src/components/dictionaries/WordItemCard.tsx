import React, {FC, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions, Animated, ScrollView} from "react-native";
import {Icon, Text} from 'react-native-elements';
import {isTSliderSpacer, OptionsType, SetNameType, TSliderSpacer, WordType} from "../../types/types";
import {
  errorColor,
  primaryBackgroundColor,
  primaryColor,
  secondaryBackgroundColor,
  secondaryColor,
  textPrimaryColor, textSecondaryColor
} from "../../assets/styles";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {
  deleteWords,
  moveWords,
  setSelectedWord,
  TMoveAndDeleteWords,
  TSetSelectedWordAction
} from "../../redux/actions/wordsActions";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {showAlert} from "../../assets/helpers";

type TProps = {
  word: WordType | TSliderSpacer,
  setModalShown: (shown: boolean) => void
  setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>
  slideWidth: number
  width: number
  index: number
  setDeletedIndex: any
  scrollToIndex: any
}

const WordItemCard: FC<TProps> = ({word, slideWidth,width}) => {

  if (isTSliderSpacer(word)) {
    return <View style={{width: (width - slideWidth) / 2}}/>
  }

  const meanings = word.meanings.split('/')
  return (
    <View style={{
      width: slideWidth,
      padding: 10
    }}>
      <View style={styles.container}>
        <View
          style={styles.textWrapper}
        >
          <Text style={styles.title}>
            {word.title}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.meaningsContainer} style={styles.scrollView}>
          {meanings.map((meaning) => <Text style={styles.meaning} key={meaning}>{meaning}</Text>)}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    // paddingHorizontal: 20,
    // paddingVertical: 10,
    padding: 25,
    backgroundColor: secondaryBackgroundColor,
    borderRadius: 25,
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
    // paddingLeft: 15
  },
  email: {
    marginTop: 10,
    fontSize: 13,
    color: '#b0b0b0',
  },
  checkBox: {
    width: 20,
    height: 20,
    backgroundColor: secondaryBackgroundColor,
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 2
  },
  body: {
    paddingLeft: 50
  },
  title: {
    fontSize: 24,
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 30
  },
  meaning: {
    color: textPrimaryColor,
    // paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 20
  },
  meaningsContainer: {
    alignItems: 'center'
  },
  actionButton: {
    color: textSecondaryColor,
    textAlign: 'center',
    fontSize: 16
  },
  deleteButton: {
    color: errorColor
  },
  scrollView: {
    width: '100%'
  }
});

const areEqual = (prevProps: TProps, nextProps: TProps): boolean => {
  if (isTSliderSpacer(prevProps.word) || isTSliderSpacer(nextProps.word)) return true
  return prevProps.word.title === nextProps.word.title && prevProps.word.meanings === nextProps.word.meanings &&
    prevProps.word.category === nextProps.word.category
}

export default React.memo(WordItemCard, areEqual);

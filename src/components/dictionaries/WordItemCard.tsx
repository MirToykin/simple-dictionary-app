import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Dimensions, Animated} from "react-native";
import {Icon, Text} from 'react-native-elements';
import {isTSliderSpacer, TSliderSpacer, WordType} from "../../types/types";
import {primaryBackgroundColor, primaryColor, secondaryBackgroundColor, textPrimaryColor} from "../../assets/styles";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {setSelectedWord, TSetSelectedWordAction} from "../../redux/actions/wordsActions";

type TProps = {
  word: WordType | TSliderSpacer,
  setModalShown: (shown: boolean) => void
  setSelectedIDs: React.Dispatch<React.SetStateAction<number[]>>
  translateY: Animated.AnimatedInterpolation
  slideWidth: number
  slideHeight: number
  width: number
}

const WordItemCard: FC<TProps> = ({word, slideWidth, slideHeight, translateY, width}) => {

  if (isTSliderSpacer(word)) {
    return <View style={{width: (width - slideWidth) / 2}}/>
  }
  return (
    <Animated.View style={{
      transform: [{translateY}],
      width: slideWidth,
      height: slideHeight,
      padding: 10
    }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.textWrapper}
          onPress={undefined}
        >
          <Text style={styles.name}>
            {word.title}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: secondaryBackgroundColor,
    // marginHorizontal: 10,
    borderRadius: 25
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 15
  },
  name: {
    fontSize: 18,
    color: textPrimaryColor,
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
  }
});

const areEqual = (prevProps: TProps, nextProps: TProps): boolean => {
  if (isTSliderSpacer(prevProps.word) || isTSliderSpacer(nextProps.word)) return true
  return prevProps.word.title === nextProps.word.title && prevProps.word.meanings === nextProps.word.meanings &&
    prevProps.word.category === nextProps.word.category
}

export default React.memo(WordItemCard, areEqual);

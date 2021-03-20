import React, {FC, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Icon, Text} from 'react-native-elements';
import {WordType} from "../../types/types";
import {primaryBackgroundColor, primaryColor, secondaryBackgroundColor, textPrimaryColor} from "../../assets/styles";
import { useDynamicStyle } from 'react-native-dynamic-styles'
import {mapTranslations} from "../../assets/helpers";

type TProps = {
  word: WordType
}

const WordItem: FC<TProps> = ({word}) => {
  const [checked, setChecked] = useState(false)
  const [translationShown, setTranslationShown] = useState(false)

  const checkBoxStyle = useDynamicStyle(
    () => ({
      width: 23,
      height: 23,
      backgroundColor: checked ? primaryBackgroundColor : secondaryBackgroundColor,
      borderRadius: 4,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: 2
    }),
    [checked]
  );

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          style={checkBoxStyle}
          onPress={() => setChecked(!checked)}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        >
          {checked && <Icon name={'check'} color={primaryColor} size={20}/>}
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.name}>
            {word.title}
          </Text>
        </View>
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => setTranslationShown(!translationShown)}
        >
          <Icon
            name='chevron-down'
            type='evilicon'
            size={40}
            color={primaryColor}
          />
        </TouchableOpacity>
      </View>
      {translationShown && <ScrollView style={styles.body}>
        {word.meanings.split('/').map(mapTranslations)}
      </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between"
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
  return prevProps.word.title === nextProps.word.title && prevProps.word.meanings === nextProps.word.meanings &&
    prevProps.word.category === nextProps.word.category
}

export default React.memo(WordItem, areEqual);

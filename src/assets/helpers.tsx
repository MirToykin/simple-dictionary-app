import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import {errorColor, textPrimaryColor, textSecondaryColor} from "./styles";
import React from "react";

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
    fontSize: 16,
    color: textPrimaryColor
  },
  textContainer: {

  }
})


export type TMapTranslations = (item: string, i: number) => Element
export const mapTranslations: TMapTranslations = (item, i) => {

  return (
    <View style={mapTranslationStyles.container}>
      <TouchableOpacity
        style={mapTranslationStyles.delete}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      >
        <Icon
          name='close'
          type='evilicon'
          color={errorColor}
        />
      </TouchableOpacity>
      <View style={mapTranslationStyles.textContainer}>
        <Text style={mapTranslationStyles.text}>{item}</Text>
      </View>
    </View>
  )
}
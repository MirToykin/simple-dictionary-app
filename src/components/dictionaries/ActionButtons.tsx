import React, {FC, useEffect} from 'react';

import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import {errorColor, secondaryColor, successColor, textPrimaryColor,} from "../../assets/styles";
import {SetNameType} from "../../types/types";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";

type TProps = {
  setName: SetNameType
  setAddModalShown: (shown: boolean) => void
  handleDelete: () => void
  selectedIDs: Array<number>
  handleMoveForward: () => void
  handleMoveBack: () => void
  nextSetName: string
  prevSetName: string
}

const ActionButtons: FC<TProps> = ({setName, setAddModalShown,
                                     handleDelete, selectedIDs,
                                     handleMoveBack, handleMoveForward,
                                     nextSetName, prevSetName
                                   }) => {
  type TButton = {
    name: string,
    type: string,
    color: string,
    size: number,
    condition: boolean
    onPress: () => void
    disabled?: boolean
  }

  const offset = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: withSpring(offset.value * -165)
    };
  });

  useEffect(() => {
    if (selectedIDs.length) {
      offset.value = 0
    } else {
      offset.value = 1
    }
  }, [selectedIDs.length])

  const showAlert = (title: string, message: string, confirmBtnText: string, confirmBtnAction: ()=>void) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { text: confirmBtnText,
          onPress: confirmBtnAction,
          style: "default" }
      ]
    )
  }

  const buttons: Array<TButton> = [
    {
      name: 'plus',
      type: 'antdesign',
      color: successColor,
      size: 35,
      condition: setName !== 'done',
      onPress: () => setAddModalShown(true)
    },
    {
      name: 'shuffle',
      type: 'ionicon',
      color: textPrimaryColor,
      size: 30,
      condition: setName === 'current',
      onPress: () => {}
    },
    {
      name: 'arrowright',
      type: 'antdesign',
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${nextSetName}"`, 'Переместить', handleMoveForward),
      disabled: !selectedIDs.length
    },
    {
      name: 'arrowleft',
      type: 'antdesign',
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${prevSetName}"`, 'Переместить', handleMoveBack),
      disabled: !selectedIDs.length
    },
    {
      name: 'delete',
      type: 'antdesign',
      color: errorColor,
      size: 30,
      condition: true,
      onPress:  () => showAlert('Удаление',`Удалить отмеченные слова (${selectedIDs.length}) из набора?`, 'Удалить', handleDelete),
      disabled: !selectedIDs.length
    }
  ]

  const renderButton = (item: TButton) => {
    if (item.condition)
      return (
        <TouchableOpacity
          style={[styles.actionBtn]}
          onPress={item.onPress}
          key={item.name}
          disabled={item.disabled}
        >
          <Icon
            name={item.name}
            type={item.type}
            color={item.color}
            size={item.size}
          />
        </TouchableOpacity>
      )
  }

  return (
    <Animated.View style={[styles.buttonsContainer, animatedStyles]}>
      {buttons.map(renderButton)}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    borderColor: 'red',
    position: "absolute",
    bottom: -165,
    right: 10
  },
  actionBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "space-evenly",
    marginBottom: 10
  }
})

export default ActionButtons;

import React, {FC, useEffect} from 'react';

import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import {errorColor, secondaryColor, successColor, textPrimaryColor,} from "../../assets/styles";
import {SetNameType} from "../../types/types";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from "react-native-reanimated";

type TProps = {
  setName: SetNameType
  setAddModalShown: (shown: boolean) => void
  handleDelete: () => void
  selectedIDs: Array<number>
  handleMoveForward: () => void
  handleMoveBack: () => void
  nextSetName: string
  prevSetName: string
  setSliderMode: (mode: boolean) => void
  sliderMode: boolean
}

const ActionButtons: FC<TProps> = ({setName, setAddModalShown,
                                     handleDelete, selectedIDs,
                                     handleMoveBack, handleMoveForward,
                                     nextSetName, prevSetName,
                                     setSliderMode, sliderMode
                                   }) => {
  type TButton = {
    name: string,
    type: string,
    color: string,
    size: number,
    condition: boolean
    onPress: () => void
    disabled?: boolean
    // offset?:  Animated.SharedValue<number>
    animationOptions?: any
    position: {
      bottom: number
      right: number
    },
    constant: boolean
  }

  const offset = useSharedValue(1);

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
      onPress: () => setAddModalShown(true),
      position: {
        bottom: 10,
        right: 0
      },
      constant: true
    },
    {
      name: sliderMode ? 'format-list-bulleted' : 'my-library-books',
      type: 'material',
      color: textPrimaryColor,
      size: 30,
      condition: setName === 'current',
      onPress: () => setSliderMode(!sliderMode),
      position: {
        bottom: 65,
        right: 0
      },
      constant: true
    },
    {
      name: 'arrowright',
      type: 'antdesign',
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${nextSetName}"`, 'Переместить', handleMoveForward),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: !selectedIDs.length ? 150 : 50
      },
      position: {
        bottom: 120,
        right: 0
      },
      constant: false
    },
    {
      name: 'arrowleft',
      type: 'antdesign',
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${prevSetName}"`, 'Переместить', handleMoveBack),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: 100
      },
      position: {
        bottom: 175,
        right: 0
      },
      constant: false
    },
    {
      name: 'delete',
      type: 'antdesign',
      color: errorColor,
      size: 30,
      condition: true,
      onPress:  () => showAlert('Удаление',`Удалить отмеченные слова (${selectedIDs.length}) из набора?`, 'Удалить', handleDelete),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: !selectedIDs.length ? 50 : 150
      },
      position: {
        bottom: 230,
        right: 0
      },
      constant: false
    }
  ]

  const renderButton = (item: TButton) => {
    const {bottom, right} = item.position
    // const offset = useSharedValue(0);

    const animatedStyles = (useAnimatedStyle(() => {
      const delay = item.animationOptions?.delay ? item.animationOptions?.delay : 0
      return {
        right: withDelay(delay, withTiming(offset.value * -50))
      };
    }));
    if (item.condition)
      return (
        <Animated.View key={item.name} style={[styles.btnContainer, {bottom, right},!item.constant ? animatedStyles : {}]}>
          <TouchableOpacity
            style={[styles.actionBtn]}
            onPress={item.onPress}
            disabled={item.disabled}
          >
            <Icon
              name={item.name}
              type={item.type}
              color={item.color}
              size={item.size}
            />
          </TouchableOpacity>
        </Animated.View>
      )
  }

  return (
    // <Animated.View style={[styles.buttonsContainer, animatedStyles]}>
    //   {buttons.map(renderButton)}
    // </Animated.View>
  <>
    {buttons.map(renderButton)}
  </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    // position: "absolute",
    // bottom: -165,
    // right: 10
  },
  actionBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "space-evenly",
    // marginBottom: 10,
  },
  btnContainer: {
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 22.5,
  }
})

export default ActionButtons;

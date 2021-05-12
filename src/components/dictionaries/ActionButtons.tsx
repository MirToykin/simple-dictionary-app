import React, {FC, useEffect} from 'react';

import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import {errorColor, secondaryColor, successColor, textPrimaryColor,} from "../../assets/styles";
import {SetNameType} from "../../types/types";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming} from "react-native-reanimated";
import {showAlert} from "../../assets/helpers";
import {ACTION_BUTTON_SIZE, ACTION_BUTTON_SPACING} from "../../constants";
import index from "@react-native-community/masked-view";


type TSetData = {
  title: string
  icon: {
    name: string
    type: string
  }
}
type TProps = {
  setName: SetNameType
  setAddModalShown: (shown: boolean) => void
  handleDelete: () => void
  selectedIDs: Array<number>
  handleMoveForward: () => void
  handleMoveBack: () => void
  nextSetData: TSetData
  prevSetData: TSetData
  setSliderMode: (mode: boolean) => void
  sliderMode: boolean
  screenWidth: number
  isSetEmpty: boolean
}

const ActionButtons: FC<TProps> = ({setName, setAddModalShown,
                                     handleDelete, selectedIDs,
                                     handleMoveBack, handleMoveForward,
                                     nextSetData, prevSetData,
                                     setSliderMode, sliderMode,
                                     screenWidth, isSetEmpty
                                   }) => {
  type TButton = {
    name: string,
    type: string,
    color: string,
    size: number,
    condition: boolean
    onPress: () => void
    disabled?: boolean
    animationOptions?: any
    constant: boolean
  }

  const offset = useSharedValue(1)
  const plusOffset = useSharedValue(0)
  const switchCurrentSetModeOffset = useSharedValue(0)

  const useOffsetAnimatedStyle = (item: TButton) => useAnimatedStyle(() => {
    const delay = item.animationOptions?.delay ? item.animationOptions?.delay : 0
    return {
      right: withDelay(delay, withTiming(offset.value * -50))
    }
  })

  const usePlusOffsetAnimatedStyle = (item: TButton) => useAnimatedStyle(() => {
    return {
      // right: withTiming(plusOffset.value * ((screenWidth - ACTION_BUTTON_SIZE*2)/2 + ACTION_BUTTON_SIZE))
      translateX: withTiming(plusOffset.value * -((screenWidth - ACTION_BUTTON_SIZE*2)/2 + ACTION_BUTTON_SIZE))
    };
  });

  const useSwitchCurrentSetModeOffset = (item: TButton) => useAnimatedStyle(() => {
    return {
      translateY: withTiming(switchCurrentSetModeOffset.value * ACTION_BUTTON_SIZE),
      translateX: withTiming(switchCurrentSetModeOffset.value * -(screenWidth - ACTION_BUTTON_SIZE*2)/2)
    };
  });

  useEffect(() => {
    if (selectedIDs.length) {
      offset.value = 0
    } else {
      offset.value = 1
    }
  }, [selectedIDs.length])

  useEffect(() => {
    if (sliderMode) {
      plusOffset.value = 1
      switchCurrentSetModeOffset.value = 1
    } else {
      plusOffset.value = 0
      switchCurrentSetModeOffset.value = 0
    }
  }, [sliderMode])

  let buttons: Array<TButton> = [
    {
      name: 'plus',
      type: 'antdesign',
      color: successColor,
      size: 35,
      condition: setName !== 'done',
      onPress: () => setAddModalShown(true),
      animationOptions: {
        btnUseAnimatedStyle: usePlusOffsetAnimatedStyle
      },
      constant: true
    },
    {
      name: sliderMode ? 'format-list-bulleted' : 'my-library-books',
      type: 'material',
      color: textPrimaryColor,
      size: 30,
      condition: setName === 'current',
      onPress: () => {
        setSliderMode(!sliderMode)
      },
      animationOptions: {
        btnUseAnimatedStyle: useSwitchCurrentSetModeOffset
      },
      constant: true,
      disabled: isSetEmpty
    },
    {
      name: nextSetData.icon.name,
      type: nextSetData.icon.type,
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${nextSetData.title}"`, 'Переместить', handleMoveForward),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: !selectedIDs.length ? 100 : 0,
        btnUseAnimatedStyle: useOffsetAnimatedStyle
      },
      constant: false
    },
    {
      name: prevSetData.icon.name,
      type: prevSetData.icon.type,
      color: textPrimaryColor,
      size: 30,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${prevSetData.title}"`, 'Переместить', handleMoveBack),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: 50,
        btnUseAnimatedStyle: useOffsetAnimatedStyle
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
        delay: !selectedIDs.length ? 0 : 100,
        btnUseAnimatedStyle: useOffsetAnimatedStyle
      },
      constant: false
    }
  ]

  buttons = buttons.filter((item) => item.condition)

  const renderButton = (item: TButton, index: number) => {

    const animatedStyles = item.animationOptions.btnUseAnimatedStyle(item)

    if (item.condition)
      return (
        <Animated.View key={item.name} style={[styles.btnContainer, {bottom: ACTION_BUTTON_SIZE * index + ACTION_BUTTON_SPACING, right: 0},animatedStyles]}>
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
  <>
    {buttons.map(renderButton)}
  </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
  },
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
    zIndex: 2,
  }
})

export default ActionButtons;

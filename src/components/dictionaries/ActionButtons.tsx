import React, {FC, ReactElement, useEffect} from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {errorColor, successColor, textPrimaryColor,} from "../../assets/styles";
import {SetNameType} from "../../types/types";
import Animated, {useAnimatedStyle, useSharedValue, withDelay, withTiming} from "react-native-reanimated";
import {showAlert} from "../../assets/helpers";
import {ACTION_BUTTON_SIZE, ACTION_BUTTON_SPACING} from "../../constants";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'


type TSetData = {
  title: string
  icon: ReactElement
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
    id: number,
    condition: boolean
    onPress: () => void
    disabled?: boolean
    animationOptions?: any
    constant: boolean,
    icon: ReactElement
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
      id: 1,
      condition: setName !== 'done',
      onPress: () => setAddModalShown(true),
      animationOptions: {
        btnUseAnimatedStyle: usePlusOffsetAnimatedStyle
      },
      constant: true,
      icon: <AntDesignIcon name={'plus'} size={35} color={successColor}/>
    },
    {
      id: 2,
      condition: setName === 'current',
      onPress: () => {
        setSliderMode(!sliderMode)
      },
      animationOptions: {
        btnUseAnimatedStyle: useSwitchCurrentSetModeOffset
      },
      constant: true,
      disabled: isSetEmpty,
      icon: <MaterialIcon name={sliderMode ? 'format-list-bulleted' : 'my-library-books'} size={30} color={textPrimaryColor}/>
    },
    {
      id: 3,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${nextSetData.title}"`, 'Переместить', handleMoveForward),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: !selectedIDs.length ? 100 : 0,
        btnUseAnimatedStyle: useOffsetAnimatedStyle
      },
      constant: false,
      icon: nextSetData.icon
    },
    {
      id: 4,
      condition: true,
      onPress: () => showAlert('Перемещение', `Переместить отмеченные слова (${selectedIDs.length}) в набор "${prevSetData.title}"`, 'Переместить', handleMoveBack),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: 50,
        btnUseAnimatedStyle: useOffsetAnimatedStyle
      },
      constant: false,
      icon: prevSetData.icon
    },
    {
      id: 5,
      condition: true,
      onPress:  () => showAlert('Удаление',`Удалить отмеченные слова (${selectedIDs.length}) из набора?`, 'Удалить', handleDelete),
      disabled: !selectedIDs.length,
      animationOptions: {
        delay: !selectedIDs.length ? 0 : 100,
        btnUseAnimatedStyle: useOffsetAnimatedStyle
      },
      constant: false,
      icon: <AntDesignIcon name={'delete'} color={errorColor} size={30}/>
    }
  ]

  buttons = buttons.filter((item) => item.condition)

  const renderButton = (item: TButton, index: number) => {

    const animatedStyles = item.animationOptions.btnUseAnimatedStyle(item)

    if (item.condition)
      return (
        <Animated.View key={item.id} style={[styles.btnContainer, {bottom: ACTION_BUTTON_SIZE * index + ACTION_BUTTON_SPACING, right: 0},animatedStyles]}>
          <TouchableOpacity
            style={[styles.actionBtn]}
            onPress={item.onPress}
            disabled={item.disabled}
          >
            {item.icon}
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

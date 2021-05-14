import React from "react";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {TouchableOpacity} from "react-native"
import {secondaryColor, textPrimaryColor} from "./styles"
import {Input} from "react-native-elements"
import CustomInput from "../components/inputs/Input";

export const InputIcon = ({onIconPress}: {onIconPress: () => void | undefined}) => {
  return (
    <TouchableOpacity
      onPress={onIconPress}
    >
      <AntDesignIcon
        name={'plus'}
        size={30}
        color={secondaryColor}
      />
    </TouchableOpacity>
  )
}

// @ts-ignore
export const renderAddMeaningInput = ({input: {onChange, ...restInput}, ...custom}) => {
  return <Input
    inputStyle={{
      color: textPrimaryColor
    }}
    onChangeText={onChange}
    {...restInput}
    {...custom}
  />
}

// @ts-ignore
export const renderCustomInput = ({input: {onChange, ...restInput}, leftIcon, rightIcon, secureTextEntry=false, ...custom}) => {
  return <CustomInput
    inputProps={{
      onChangeText: onChange,
      secureTextEntry,
      ...restInput,
      ...custom
    }}
    leftIcon={leftIcon}
    rightIcon={rightIcon}
  />
}

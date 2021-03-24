import React from "react";
import {Icon, Input} from "react-native-elements";
import {TouchableOpacity} from "react-native";
import {secondaryColor, textPrimaryColor} from "./styles";

// @ts-ignore
export const renderAuthInput = ({secureTextEntry=false, leftIcon, placeholder, input: { onChange, ...restInput }, ...restCustom}) => {
  return <Input
    inputStyle={{
      color: '#fff'
    }}
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    inputContainerStyle={{
      marginHorizontal: 15
    }}
    onChangeText={onChange}
    leftIcon={!!leftIcon && { type: 'font-awesome', color: 'rgba(255 ,255,255,0.6)', ...leftIcon }}
    {...restInput}
    {...restCustom}
  />
}

export const InputIcon = ({onIconPress}: {onIconPress: () => void | undefined}) => {
  return (
    <TouchableOpacity
      onPress={onIconPress}
    >
      <Icon
        name={'plus'}
        type={'antdesign'}
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

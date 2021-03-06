import React from "react";
import {Input} from "react-native-elements";

// @ts-ignore
export const renderInput = ({secureTextEntry=false, leftIcon, placeholder, input: { onChange, ...restInput }, ...restCustom}) => {
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

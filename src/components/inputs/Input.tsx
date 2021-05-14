import React, {FC, ReactElement} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {textPrimaryColor, textSecondaryColor} from "../../assets/styles";

type TProps = {
  inputProps: any
  leftIcon: ReactElement
  rightIcon: ReactElement
}

const CustomInput: FC<any> = ({
                                inputProps, leftIcon, rightIcon
                              }) => {
  return (
    <View style={styles.inputWrapper}>
      <View>{leftIcon && leftIcon}</View>
      <TextInput
        style={[styles.textInput]}
        placeholderTextColor={textSecondaryColor}
        {...inputProps}
      />
      <View>{rightIcon && rightIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    color: textPrimaryColor,
    fontSize: 18
  },
  inputWrapper: {
    height: 42,
    borderBottomColor: textSecondaryColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 15
  }
})

export default CustomInput;

import React, {FC} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, ActivityIndicator} from "react-native";
import {primaryBackgroundColor, primaryColor} from "../../assets/styles";

type TProps = {
  title: string
  onPress: () => void
  isLoading: boolean
}

const AuthButton: FC<TProps> = ({title, onPress, isLoading}) => {
  return (
    <TouchableOpacity disabled={isLoading} onPress={onPress} style={styles.button}>
      {isLoading ? <ActivityIndicator size="small" color={primaryBackgroundColor} /> :  <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    marginHorizontal: 25,
    height: 42,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: primaryBackgroundColor,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default AuthButton;

import {StyleSheet} from "react-native";

const primaryColor = '#fe9700'
const primaryBackgroundColor = '#303030'
const errorColor = '#f34336'

export const authFormStyles = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    marginHorizontal: 25,
  },
  buttonTitle: {
    color: primaryBackgroundColor
  },
  buttonLoading: {
    color: primaryBackgroundColor
  },
  buttonContainer: {
    marginBottom: 20
  },
  additionalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginBottom: 20
  },
  additionalButtonsContainerRegister: {
    justifyContent: 'center'
  },
  additionalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  error: {
    textAlign: 'center',
    color: errorColor,
    fontWeight: 'bold'
  }
})

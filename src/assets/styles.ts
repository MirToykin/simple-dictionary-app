import {StyleSheet} from "react-native";

export const primaryColor = '#fe9700'
export const secondaryColor = '#bf360d'
export const textPrimaryColor = '#fff'
export const textSecondaryColor = 'rgba(255, 255, 255, 0.7)'
export const primaryBackgroundColor = '#303030'
export const secondaryBackgroundColor = '#424242'
export const errorColor = '#f34336'
export const successColor = '#4caf50'

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

import React, {FC, useState} from 'react'
import {Field, InjectedFormProps, reduxForm, formValueSelector, SubmissionError} from 'redux-form'
import {TextInput, TouchableOpacity, View, Text, StyleSheet, StyleProp, ViewStyle} from "react-native";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {AuthActionType, login, TLoginData} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'react-native-elements'
import {renderInput} from "../../assets/formElems";


const primaryColor = '#fe9700'
const primaryBackgroundColor = '#303030'
const errorColor = '#f34336'

const LoginForm: FC<InjectedFormProps<TLoginData>> = ({handleSubmit}) => {
  // console.log(props)
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()

  const form = useSelector((state: AppStateType) => state.form.LoginForm)
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const email = form && form.values && form.values.email
  const pwd = form && form.values && form.values.password
  const [error, setError] = useState('')


  const submit = (loginData: TLoginData) => {
    if (email && pwd) {
      thunkDispatch(login(loginData)).catch(err => {
        setError(err.message)
      })
    }
    else {
      setError('Все поля должны быть заполнены')
    }
  }

  // const { handleSubmit } = props

  return (
    <View style={styles.container}>
      <Field
        name="email"
        component={renderInput}
        placeholder={'Адрес эл. почты'}
        leftIcon={{
          name: 'envelope',
          size: 15
        }}
      />
      <Field
        name="password"
        secureTextEntry={true}
        component={renderInput}
        placeholder={'Пароль'}
        leftIcon={{
          name: 'unlock-alt',
        }}
      />
      <Button
        title="Войти"
        type="outline"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        loadingProps={styles.buttonLoading}
        containerStyle={styles.buttonContainer}
        onPress={handleSubmit(submit)}
        loading={isFetching}
      />
      <View style={styles.additionalButtonsContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.additionalButtonText}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.additionalButtonText}>Регистрация</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.error}>
        {error}
      </Text>}
    </View>
  )
}

const styles = StyleSheet.create({
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
  additionalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  error: {
    textAlign: 'center',
    color: errorColor,
    fontWeight: 'bold'
  },
  container: {

  },
  input: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#424242',
    marginBottom: 10,
    marginHorizontal: 25,
    paddingHorizontal: 15,
    color: '#fff',
  },
  tchOp: {
    marginHorizontal: 25,
    marginBottom: 20,
    borderRadius: 8
  }
})

export default reduxForm<TLoginData>({
  form: 'LoginForm'
})(LoginForm)

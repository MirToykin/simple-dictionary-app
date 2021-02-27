import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {AuthActionType, login, TLoginData} from "../../redux/actions/authActions";
import {useDispatch} from "react-redux";

// @ts-ignore
const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput style={styles.input} onChangeText={onChange} {...restInput} />
}

// @ts-ignore
const renderPasswordInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChange} {...restInput} />
}

const LoginForm = (props: any) => {
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()

  const submit = (loginData: TLoginData) => {
    console.log('submitting form', loginData)
    thunkDispatch(login(loginData))
  }

  const { handleSubmit } = props

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <Field name="email" component={renderInput} />
      <Text>Password:</Text>
      <Field name="password" secureTextEntry={true} component={renderPasswordInput} />
      <TouchableOpacity onPress={handleSubmit(submit)}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250
  },
  container: {

  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250
  }
})

export default reduxForm({
  form: 'test'
})(LoginForm)

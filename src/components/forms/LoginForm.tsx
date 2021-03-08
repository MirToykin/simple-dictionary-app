import React, {FC, useState} from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {TouchableOpacity, View, Text} from "react-native";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {AuthActionType, login, TLoginData} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'react-native-elements'
import {renderInput} from "../../assets/formElems"
import { StackNavigationProp } from '@react-navigation/stack'
import {RootStackParamList} from "../../navigators/RootNavigator";
import {authFormStyles  as styles} from '../../assets/styles'

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LogIn' | 'Registration' | 'ResetPwd'>
}

const LoginForm: FC<TProps & InjectedFormProps<TLoginData, TProps>> = ({handleSubmit, navigation}) => {
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
    <View>
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
        <TouchableOpacity onPress={() => {navigation.navigate('ResetPwd')}}>
          <Text style={styles.additionalButtonText}>Забыли пароль?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Registration')}}>
          <Text style={styles.additionalButtonText}>Регистрация</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.error}>
        {error}
      </Text>}
    </View>
  )
}

export default reduxForm<TLoginData, TProps>({
  form: 'LoginForm'
})(LoginForm)

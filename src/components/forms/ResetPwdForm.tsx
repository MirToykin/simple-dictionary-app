import React, {FC, useState} from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {TouchableOpacity, View, Text} from "react-native";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {AuthActionType, register, TRegData} from "../../redux/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'react-native-elements'
import {renderAuthInput} from "../../assets/formElems";
import {authFormStyles  as styles} from '../../assets/styles'
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../navigators/RootNavigator";

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'LogIn' | 'Registration' | 'ResetPwd'>
}

const RegistrationForm: FC<TProps & InjectedFormProps<TRegData, TProps>> = ({handleSubmit, navigation}) => {
  const thunkDispatch: ThunkDispatch<AppStateType, unknown, AuthActionType> = useDispatch()

  const form = useSelector((state: AppStateType) => state.form.ResetPwdForm)
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const email = form && form.values && form.values.email
  const [error, setError] = useState('')


  const submit = (regData: TRegData) => {
    if (email) {
      thunkDispatch(register(regData)).catch(err => {
        setError(err.message)
      })
    }
    else {
      setError('Введите E-mail')
    }
  }

  return (
    <View>
      <Field
        name="email"
        component={renderAuthInput}
        placeholder={'Адрес эл. почты'}
      />
      <Button
        title="Восстановить пароль"
        type="outline"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        loadingProps={styles.buttonLoading}
        containerStyle={styles.buttonContainer}
        onPress={handleSubmit(submit)}
        loading={isFetching}
      />
      <View style={{...styles.additionalButtonsContainer}}>
        <TouchableOpacity onPress={() => {navigation.navigate('LogIn')}}>
          <Text style={styles.additionalButtonText}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('Registration')}}>
          <Text style={styles.additionalButtonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
      {!!error && <Text style={styles.error}>
        {error}
      </Text>}
    </View>
  )
}

export default reduxForm<TRegData, TProps>({
  form: 'ResetPwdForm'
})(RegistrationForm)

import React, {FC} from 'react';
import {View} from 'react-native';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {handleAddMeaning, onAddMeaning} from "../../assets/helpers";
import {InputIcon, renderCustomInput} from "../../assets/formElems";


type TFormData = {
  title: string
}

type TProps = {
  titleValue: string
  meaningValue: string
}

const AddWordForm: FC<TProps & InjectedFormProps<TFormData, TProps>> = ({titleValue, meaningValue}) => {
  const addedMeanings = useSelector((state: AppStateType) => state.words.addedMeanings)
  const correctMeaningValue: boolean = !!(meaningValue && meaningValue.replace(/\s/g, '').length) // проверка не содержит ли строка только пробелы и переносы строк
  const dispatch = useDispatch();

  const onPlusPress = () => {
    if (!meaningValue) return
    meaningValue = meaningValue.trim().toLowerCase();
    handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'AddWordForm', correctMeaningValue);
  }

  return (
    <View>
      <Field
        name="title"
        component={renderCustomInput}
        placeholder={'Слово'}
      />
      <Field
        name="meaning"
        component={renderCustomInput}
        placeholder={'Значение'}
        rightIcon={<InputIcon onIconPress={onPlusPress}/>}
      />
    </View>
  );
};

export default reduxForm<TFormData, TProps>({
  form: 'AddWordForm'
})(AddWordForm)


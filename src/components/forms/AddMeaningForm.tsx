import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import {Field, InjectedFormProps, reduxForm, formValueSelector} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store/configureStore";
import {handleAddMeaning, onAddMeaning} from "../../assets/helpers";
import {setAddedMeanings} from "../../redux/actions/wordsActions";
import {renderAddMeaningInput} from "../../assets/formElems";


type TFormData = {
  meaning: string
}

type TProps = {
  meanings: Array<string>
}

const selector = formValueSelector('AddMeaningForm');

const AddMeaningForm: FC<TProps & InjectedFormProps<TFormData, TProps>> = ({meanings}) => {
  const addedMeanings = useSelector((state: AppStateType) => state.words.addedMeanings)
  let meaningValue = useSelector((state: AppStateType) => selector(state, 'meaning'))
  const correctMeaningValue: boolean = !!(meaningValue && meaningValue.replace(/\s/g, '').length) // проверка не содержит ли строка только пробелы и переносы строк
  const dispatch = useDispatch();

  const onIconPress = () => {
    if (!meaningValue) return
    meaningValue = meaningValue.trim().toLowerCase();
    handleAddMeaning(addedMeanings, meaningValue, onAddMeaning, dispatch, 'AddMeaningForm', correctMeaningValue);
  }

  useEffect(() => {
    dispatch(setAddedMeanings(meanings));
  }, []);

  return (
    <View>
      <Field
        name="meaning"
        component={renderAddMeaningInput}
        placeholder={'Добавить значение'}
        onIconPress={onIconPress}
      />
    </View>
  );
};

export default reduxForm<TFormData, TProps>({
  form: 'AddMeaningForm'
})(AddMeaningForm)


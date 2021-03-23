import React, {FC, JSXElementConstructor, ReactHTMLElement, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions, ScrollView, TouchableWithoutFeedback
} from "react-native";
import {OptionsType, SetNameType, WordType} from "../../types/types";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {getSet, TGetSet} from "../../redux/actions/wordsActions";
import {useDispatch, useSelector} from "react-redux";
import WordItem from "./WordItem";
import index from "@react-native-community/masked-view";
import {errorColor, primaryBackgroundColor, primaryColor, secondaryBackgroundColor} from "../../assets/styles";
import {Icon} from "react-native-elements";
import WordDetailsModal from "./WordDetailsModal";

type TProps = {
  setName: SetNameType
}

const Set: FC<TProps> = ({setName}) => {
  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const [modalShown, setModalShown] = useState(false)

  const getWords = getSet(setName)
  const renderItem: ListRenderItem<WordType> = ({item}) => {
    return (
      <WordItem word={item} setModalShown={setModalShown}/>
    )
  }
  const keyExtractor = (word: WordType) => word.id + '';

  let set = useSelector((state: AppStateType) => state.words[setName])

  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const uid = useSelector((state: AppStateType) => state.auth.id)
  const options = useSelector((state: AppStateType) => state.auth.options)

  const fetchData = async () => {
    thunkDispatchGetSet(getWords(uid as number, options as OptionsType))
  }

  useEffect(() => {
    // (async () => thunkDispatchGetSet(getWords(uid as number, options as OptionsType)))()
    fetchData()
  }, [setName])

  return (
    <View style={styles.container}>
      <FlatList<WordType>
        data={set}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={isFetching}
        onRefresh={fetchData}
        // onEndReached={this.onScrollToEnd}
        onEndReachedThreshold={0.2}
        // initialNumToRender={20}
        // maxToRenderPerBatch={20}
      />
      <WordDetailsModal setModalShown={setModalShown} modalShown={modalShown}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: primaryBackgroundColor,
    flex: 1
  }
})

export default Set;

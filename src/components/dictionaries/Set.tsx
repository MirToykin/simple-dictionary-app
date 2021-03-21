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
  //todo заменить на set после тестов
  const data = [
    {
      id: 264,
      category: "current",
      title: "to ponder",
      meanings: "задуматься/размышлять/обдумывать",
      user_id: 7,
      created_at: "2020-11-17T09:47:36.000000Z",
      updated_at: "2021-01-18T17:20:54.000000Z"
    },
    {
      id: 644,
      category: "current",
      title: "to gain insight into",
      meanings: "чтобы получить представление о/чтобы понять",
      user_id: 7,
      created_at: "2021-02-02T08:35:33.000000Z",
      updated_at: "2021-02-05T05:05:02.000000Z"
    },
    {
      id: 278,
      category: "current",
      title: "prominent",
      meanings: "известный/видный/выдающийся",
      user_id: 7,
      created_at: "2020-11-18T10:13:11.000000Z",
      updated_at: "2021-02-01T05:10:38.000000Z"
    }
  ] as Array<WordType>;

  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const uid = useSelector((state: AppStateType) => state.auth.id)
  const options = useSelector((state: AppStateType) => state.auth.options)

  useEffect(() => {
    (async () => thunkDispatchGetSet(getWords(uid as number, options as OptionsType)))()
  }, [setName])

  return (
    <View style={styles.container}>
      <FlatList<WordType>
        data={set}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={isFetching}
        // onRefresh={this.onRefresh}
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

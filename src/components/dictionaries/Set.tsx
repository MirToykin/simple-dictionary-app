import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View
} from "react-native";
import {OptionsType, SetNameType, WordType} from "../../types/types";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {deleteWords, getSet, moveWords, TGetSet, TMoveAndDeleteWords} from "../../redux/actions/wordsActions";
import {useDispatch, useSelector} from "react-redux";
import WordItem from "./WordItem";
import {
  primaryBackgroundColor
} from "../../assets/styles";
import WordDetailsModal from "./WordDetailsModal";
import ActionButtons from "./ActionButtons";
import AddWordModal from "./AddWordModal";

type TProps = {
  setName: SetNameType
}

const Set: FC<TProps> = ({setName}) => {
  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const [editModalShown, setEditModalShown] = useState(false)
  const [addModalShown, setAddModalShown] = useState(false)
  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])

  const routes: Array<SetNameType> = ['next', 'current', 'done']
  const setTitles = {
    next: 'На очереди',
    current: 'На изучении',
    done: 'Изучено'
  }
  const currentSetIndex = routes.indexOf(setName)
  const nextSet = currentSetIndex === routes.length - 1 ? routes[0] : routes[currentSetIndex + 1]
  const prevSet: SetNameType = currentSetIndex === 0 ? routes[routes.length - 1] : routes[currentSetIndex - 1]

  const getWords = getSet(setName)
  const renderItem: ListRenderItem<WordType> = ({item}) => {
    return (
      <WordItem word={item} setModalShown={setEditModalShown} setSelectedIDs={setSelectedIDs}/>
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
    fetchData()
    setSelectedIDs([])
  }, [setName])

  const handleMove = (idsArr: Array<number>, setToMoveTo: SetNameType, setToRemoveFrom: SetNameType, options: OptionsType): void => {
    thunkDispatchMoveAndDelete(moveWords(idsArr, setToMoveTo, setToRemoveFrom, options))
    setSelectedIDs([]);
  }

  const handleDelete = (setToRemoveFrom: SetNameType, idsArray: Array<number>, options: OptionsType): void => {
    thunkDispatchMoveAndDelete(deleteWords(setToRemoveFrom, idsArray, options))
    setSelectedIDs([]);
  }

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
      <WordDetailsModal setModalShown={setEditModalShown} modalShown={editModalShown}/>
      <AddWordModal modalShown={addModalShown} setModalShown={setAddModalShown} setName={setName}/>
      <ActionButtons
        setName={setName}
        setAddModalShown={setAddModalShown}
        selectedIDs={selectedIDs}
        nextSetName={setTitles[nextSet]}
        prevSetName={setTitles[prevSet]}
        handleDelete={() => {
          handleDelete(setName, selectedIDs, options as OptionsType)
        }}
        handleMoveForward={() => {
          handleMove(selectedIDs, nextSet, setName, options as OptionsType)
        }}
        handleMoveBack={() => {
          handleMove(selectedIDs, prevSet, setName, options as OptionsType)
        }}
      />
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

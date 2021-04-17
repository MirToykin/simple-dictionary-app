import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Animated
} from "react-native";
import {OptionsType, SetNameType, TSliderSpacer, WordType} from "../../types/types";
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
import WordItemCard from "./WordItemCard";

type TProps = {
  setName: SetNameType
}

const {width, height} = Dimensions.get('window')

const Set: FC<TProps> = ({setName}) => {
  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const [editModalShown, setEditModalShown] = useState(false)
  const [addModalShown, setAddModalShown] = useState(false)
  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])
  const [sliderMode, setSliderMode] = useState(false)

  const slideWidth = width * 0.9
  const slideHeight = height * 0.75

  const isSlider = sliderMode && setName === 'current';
  const scrollX = useRef(new Animated.Value(0)).current

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

  const renderItemCard: ListRenderItem<WordType | TSliderSpacer> = ({item, index}) => {
      const inputRange = [
        (index - 2) * slideWidth,
        (index - 1) * slideWidth,
        index * slideWidth,
      ]

      let translateY = scrollX.interpolate({
        inputRange,
        outputRange: [0, -30, 0]
      })
    return (
        <WordItemCard word={item}
                      setModalShown={setEditModalShown}
                      setSelectedIDs={setSelectedIDs}
                      translateY={translateY}
                      slideWidth={slideWidth}
                      slideHeight={slideHeight}
                      width={width}
        />
    )
  }
  const keyExtractor = (word: WordType | TSliderSpacer) => word.id + '';

  let set = useSelector((state: AppStateType) => state.words[setName])
  let sliderSet: Array<WordType | TSliderSpacer> = []

  if (isSlider) sliderSet = [{key: 'left-spacer', id: -1}, ...set, {key: 'right-spacer', id: 0}]

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
      {isSlider ? <Animated.FlatList<WordType | TSliderSpacer>
        data={sliderSet}
        renderItem={renderItemCard}
        keyExtractor={keyExtractor}
        refreshing={isFetching}
        horizontal={isSlider}
        onRefresh={fetchData}
        onEndReachedThreshold={0.2}
        snapToInterval={slideWidth}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true}
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContainer}
      /> :
        <FlatList<WordType>
          data={set}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={isFetching}
          onRefresh={fetchData}
          onEndReachedThreshold={0.2}
          initialNumToRender={20}
        />}

      <WordDetailsModal setModalShown={setEditModalShown} modalShown={editModalShown}/>
      <AddWordModal modalShown={addModalShown} setModalShown={setAddModalShown} setName={setName}/>
      <ActionButtons
        setName={setName}
        setAddModalShown={setAddModalShown}
        selectedIDs={selectedIDs}
        nextSetName={setTitles[nextSet]}
        prevSetName={setTitles[prevSet]}
        setSliderMode={setSliderMode}
        sliderMode={sliderMode}
        screenWidth={width}
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
  },
  flatListContainer: {
    alignItems: 'flex-end',
    paddingBottom: 30
  }
})

export default Set;

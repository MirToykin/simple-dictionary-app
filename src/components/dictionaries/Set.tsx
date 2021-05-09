import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Animated as RNAnimated, TouchableOpacity, Text
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
import CardActionButtons from "./CardActionButtons";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {CARD_BUTTONS_HEIGHT, SLIDE_WIDTH, width} from "../../constants";

type TProps = {
  setName: SetNameType
}

// const {width, height} = Dimensions.get('window')

const Set: FC<TProps> = ({setName}) => {
  console.log('set rendered')
  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const [editModalShown, setEditModalShown] = useState(false)
  const [addModalShown, setAddModalShown] = useState(false)
  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])
  const [sliderMode, setSliderMode] = useState(false)
  const [deletedIndex, setDeletedIndex] = useState<null | number>(null)
  const [shownSlideWord, setShownSlideWord] = useState<null | WordType>(null)
  const [shownSlideWordIndex, setShownSlideWordIndex] = useState<null | number>(null)

  let set = useSelector((state: AppStateType) => state.words[setName])
  let sliderSet: Array<WordType | TSliderSpacer> = []
  const [flatListRef, setFlatListRef] = useState<any>(null)

  const isSlider = sliderMode && setName === 'current';
  if (isSlider) sliderSet = [{key: 'left-spacer', id: -1}, ...set, {key: 'right-spacer', id: 0}]

  const routes: Array<SetNameType> = ['next', 'current', 'done']
  const setData = {
    next: {title: 'На очереди', icon: {name: 'angle-double-right', type: 'font-awesome'}},
    current: {title: 'На изучении', icon: {name: 'graduation-cap', type: 'font-awesome'}},
    done: {title: 'Изучено', icon: {name: 'done-all', type: 'material'}}
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

  const scrollToIndex = () => {
    flatListRef.scrollToIndex({index: 5, animated: true})
  }

  const renderItemCard: ListRenderItem<WordType | TSliderSpacer> = ({item, index}) => {
    return (
      <WordItemCard word={item}
                    index={index}
                    setDeletedIndex={setDeletedIndex}
                    setModalShown={setEditModalShown}
                    setSelectedIDs={setSelectedIDs}
                    slideWidth={SLIDE_WIDTH}
                    width={width}
                    scrollToIndex={scrollToIndex}
      />
    )
  }
  const keyExtractor = (word: WordType | TSliderSpacer) => word.id + '';
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const uid = useSelector((state: AppStateType) => state.auth.id)
  const options = useSelector((state: AppStateType) => state.auth.options)

  const fetchData = async () => {
    thunkDispatchGetSet(getWords(uid as number, options as OptionsType)).catch(() => {})
  }

  useEffect(() => {
    fetchData()
    setSelectedIDs([])
  }, [setName])

  const handleMove = (idsArr: Array<number>, setToMoveTo: SetNameType, setToRemoveFrom: SetNameType, options: OptionsType): void => {
    thunkDispatchMoveAndDelete(moveWords(idsArr, setToMoveTo, setToRemoveFrom, options)).catch(() => {})
    setSelectedIDs([]);
  }

  const handleDelete = (setToRemoveFrom: SetNameType, idsArray: Array<number>, options: OptionsType): void => {
    thunkDispatchMoveAndDelete(deleteWords(setToRemoveFrom, idsArray, options)).catch(() => {})
    setSelectedIDs([]);
  }

  const onViewRef = useRef((viewableItems: any)=> {
    const visibleCard = viewableItems.viewableItems[1]
    visibleCard && setShownSlideWordIndex(visibleCard.index)
    visibleCard && setShownSlideWord(visibleCard.item)
  }).current

  return (
    <View style={styles.container}>
      {isSlider ? <RNAnimated.FlatList<WordType | TSliderSpacer> //Animated.FlatList рендерится быстрее чем FlatList ???
          data={sliderSet}
          renderItem={renderItemCard}
          keyExtractor={keyExtractor}
          // refreshing={isFetching}
          horizontal
          // onRefresh={fetchData}
          onEndReachedThreshold={0.2}
          snapToInterval={SLIDE_WIDTH}
          decelerationRate={0}
          bounces={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={2}
          ref={(ref) => setFlatListRef(ref)}
          onViewableItemsChanged={onViewRef}
        /> :
        <FlatList<WordType>
          data={set}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={isFetching}
          onRefresh={fetchData}
          onEndReachedThreshold={0.2}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
        />}

      <ActionButtons
        setName={setName}
        setAddModalShown={setAddModalShown}
        selectedIDs={selectedIDs}
        nextSetData={setData[nextSet]}
        prevSetData={setData[prevSet]}
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
      <CardActionButtons
        setModalShown={setEditModalShown}
        isSlider={isSlider}
        shownSlideWord={shownSlideWord}
        shownSlideWordIndex={shownSlideWordIndex}
        flatListRef={flatListRef}
      />
      <WordDetailsModal setModalShown={setEditModalShown} modalShown={editModalShown}/>
      <AddWordModal modalShown={addModalShown} setModalShown={setAddModalShown} setName={setName}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: primaryBackgroundColor,
    flex: 1
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: "absolute",
    alignItems: "center",
    top: 0,
    right: 0,
    left: 0
  },
  flatListContainer: {
    alignItems: 'stretch',
    paddingVertical: 50,
  }
})

export default Set;

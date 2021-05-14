import React, {FC, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  Animated as RNAnimated, Text
} from "react-native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {SetNameType, TSliderSpacer, WordType} from "../../types/types";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store/configureStore";
import {
  deleteWords,
  getSet,
  moveWords, setCurrentTab,
  TGetSet,
  TMoveAndDeleteWords,
  TSetCurrentTabAction
} from "../../redux/actions/wordsActions";
import {useDispatch, useSelector} from "react-redux";
import WordItem from "./WordItem";
import {
  primaryBackgroundColor, textPrimaryColor
} from "../../assets/styles";
import WordDetailsModal from "./WordDetailsModal";
import ActionButtons from "./ActionButtons";
import AddWordModal from "./AddWordModal";
import WordItemCard from "./WordItemCard";
import CardActionButtons from "./CardActionButtons";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {
  SLIDE_WIDTH,
  SLIDER_SPACER_WIDTH,
  width,
  height,
  HEADER_HEIGHT
} from "../../constants";
import {Dispatch} from "redux";

type TProps = {
  setName: SetNameType
}

const sliderOffset = -(height - HEADER_HEIGHT)

const Set: FC<TProps> = ({setName}) => {
  console.log('set rendered')
  const thunkDispatchGetSet: ThunkDispatch<AppStateType, unknown, TGetSet> = useDispatch()
  const thunkDispatchMoveAndDelete: ThunkDispatch<AppStateType, unknown, TMoveAndDeleteWords> = useDispatch()
  const dispatch: Dispatch<TSetCurrentTabAction> = useDispatch()
  const [editModalShown, setEditModalShown] = useState(false)
  const [addModalShown, setAddModalShown] = useState(false)
  const [selectedIDs, setSelectedIDs] = useState<Array<number>>([])
  const [sliderMode, setSliderMode] = useState(false)
  const [shownSlideWord, setShownSlideWord] = useState<null | WordType>(null)
  const [shownSlideWordIndex, setShownSlideWordIndex] = useState<null | number>(null)

  let set = useSelector((state: AppStateType) => state.words[setName])
  let sliderSet: Array<WordType | TSliderSpacer> = [{key: 'left-spacer', id: -1}, ...set, {key: 'right-spacer', id: 0}]
  const [flatListRef, setFlatListRef] = useState<any>(null)

  const isSlider = sliderMode && setName === 'current';

  const routes: Array<SetNameType> = ['next', 'current', 'done']
  const setData = {
    next: {title: 'На очереди', icon: <FontAwesomeIcon name={'angle-double-right'} size={35} color={textPrimaryColor} style={{paddingLeft: 5}}/>},
    current: {title: 'На изучении', icon: <FontAwesomeIcon name={'graduation-cap'} size={30} color={textPrimaryColor}/>},
    done: {title: 'Изучено', icon: <MaterialIcon name={'done-all'} size={30} color={textPrimaryColor}/>}
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
    return (
      <WordItemCard word={item}
                    slideWidth={SLIDE_WIDTH}
                    width={width}
      />
    )
  }

  const getItemLayout = (data: (WordType | TSliderSpacer)[] | null | undefined, index: number) => {
    const isSpacer = index === 0 || index === set.length - 1
    const itemWidth = isSpacer ? SLIDER_SPACER_WIDTH : SLIDE_WIDTH
    const offset = index === 0 ? 0 : SLIDE_WIDTH * (index - 1) + SLIDER_SPACER_WIDTH
    return {length: itemWidth, offset: offset, index}
  }

  const ListEmptyComponent = () => (
    <View style={styles.listEmptyContainer}>
      <Text style={styles.listEmptyText}>В данном наборе слов пока нет</Text>
    </View>
  )

  const keyExtractor = (word: WordType | TSliderSpacer) => word.id + '';
  const isFetching = useSelector((state: AppStateType) => state.app.isFetching)
  const uid = useSelector((state: AppStateType) => state.auth.id)

  const fetchData = async () => {
    thunkDispatchGetSet(getWords(uid as number)).catch(() => {})
  }

  useEffect(() => {
    fetchData().catch(() => {
      //todo сделать toast на случай ошибки
    })
    setSelectedIDs([])
    dispatch(setCurrentTab(setName))
  }, [setName])

  const handleMove = (idsArr: Array<number>, setToMoveTo: SetNameType, setToRemoveFrom: SetNameType): void => {
    thunkDispatchMoveAndDelete(moveWords(idsArr, setToMoveTo, setToRemoveFrom)).catch(() => {})
    setSelectedIDs([]);
  }

  const handleDelete = (setToRemoveFrom: SetNameType, idsArray: Array<number>): void => {
    thunkDispatchMoveAndDelete(deleteWords(setToRemoveFrom, idsArray)).catch(() => {})
    setSelectedIDs([]);
  }

  const onViewRef = useRef((viewableItems: any)=> {
    const visibleCard = viewableItems.viewableItems[1]
    visibleCard && setShownSlideWordIndex(visibleCard.index)
    visibleCard && setShownSlideWord(visibleCard.item)
  }).current

  const offset = useSharedValue(sliderOffset)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: withTiming(offset.value * +!isSlider)
    };
  });

  return (
    <View style={styles.container}>
      {setName === 'current' && <Animated.View style={[styles.sliderContainer, animatedStyle]}>
        <RNAnimated.FlatList<WordType | TSliderSpacer> //Animated.FlatList рендерится быстрее чем FlatList ???
          data={sliderSet}
          renderItem={renderItemCard}
          keyExtractor={keyExtractor}
          horizontal
          onEndReachedThreshold={0.2}
          snapToInterval={SLIDE_WIDTH}
          decelerationRate={"fast"}
          bounces={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.cardFlatListContainer}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={2}
          ref={(ref) => setFlatListRef(ref)}
          onViewableItemsChanged={onViewRef}
          getItemLayout={getItemLayout}
        />
      </Animated.View>}
      <View>
        <FlatList<WordType>
          data={set}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={isFetching}
          onRefresh={fetchData}
          onEndReachedThreshold={0.2}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={!set.length && styles.listFlatListContainer}
        />
      </View>
      <ActionButtons
        setName={setName}
        setAddModalShown={setAddModalShown}
        selectedIDs={selectedIDs}
        nextSetData={setData[nextSet]}
        prevSetData={setData[prevSet]}
        setSliderMode={setSliderMode}
        sliderMode={sliderMode}
        screenWidth={width}
        isSetEmpty={!set.length}
        handleDelete={() => {
          handleDelete(setName, selectedIDs)
        }}
        handleMoveForward={() => {
          handleMove(selectedIDs, nextSet, setName)
        }}
        handleMoveBack={() => {
          handleMove(selectedIDs, prevSet, setName)
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
  sliderContainer: {
    position: 'absolute',
    height: '100%',
    backgroundColor: primaryBackgroundColor,
    zIndex: 1,
    bottom: sliderOffset
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
  cardFlatListContainer: {
    alignItems: 'stretch',
    paddingVertical: 50,
  },
  listFlatListContainer: {
    alignItems: 'center',
    flex: 1,
  },
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  listEmptyText: {
    color: textPrimaryColor,
    fontSize: 18
  }
})

export default Set;

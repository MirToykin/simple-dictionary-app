import {Dimensions, StatusBar} from "react-native";


//---------- Размеры ----------------
export const {width, height} = Dimensions.get('window')
export const ACTION_BUTTON_SIZE = 45;
export const ACTION_BUTTON_SPACING = 10;
export const SLIDE_WIDTH = width * 0.9
export const CARD_BUTTONS_HEIGHT = 60
export const SLIDER_SPACER_WIDTH = (width - SLIDE_WIDTH) / 2

export const TAB_BAR_HEIGHT = 50
export const HEADER_HEIGHT = 50
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight

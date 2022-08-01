import { Dimensions, PixelRatio, Platform } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
const { width } = Dimensions.get("window");

export interface IconProps {
  active?: boolean;
}
export const iconload = require('../assets/image/890-loading-animation.json');
export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
const numberOfIcons = 4;
const horizontalPadding = 75;
export const DURATION = 450;
export const PADDING = 16;
export const SEGMENT = 100
export const ICON_SIZE = SEGMENT - horizontalPadding;
export const frameWidth = 350;
export const frameHeight = 350;
export const Colors = {
  active: "#FFF",
  forcus: "#FFF",
  notactive:'#ffbcc0',
  dark:'#000'
};


export const SCREEN_HEIGHT : number = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH : number = Math.round(Dimensions.get('window').width)
export const SCREEN_WIDTH_No : number = Dimensions.get('window').width
export const TYPE_READ : any = {
  VERTICAL: 0,
  HORIZONTAL: 1,
}

export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
};

export const paddingBottom = isIphoneX() ? 20 : 0;


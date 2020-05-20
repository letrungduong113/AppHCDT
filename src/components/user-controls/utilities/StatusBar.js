import { Dimensions, Platform, StatusBar } from 'react-native';
import {verticalScale,moderateScale} from './Scale'
var headerHeight = verticalScale(120)

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX = false;
let isIPhoneXSMAX = false;
if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT;
}
if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneXSMAX = W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}
export function getHomePaddingTop() {
    if(Platform.OS=='android')
        return moderateScale(20);
    if(isIPhoneX||isIPhoneXSMAX){
        return 25;
    }
    return moderateScale(20);
}
export function getPaddingTop() {
    if(Platform.OS=='android')
        return moderateScale(35);
    if(isIPhoneX){
        return 40;
    }
    if(isIPhoneXSMAX){
        return 40;
    }
    return 10;
}
export function getHeaderSize(home = false) {
    if(Platform.OS=='android')
        return headerHeight;
    if(isIPhoneX||isIPhoneXSMAX){
        return 88;
    }
    return home?verticalScale(128):64;
}
export function getStatusBarHeight(skipAndroid) {
    return Platform.select({
        ios: isIPhoneX||isIPhoneXSMAX ? 0 : 0,
        android: skipAndroid ? 0 : StatusBar.currentHeight,
        default: 0
    })
}
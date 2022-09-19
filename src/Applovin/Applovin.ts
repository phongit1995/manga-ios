import {Platform} from 'react-native';
import AppLovinMAX from 'react-native-applovin-max';
import * as config from './../../config';
const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  android: config.APPLOVIN_ANDROID_INTERSTITIAL_AD_UNIT_ID,
  ios: config.APPLOVIN_IOS_INTERSTITIAL_AD_UNIT_ID,
});
import {navigate, replace} from '../navigations/NavigationService';
import analytics from '@react-native-firebase/analytics';
import {stores} from '../../App';
export class ApplovinService {
  constructor() {
    this.initializeInterstitialEventAds();
  }
  private numberShowAds: number = 5;
  private numberCount: number = 4;
  private navigates: any;
  private types: any;
  private keys: any;
  private initializeInterstitialEventAds() {
    AppLovinMAX.addEventListener('OnInterstitialLoadedEvent', () => {
      console.log('====================================');
      console.log('OnInterstitialLoadedEvent');
      console.log('====================================');
      analytics().logEvent('APPLOVIN_LOAD_ADS_SUCCESS');
    });

    AppLovinMAX.addEventListener('OnInterstitialLoadFailedEvent', () => {
      console.log('====================================');
      console.log('OnInterstitialLoadedEvent');
      console.log('====================================');
      analytics().logEvent('APPLOVIN_LOAD_ADS_FAIL');
    });
    AppLovinMAX.addEventListener('OnInterstitialDisplayedEvent', () => {
      console.log('====================================');
      console.log('OnInterstitialDisplayedEvent');
      console.log('====================================');
      analytics().logEvent('APPLOVIN_DISPLAY_ADS_SUCCESS');
    });
    AppLovinMAX.addEventListener('OnInterstitialClickedEvent', () => {
      console.log('====================================');
      console.log('OnInterstitialClickedEvent');
      console.log('====================================');
      analytics().logEvent('APPLOVIN_CLICK_ADS_SUCCESS');
    });
    AppLovinMAX.addEventListener('OnInterstitialAdFailedToDisplayEvent', () => {
      console.log('====================================');
      console.log('OnInterstitialAdFailedToDisplayEvent');
      this.navigation();
      console.log('====================================');
    });
    AppLovinMAX.addEventListener('OnInterstitialHiddenEvent', () => {
      console.log('====================================');
      console.log('OnInterstitialHiddenEvent');
      console.log('====================================');
      analytics().logEvent('APPLOVIN_HIDDEN_ADS_SUCCESS');
      this.loadAds();
      this.navigation(); //chuyển sang  màn hình B đóng ads
    });
  }
  public loadAds() {
    if (!AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID)) {
      AppLovinMAX.loadInterstitial(INTERSTITIAL_AD_UNIT_ID);
    }
  }
  private showAds() {
    if (AppLovinMAX.isInterstitialReady(INTERSTITIAL_AD_UNIT_ID)) {
      AppLovinMAX.showInterstitial(INTERSTITIAL_AD_UNIT_ID);
    } else {
      this.loadAds();
      this.navigation();
    }
  }
  public showAdsFull(type?: string, key?: any, navi?: string | null) {
    this.types = type;
    this.keys = key;
    this.navigates = navi;
    // when add inapp
    if (stores.getState().FunctionReduce.isPremium) return this.navigation();
    if (this.numberCount == this.numberShowAds - 1) {
      this.loadAds();
    }
    if (this.numberCount == this.numberShowAds) {
      this.showAds();
      this.numberCount = 0;
    } else {
      this.navigation();
    }
    this.numberCount += 1;
  }
  public async navigation() {
    if (!this.navigates)
      return navigate(this.types, this.keys ? this.keys : null);
    replace(this.types, this.keys ? this.keys : null);
  }
}
export default new ApplovinService();
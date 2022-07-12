import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : "ca-app-pub-3809275610134580/7460790415";

import Sentry from './../common/Sentry';
import analytics from '@react-native-firebase/analytics';
import { stores } from '../../App'
import { navigate, replace } from '../navigations/NavigationService'
class AdmodService {
    constructor() {
        this.number_count = 4;
    }
    private types: any;
    private keys: any;
    private navigates: any;
    private eventListener: any;
    private interstitial: any;
    private number_count: number;
    private number_show_ads: number = 6;
    public loadAdmod() {
        this.interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
        })
        if(this.interstitial?.loaded){
            return ;
        }
        this.eventListener = this.interstitial.onAdEvent((type, error: Error, reward) => {
            console.log(error)
            if (type === AdEventType.LOADED) {
                analytics().logEvent("LOAD_ADS_SUCCESS");
            }
            if (type == AdEventType.OPENED) {
                analytics().logEvent("OPEN_ADS");
            }
            if (type == AdEventType.ERROR) {
                analytics().logEvent("ERROR_LOAD_ADS");
                Sentry.captureMessage(error.message);
            }
            if (type == AdEventType.CLOSED) {
                analytics().logEvent("CLOSED_LOAD_ADS");
                this.navigation();//chuyển sang  màn hình B đóng ads
            }
            if (type == AdEventType.CLICKED) {
                analytics().logEvent("CLICK_LOAD_ADS");
            }
        });
        this.interstitial.load();
    }
    private showAds() {
        if (this.interstitial.loaded) return this.interstitial.show()
        else this.navigation();
    }
    public async showAdsFull(type: string, key: any, navi: string | null) {
        this.types = type;
        this.keys = key;
        this.navigates = navi;
        console.log('this.interstitial?.loaded',this.interstitial?.loaded);
        if (stores.getState().FunctionReduce.isPremium) return this.navigation();
        if (this.number_count === this.number_show_ads) {
            await this.showAds();
            this.number_count = 1;
        }
        if (this.number_count === this.number_show_ads - 1) {
            await this.loadAdmod();
        }
        this.navigation();
        this.number_count += 1;
    }
    public async navigation() {
        if (!this.navigates) return navigate(this.types, this.keys ? this.keys : null)
        replace(this.types, this.keys ? this.keys : null)

    }
}
export default new AdmodService();

import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
const IN_APP_STORE_KEY = '@IN_APP_STORE_KEY';
const TIME_REVIEW = 1 * 60 * 1000;
export const InAppReviewFn = async (): Promise<void> => {
  try {
    let value: string | number | null = await AsyncStorage.getItem(
      IN_APP_STORE_KEY,
    );
    if (value) {
      value = Number(value);
      if (Date.now() - value > TIME_REVIEW) {
        if (InAppReview.isAvailable()) {
          console.log('IN_APP_STORE_KEY', value);
          AsyncStorage.setItem(IN_APP_STORE_KEY, Date.now().toString());
          const result = await InAppReview.RequestInAppReview();
          console.log('resultInAppReview', result);
          analytics().logEvent('IN_APP_REVIEW_SUCCESS');
        }
      }
    } else {
      AsyncStorage.setItem(IN_APP_STORE_KEY, Date.now().toString());
    }
  } catch (error) {
    console.log('inapp review fail',error);
    analytics().logEvent('IN_APP_REVIEW_FAIL');
  }
};
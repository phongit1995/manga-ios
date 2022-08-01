import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  ToastAndroid,
  Platform
} from 'react-native';
import Navigation from './src/navigations';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store'
import { checkVersionUpdate } from './src/api/version';
import CustomModal from './src/components/CustomModal/CustomModal';
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import FunctionReduce from './src/redux/reducers/FunctionReduce'
import thunk from 'redux-thunk';
import codePush from "react-native-code-push";
import { applyMiddleware, compose } from 'redux';
import { fcmService } from './src/firebase/FCMService';
import { OnRegisterNotification, onNotification, onOpenNotification } from './src/notification/NotificationService';
import { localNotificationService } from './src/firebase/LocalNotificationService';

import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
const rootReducer = combineReducers<any>({
  FunctionReduce
})
const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]
export const stores: any = createStore(rootReducer, compose(...enhancers))
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  ProductPurchase,
  PurchaseError,
  initConnection,
  finishTransaction
} from 'react-native-iap';
import * as RNIap from 'react-native-iap'
import { dispatchPermium, dispatchNetWork } from './src/redux/action/FunctionAction'
import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const cache = new Cache({
  namespace: "myapp",
  policy: {
      stdTTL: 0
  },
  backend: AsyncStorage
});
const App = () => {
  let [backClickCount, setbackClickCount] = React.useState<number>(0)
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {
    checkVersionUpdate().then(result => {
      if (result.data.data == false) {
        setModalVisible(true)
      }
    }).catch(error => console.log(error))

    return () => {
      console.log("[App] unRegister")

    }
  }, []);

  React.useEffect(() => {
    let purchaseUpdateSubscription: any = null
    let purchaseErrorSubscription: any = null
    initConnection().catch((e) => console.log(e))
      .then(() => {
        RNIap.flushFailedPurchasesCachedAsPendingAndroid().catch((e) => {
          stores.dispatch(dispatchPermium(false))
        }).then(() => {
          purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase: any) => {
            console.log('purchaseUpdatedListener', purchase);
            const receipt = purchase.transactionReceipt;
            if (receipt) {
              stores.dispatch(dispatchPermium(true))
              if (Platform.OS === 'android') {
                await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
                await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
              }
              RNIap.finishTransaction(purchase, false);
            } else {
              stores.dispatch(dispatchPermium(false))
            }
          })
        });
        purchaseErrorSubscription = purchaseErrorListener(
          (error: PurchaseError) => {
            console.log('purchaseErrorListener', error);
          },
        );
      })
    return () => {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
  }, [])
  const backPressHandler = () => {
    if (backClickCount < 1) {
      backClickCount += 1;
      ToastAndroid.show("Press again to close !", ToastAndroid.SHORT);
    }
    setTimeout(() => {
      backClickCount = 0;
    }, 2000);
  };
  // Setup notification
  React.useEffect(() => {
    stores.dispatch(dispatchNetWork())
    fcmService.registerAppWithFCM();
    fcmService.register(OnRegisterNotification, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    admob().setRequestConfiguration({ maxAdContentRating: MaxAdContentRating.PG, tagForChildDirectedTreatment: true, tagForUnderAgeOfConsent: true }).then(() => { console.log("Success Admod") }).catch((error) => console.log("Error ADMOD"));
    const backHandler = BackHandler.addEventListener('hardwareBackPress', (): any => {
      if (backClickCount === 1) {
        BackHandler.exitApp();
        backHandler.remove()
        return true;
      }
      backPressHandler();
      return true;

    });
    return () => {
      backHandler.remove()
      setbackClickCount(0)
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {
            modalVisible ? <CustomModal {...{ modalVisible, setModalVisible }} title="New Version" type={0}> Have new version . Please update to use </CustomModal> : null
          }
          <View style={styles.container}>

            <Navigation></Navigation>
          </View>
        </View>
      </PersistGate>
    </Provider>
  );
};
const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START, installMode: codePush.InstallMode.IMMEDIATE };
//export default codePush(codePushOptions)(App);
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

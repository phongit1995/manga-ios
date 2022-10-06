import moment from "moment";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";
import * as SCREEN from '../constants/ScreenTypes';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

const handlePushNotificationAction = (navigation, data: any) => {
    if (!data) return;
    navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN,{item:data,id:data._id})

};

const SetupNotification = (props) => {
    const navi = useNavigation<any>();
    useEffect(() => {
        messaging().onNotificationOpenedApp((remoteMessage) => {
            if (remoteMessage) {
                const data = remoteMessage?.data;
                if (!data) return;
                handlePushNotificationAction(navi, data);
            }
        });

        messaging()
            .getInitialNotification()
            .then((remoteMessage) => {
                if (remoteMessage) {
                    const data = remoteMessage?.data;
                    if (!data) return;
                    handlePushNotificationAction(navi, data);
                }
            });
    }, []);

    PushNotification.configure({
        onNotification: function (notification) {
            const clicked = notification.userInteraction;
            const data = notification?.data;
            if (!data) return;
            if (clicked) {
                handlePushNotificationAction(navi, data?.data ?? data);
            }
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        onRegistrationError: function (err) {
            console.error(err.message, err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });

    const parseDate = (date: any) => {
        const newDate = new Date(parseInt(date));
        return moment(newDate).format("DD-MM-YYYY hh:mm:ss");
    };

    useEffect(() => {
        Platform.OS === "ios" && showPermissions();
        PushNotification.createChannel(
            {
                channelId: "app-push-notification-id",
                channelName: "app-push-notification-name",
                channelDescription: "A channel to categorise your notifications",
                soundName: "default",
                importance: Importance.HIGH,
                vibrate: true,
            },
            (created: any) =>
                console.log(`createChannel ${"app-push-notification-name"} returned '${created}'`)
        );
        messaging().onMessage(async (remoteMessage) => {
            Platform.OS === "android" ? notiAndroid(remoteMessage) : notifyiOS(remoteMessage);
        });
        (async () => {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("Your Firebase Token is:", fcmToken);
            } else {
                console.log("Failed", "No token received");
            }
        })();
        messaging()
            .subscribeToTopic("all")
            .then(() => console.log("Subscribed to topic!"));
    }, []);

    useEffect(() => {
        if (Platform.OS === "ios") {
            PushNotificationIOS.addEventListener("register", onRegistered);
            PushNotificationIOS.addEventListener("registrationError", onRegistrationError);
            PushNotificationIOS.requestPermissions().then(
                (data) => {
                    // console.log('PushNotificationIOS.requestPermissions', data)
                },
                (data) => {
                    // console.log('PushNotificationIOS.requestPermissions failed', data)
                }
            );

            return () => {
                PushNotificationIOS.removeEventListener("register");
                PushNotificationIOS.removeEventListener("registrationError");
            };
        }
    }, []);

    // *************** iOS *********************

    const notifyiOS = async (remoteMessage: any) => {
        const { notification, data } = remoteMessage;
        PushNotification.localNotification(
            {
                id: "notificationWithSound",
                title: notification?.title,
                message: notification?.body || "",
                userInfo: data?.fcm_options,
            }
        );
    };

    const onRegistered = (deviceToken: any) => {
        // console.log(deviceToken)
    };

    const onRegistrationError = (error: any) => {
        // console.log(error.message)
    };
    const showPermissions = () => {
        PushNotificationIOS.checkPermissions((permissions) => {
            // console.log(permissions)
        });
    };

    // *************** iOS *********************
    const notiAndroid = (remoteMessage: any) => {
        const noti = remoteMessage.notification;
        PushNotification.localNotification({
            /* Android Only Properties */
            channelId: "app-push-notification-id",
            autoCancel: true,
            id: 0,
            showWhen: true,
            largeIconUrl: noti.android.imageUrl,
            smallIcon: "ic_launcher",
            vibrate: true,
            vibration: 600,
            invokeApp: true,
            category: "",
            userInfo: remoteMessage ? remoteMessage : {},
            title: noti && noti.title ? noti.title : "",
            message: noti && noti.body ? noti.body : "",
            onlyAlertOnce: false,
            playSound: true,
            priority: "max",
            soundName: "default",
            number: 1,
            largeIcon: "ic_launcher",
            subText: parseDate(remoteMessage.sentTime),
            bigLargeIcon: "ic_launcher",
            color: "#60a941",
            bigPictureUrl: noti.android.imageUrl,
        });
    };

    return <View />;
};

export default SetupNotification
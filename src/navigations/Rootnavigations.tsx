import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator, StackNavigationOptions, TransitionPresets } from '@react-navigation/stack';
const Stack = createStackNavigator();
import { navigationRef } from './NavigationService';
import { NavigationContainer } from '@react-navigation/native';
import * as screen from '../constants/ScreenTypes';
import MainHome from '../screens/MainHome';
import SearchComic from '../screens/SearchComic';
import AuthStack from './AuthStack';
import DetailComic from '../screens/DetailComic';
import ReadComic from '../screens/ReadComic';
import ListChappter from '../screens/ReadComic/ListChappter';
import ShowAll from '../screens/SeenAll';
import Category from '../screens/MainHome/Category';
import ListCategory from '../screens/ListCategory';
import Privacy from '../screens/Privacy';
import Download from '../screens/Activity/Download';
import ChapDowload from '../screens/ChapDowload';
import ReadDow from '../screens/ReadDow';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import Comment from '../screens/Comment';
import RepCmt from '../screens/Comment/RepCmt';
import Premium from '../screens/Premium';
import SetupNotification from '../notification/SetupNotification';

const navigationOptions: StackNavigationOptions = {
    headerShown: false,
    gestureEnabled: false
}
const AllOptionSlideFromRight: StackNavigationOptions = {
    ...TransitionPresets.FadeFromBottomAndroid,
    // cardStyle: { backgroundColor: 'transparent' }
}
const SlideFromRightIOS: StackNavigationOptions = {
    ...TransitionPresets.SlideFromRightIOS,
    // cardStyle: { backgroundColor: 'transparent' }
}

export default () => {
    const routeNameRef = React.useRef<any>();
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name}
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current?.getCurrentRoute()?.name
                if (previousRouteName !== currentRouteName) {

                }
                routeNameRef.current = currentRouteName;
            }}
        >
            <SetupNotification />
            <Stack.Navigator screenOptions={navigationOptions} >
                <Stack.Screen name={screen.MAIN_TAB} component={AuthStack} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.SEARCH_SCREEN} component={SearchComic} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.SHOWALL_LIST_SCREEN} component={ShowAll} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.DETIAL_COMIC_SCREEN} component={DetailComic} />
                <Stack.Screen options={StyleSheet.flatten(AllOptionSlideFromRight)} name={screen.DETIAL_CHAPTER} component={ReadComic} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.CHAPTER_LIST_SCREEN} component={ListChappter} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.CATEGORY_SCREEN} component={ListCategory} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.PRIVACY_SCREEN} component={Privacy} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.DOWNLOAD_SCREEN} component={Download} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.DOWNLOAD_CHAP_SCREEN} component={ChapDowload} />
                <Stack.Screen options={StyleSheet.flatten(AllOptionSlideFromRight)} name={screen.READ_DOWNLOAD_CHAP_SCREEN} component={ReadDow} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.LOGIN_SCREEN} component={Login} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.SIGN_UP_SCREEN} component={SignUp} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.COMMENT_SCREEN} component={Comment} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.REP_COMMENT_SCREEN} component={RepCmt} />
                <Stack.Screen options={StyleSheet.flatten(SlideFromRightIOS)} name={screen.PERMIUM_SCREEN} component={Premium} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


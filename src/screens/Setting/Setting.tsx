import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Switch, Text, Platform, Image, Share, Linking, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from './Header';
export const img = require('./../../assets/image/header-default.png')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
export const iconrate = require('./../../assets/image/a58.png');
export const iconleft = require('./../../assets/image/enter_arrow.png');
import { useFocusEffect, useNavigation } from '@react-navigation/native';
export const iconversion = require('./../../assets/image/iconStatus.png');
import { getVersion, getBundleId } from 'react-native-device-info';
import * as screen from './../../constants/ScreenTypes';
import { useDispatch, useSelector } from 'react-redux'
import { changeBackground___, changeBackground_, changeBackground__, changeBackground_____ } from '../../common/stringHelper';
import { dispatchDarkMode } from '../../redux/action/FunctionAction'
import SQLHelper from '../../common/SQLHelper';
import LinearGradient from 'react-native-linear-gradient';
export const iconcommunityFocus = require('../../assets/image/premium.png');
import CustomModal from '../../components/CustomModal/CustomModal';
import Profile from './Profile';
import Toast from 'react-native-toast-message';
import { LogoutRequest } from '../../redux/action/UserAction'
import { getInforUser } from '../../api/user';
import { STATUS_BAR_HEIGHT } from '../../constants';
import { RootState } from '../../redux/reducers'
import ApplovinService from './../../Applovin/Applovin';
import {InAppReviewFn} from './../../common/InAppReview';


import { stores,cache } from '../../../App'
const Setting: FunctionComponent = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode  } = state.FunctionReduce;
    const [isEnabled, setIsEnabled] = React.useState<boolean>(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isToggleBackground, setToggleBackground] = React.useState<boolean>(isDarkMode);
    const toggleSwitchDark = (previousState: boolean) => {
        dispatch(dispatchDarkMode(previousState))
        setToggleBackground(previousState => !previousState)
    };
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color______ = changeBackground___(isDarkMode)
    const color___ = changeBackground_____(isDarkMode)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [types, setType] = React.useState(3);
    const { UserReduce } = state
    const [inforUser, setInforUser] = React.useState<any>(null)
    const [avatar, setavatar] = React.useState<string>('')
    const [loading, setloading] = React.useState<boolean>(true);
    const [isPremium, setIsPremium] = React.useState<boolean>(false);
    useFocusEffect(React.useCallback(()=>{
        InAppReviewFn();
    },[]))
    useFocusEffect(React.useCallback(()=>{
        setIsPremium(stores.getState().FunctionReduce.isPremium);
    },[]))
    useFocusEffect(React.useCallback(()=>{
        console.log('token',UserReduce?.user?.token);
        console.log('state',state.FunctionReduce);
        console.log(stores.getState().FunctionReduce.isPremium)
        if (UserReduce?.user && UserReduce?.user?.token) {
            if (Object.keys(UserReduce.user).length != 0) {
                getInforUser(UserReduce.user.token).then((result) => {
                    if (result.data.status === "success") {
                        setavatar(result.data.data.avatar)
                        setInforUser({
                            data: result.data.data,
                            token: UserReduce.user.token
                        })
                        setloading(false)
                        return
                    }
                })
            }
        } else {
            setInforUser(null)
            setloading(false)
        }
    },[UserReduce.user]))
    const _OnShareApp = async () => {
        try {
            const result = await Share.share({
                message: "Dowload and Reading Manga on https://play.google.com/store/apps/details?id=" + getBundleId()
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error)
        }
    }

 

    const _OnClickSupport = () => {
        Linking.openURL('mailto:hoduykhoa2k@gmail.com')
    }
    const _OnPrivacyClick = () => {
        navigation.navigate(screen.PRIVACY_SCREEN)
    }
    const _OnReviewApp = () => {
        Linking.openURL("market://details?id=" + getBundleId())
    }
    const color____ = isToggleBackground ? '#fff' : '#EE3340'
    const color_____ = isToggleBackground ? '#1e1e23' : '#F2F2F2'
    const onHandlerCleanCache = () => {
        setType(3)
        setModalVisible(true)
    }

    const onHandlerCleanCacheAcpect =async () => {
        await cache.clearAll()
        SQLHelper.deletehistoryMangaChapter().then((e) => {
            if (e) return Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Alert',
                text2: 'Delete Success 👋',
                visibilityTime: 200,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
                onShow: () => { },
                onHide: () => { },
                onPress: () => { }
            });;
            return Toast.show({
                type: 'error ',
                position: 'top',
                text1: 'Alert',
                text2: 'Delete Fail 👋',
                visibilityTime: 200,
                autoHide: true,
                topOffset: 100,
                bottomOffset: 40,
                onShow: () => { },
                onHide: () => { },
                onPress: () => { }
            });;
        })
    }
    const onHandlerLogout = () => {
        setType(5)
        setModalVisible(true)
    }
    const dispatchLogout = () => {
        dispatch(LogoutRequest())
    }
    const onDeleteAccount= ()=>{
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Delete Account Success👋',
            text2: 'The process may take a few minutes 👋',
            visibilityTime: 400,
            autoHide: true,
            topOffset: 100,
            bottomOffset: 40,
            onShow: () => { },
            onHide: () => { },
            onPress: () => { }
        });;
    }
    return (
        <View style={[styles.container, { backgroundColor: color_ }]}>
            {
                modalVisible ? <CustomModal {...{ dispatchLogout, onHandlerCleanCacheAcpect, modalVisible, setModalVisible }} title="Notification" type={types}> {types === 3 ? 'You sure want to delete' : 'You sure want logout'} </CustomModal> : null
            }
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor={color______}
            />
            <Header {...{ color_, color___ }}></Header>
            <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 9999 }} />

            <ScrollView
                style={{ flex: 1, backgroundColor: color_____ }}
                showsVerticalScrollIndicator={false}
            >

                <Profile {...{loading,  setavatar, inforUser, avatar, color___: color, isToggleBackground, color_ }}></Profile>
                { isPremium ? null : (
                <TouchableOpacity
                    onPress={() => {
                        ApplovinService.showAdsFull(screen.PERMIUM_SCREEN,null,null);
                    }}
                    activeOpacity={0.8}
                    style={styles.containerTxtPermium}>
                    <LinearGradient
                        colors={['#9F015F', '#F9c929']}
                        useAngle={true}
                        angle={145}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        style={{ borderRadius: 10 }}
                    >
                        <View
                            style={styles.contaiWrapper}>
                            <Image source={iconcommunityFocus} style={styles.imgIcon}></Image>
                            <Text style={[styles.txtNotifi, { color: '#fff', fontSize: 20, fontFamily: 'Nunito-Bold' ,marginLeft:5}]}>Buy Premium</Text>

                        </View>
                    </LinearGradient>
                </TouchableOpacity> )}
                <View style={[styles.conatiner_, { backgroundColor: color_, borderWidth: isToggleBackground ? 1 : 0, borderColor: isToggleBackground ? '#fff' : '' }]}>
                    <View style={[styles.notifi, {
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <FontAwesome
                                color={color____}
                                style={styles.tiny}
                                name="bell-o" size={30} />
                            <Text style={[styles.txtNotifi, { color: color }]}>Notification</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: color }}
                            thumbColor={isEnabled ? "#EE3340" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                    <View style={[styles.notifi, {
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <MaterialCommunityIcons
                                color={color____}
                                style={styles.tiny}
                                name="theme-light-dark" size={30} />
                            <Text style={[styles.txtNotifi, { color: color }]}>Dark Theme</Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#767577", true: color }}
                            thumbColor={isToggleBackground ? "#EE3340" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchDark}
                            value={isToggleBackground}
                        />
                    </View>
                    <View style={{
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.notifi} onPress={_OnPrivacyClick}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Entypo
                                    style={styles.tiny}
                                    color={color____}
                                    name="shield" size={30} />
                                <Text style={[styles.txtNotifi, { color: color }]}>Privacy Policy</Text>
                            </View>
                            <Image
                                resizeMode="contain"
                                style={styles.tiny}
                                source={iconleft}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.notifi} onPress={_OnReviewApp}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',

                            }}>
                                <MaterialCommunityIcons
                                    color={color____}
                                    style={styles.tiny}
                                    name="star-circle" size={30} />
                                <Text style={[styles.txtNotifi, { color: color }]}>App reviews</Text>
                            </View>
                            <Image
                                resizeMode="contain"
                                style={styles.tiny}
                                source={iconleft}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.notifi} onPress={_OnShareApp} >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <FontAwesome
                                    color={color____}
                                    style={styles.tiny}
                                    name="share-alt" size={30} />
                                <Text style={[styles.txtNotifi, { color: color }]}>Share</Text>
                            </View>
                            <Image
                                resizeMode="contain"
                                style={styles.tiny}
                                source={iconleft}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.notifi} onPress={_OnClickSupport}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <FontAwesome
                                    style={styles.tiny}
                                    color={color____}
                                    name="support" size={30} />
                                <Text style={[styles.txtNotifi, { color: color }]}>Support</Text>
                            </View>
                            <Image
                                resizeMode="contain"
                                style={styles.tiny}
                                source={iconleft}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.notifi, {
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            {/* <Image
                        resizeMode="contain"
                        style={styles.tiny}
                        source={iconversion}></Image> */}
                            <Octicons
                                style={styles.tiny}
                                color={color____}
                                name="versions" size={30} />
                            <Text style={[styles.txtNotifi, { color: color }]}>Version</Text>
                        </View>
                        <Text style={[styles.txtNotifi, { color: color }]}>{getVersion()}</Text>
                    </View>
                    <View style={[{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }, inforUser && {
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }]}>
                        <TouchableOpacity style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                            activeOpacity={0.7}
                            onPress={() => onDeleteAccount()}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <Octicons
                                    style={styles.tiny}
                                    color={color____}
                                    name="lock" size={30} />
                                <Text style={[styles.txtNotifi, { color: color }]}>Delete account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }, inforUser && {
                        borderColor: '#d6d6d6',
                        borderBottomWidth: 1,
                    }]}>
                        <TouchableOpacity style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                            activeOpacity={0.7}
                            onPress={() => onHandlerCleanCache()}
                        >
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <Octicons
                                    style={styles.tiny}
                                    color={color____}
                                    name="archive" size={30} />
                                <Text style={[styles.txtNotifi, { color: color }]}>Clean read history</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        inforUser ? (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableOpacity style={{
                                    width: '100%',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                }}
                                    activeOpacity={0.7}
                                    onPress={() => onHandlerLogout()}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                        <MaterialCommunityIcons
                                            style={styles.tiny}
                                            color={color____}
                                            name="logout" size={30} />
                                        <Text style={[styles.txtNotifi, { color: color }]}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }

                </View>
            </ScrollView>
        </View>
    )
}
export default React.memo(Setting, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    notifi: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,


    },
    txtNotifi: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
        fontSize: 16,

    },
    tiny: {
        width: 35,
        height: 35
    },
    conatiner_: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: 10,
        marginBottom: STATUS_BAR_HEIGHT + 60,

    },
    contaiWrapper: {
        alignItems: 'center',
        paddingTop: 5,
        marginRight: 2,
        borderRadius: 200,
        flexDirection: 'row',
        marginVertical: 10
    },
    imgIcon: {
        width: 60,
        height: 60,
        marginHorizontal: 20
    },
    containerTxtPermium: {
        marginHorizontal: 10,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: 10,
        marginBottom: 10,

    }
})
import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as screen from './../../constants/ScreenTypes';
export const img = require('./../../assets/image/man.png')
import { getDay } from '../../constants/Validate';
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image'
import { PostUpdateInforUser } from '../../api/user';
import { UploadFile } from './../../api/upload';
import AdmodService from './../../firebase/Admod';
import Loading from '../../components/Loading';
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function Profile({ loading, setavatar, avatar, inforUser, isToggleBackground, color_, color___ }) {
    const navigation = useNavigation();
    const color__ = isToggleBackground ? '#fff' : '#EE3340'
    const color = isToggleBackground ? '#000' : '#fff'
    console.log('inforUser',inforUser);
    const changleAvatar = () => {
        if (inforUser) {

            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                UploadFile(image.path, image.mime).then(result => {
                    if (result.data.status === "success") {
                        setavatar(result.data.data)
                        ToastAndroid.show('Update Success 👌🏼', ToastAndroid.SHORT)
                        PostUpdateInforUser(result.data.data, inforUser.token).then((e) => {
                            if (e.data.status = "success") {
                                return

                            }
                        })
                    }
                }).catch(error => {
                    console.log("error");
                });
            })
                .catch((e) => {
                    console.log(e)
                    // ToastAndroid.show('Update Fail', ToastAndroid.SHORT)
                })

        }
    }
 
    const onHandlerLogin = () => {
        AdmodService.showAdsFull(screen.LOGIN_SCREEN,null,null);
    }

    const onHandlerSignUp = () => {
        AdmodService.showAdsFull(screen.SIGN_UP_SCREEN,null,null);
    }

    return (
        <View style={[styles.container, { backgroundColor: color_, borderWidth: isToggleBackground ? 1 : 0, borderColor: isToggleBackground ? '#fff' : '' }]}>

            {
                loading ? (
                    <Loading></Loading>
                ) : (
                    inforUser ? <View style={styles.containerUser}>
                        <TouchableOpacity
                            onPress={() => changleAvatar()}
                            activeOpacity={0.7}
                            style={styles.Containavata}>
                            <FastImage
                                style={styles.avata}
                                resizeMode={FastImage.resizeMode.cover}
                                source={{
                                    uri: avatar,
                                    priority: FastImage.priority.normal
                                }}></FastImage>
                            <AntDesign name="camera" size={20} style={styles.containerIcon}></AntDesign>
                        </TouchableOpacity>
                        <View>
                            <Text style={[styles.txtUser, { color: color___, fontSize: 16, fontFamily: 'Averta-Bold' }]}>❤️ {inforUser?.data?.name} </Text>
                            <Text style={[styles.txtUser, { color: color___, marginTop: 0, fontSize: 16,fontFamily: 'Averta-Bold', }]}>♛<Text style={{ fontSize: 12 }}> Member</Text></Text>
                            <Text style={[styles.dateUser, { color: color___, fontFamily: 'Averta-Bold', }]}>🍀 <Text style={{ fontSize: 12 }}>{getDay()}</Text></Text>
                        </View>
                    </View> : (
                        <View style={styles.containerNoUser}>
                            <Image
                                resizeMode="contain"
                                style={styles.tiny}
                                source={img}></Image>
                            <View style={styles.containerBtn}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        onHandlerLogin()
                                    }}
                                    style={[styles.btn, { backgroundColor: color__ }]}>
                                    <Text style={[styles.txt, { color: color }]}>Sign In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        onHandlerSignUp()
                                    }}
                                    activeOpacity={0.7}
                                    style={[styles.btn, { backgroundColor: color__ }]}>
                                    <Text style={[styles.txt, { color: color }]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Text style={[styles.date, { color: color___ }]}>🍀 {getDay()}</Text>
                            </View>
                        </View>
                    )
                )
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    tiny: {
        width: 100,
        height: 100,

    },
    btn: {
        backgroundColor: 'red',
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    txt: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Nunito-Bold',
    },
    containerUser: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20
    },
    txtUser: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Montserrat-Light',
        marginVertical: 5,
        marginHorizontal: 10
    },
    Containavata: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avata: {
        width: 68,
        height: 68,
        borderRadius: 100
    },
    containerNoUser: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        marginTop: 15,
        fontSize: 15,
        color: '#000',
        fontFamily: 'Montserrat-Light',
        marginHorizontal: 10
    },
    dateUser: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Montserrat-Light',
        marginHorizontal: 10
    },
    containerIcon:{
            position:'absolute',
            bottom:0,
            right:10            
    }
})
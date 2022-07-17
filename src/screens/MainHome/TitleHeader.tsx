import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import isEqual from 'react-fast-compare';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/ScreenTypes';
import AdmodService from './../../firebase/Admod';
import { getInforUser } from '../../api/user';
import { stores } from '../../../App'
export const imageNoUser = require('./../../assets/image/header-default.png')
export const imageBell = require('./../../assets/image/menu.png')
export const imagePremium = require('../../assets/image/a_g.png');
type TitleHeaderProps = {
    color____: string
}
const TitleHeader: FunctionComponent<TitleHeaderProps> = ({ color____ }) => {
    const state = useSelector((state): any => state)
    const navigation = useNavigation();
    const { UserReduce } = state
    const [avatar, setAvatar] = React.useState<string | null>(null)
    const [premium, setPremium] = React.useState(false)
    useFocusEffect(
        React.useCallback(() => {
            console.log(stores.getState().FunctionReduce.isPremium)
            if (stores.getState().FunctionReduce.isPremium) setPremium(true)
        }, [])
    )
    useFocusEffect(
        React.useCallback(() => {
            if (UserReduce?.user?.token) {
                if (Object.keys(UserReduce?.user).length != 0) {
                    getInforUser(UserReduce?.user?.token).then((result) => {
                        if (result.data.status === "success") {
                            setAvatar(result.data.data.avatar)
                        }
                    })
                }
            } else {
                setAvatar(null)
            }
        }, [UserReduce.user.avatar, avatar])

    )
    function onHandlerGotoSetting() {
        navigation.navigate(SCREEN.SETTING_SCREEN)
        AdmodService.showAdsFull(SCREEN.SETTING_SCREEN,null,null);
    }
    function onHandlerGotoLogin() {
        AdmodService.showAdsFull(SCREEN.LOGIN_SCREEN,null,null);
    }
    
    const showIconUser = () => {
        return (
            <View>
                {
                    premium ? (
                        <Image
                            source={imagePremium}
                            style={styles.img}
                        />
                    ) : avatar ? (
                        <Image
                            resizeMode='cover'
                            style={styles.avatar}
                            source={{ uri: avatar }} />
                    ) :
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onHandlerGotoLogin}
                        >
                            <Image
                                resizeMode="contain"
                                style={styles.tiny}
                                source={imageNoUser} />
                        </TouchableOpacity>
                }
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onHandlerGotoSetting}
            >
                <Image
                    resizeMode="contain"
                    style={styles.tinyBell}
                    source={imageBell}></Image>
            </TouchableOpacity>
            <Text style={[styles.txt, { color: color____ }]}>Manga Reader</Text>
            {showIconUser()}
        </View>
    );
}
export default React.memo(TitleHeader, isEqual)
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    txt: {
        color: '#1fcf84',
        fontSize: 18,
        fontFamily: 'Averta-Bold',

    },
    tiny: {
        width: 45,
        height: 45,
        borderRadius: 1000
    },
    tinyBell: {
        width: 35,
        height: 35,
        borderRadius: 1000
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 1000
    },
    img: {
        width: 50, height: 20,
        borderRadius: 10
    }
})
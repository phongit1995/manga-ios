import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SqlHelper from '../../common/SQLHelper';
import * as SCREEN from '../../constants/ScreenTypes'
export const iconLove = require('../../assets/image/lf30_editor_ilhncfag.json');
import isEqual from 'react-fast-compare';
import { ItemComicProps } from '../../constants/mangaItem.type'
import {paddingBottom, SCREEN_WIDTH, SCREEN_WIDTH_No} from '../../constants'
const iconRead = require('../../assets/image/fairy-tale.png')
const iconFollow = require('../../assets/image/heart.png')
const iconunFollow = require('../../assets/image/love.png')
export const iconBackTop = require('../../assets/image/top.png')
import { DetailChapProps } from './DetailComic'
import FastImage from 'react-native-fast-image';
export type ActionComicProps = {
    item: ItemComicProps,
    isFollow: boolean,
    setIsFollow: React.Dispatch<React.SetStateAction<boolean>>,
    setisactive: React.Dispatch<React.SetStateAction<boolean>>,
    listChapRead: any,
    data: DetailChapProps,
    id: string,
    dataTotleChap: number,
    nameChapRead: string,
}
const ActionComic: FunctionComponent<any> = ({ item, isFollow, setIsFollow, setisactive, listChapRead, data, id, dataTotleChap, nameChapRead }) => {
    const navigation = useNavigation();
    const showFollow = (): any => (
        isFollow ? (
            <FastImage
                resizeMode='cover'
                style={styles.iconRead}
                source={iconFollow}></FastImage>
        ) : (
            <FastImage
                resizeMode='cover'
                style={styles.iconRead}
                source={iconunFollow}></FastImage>
        )
    )
    const _OnUnFollowComic = async () => {
        SqlHelper.unFollowManga(item._id);
        setIsFollow(false)
    }

    const _OnFollowComic = async () => {
        SqlHelper.addFollowManga(item,item?.name);
        setIsFollow(true)
        setisactive(true)
    }

    const _onHandlerFollow = () => {
        if (isFollow) _OnUnFollowComic()
        else _OnFollowComic()
    }


    const onHandlerRead = () => {
        if (listChapRead[0]) navigation.navigate(SCREEN.DETIAL_CHAPTER, { id: listChapRead[0].chapter_id, idChap: listChapRead[0].manga_id, dataTotleChap, indexChap: listChapRead[0].number, page: listChapRead[0].number })
        navigation.navigate(SCREEN.DETIAL_CHAPTER, { id: data?.data[0]?._id, idChap: id, dataTotleChap, indexChap: 1, page: 1 })
    }

    return (
        <View style={{ justifyContent: 'center', width: SCREEN_WIDTH_No, alignItems: 'center', backgroundColor: '#36302D', }}>
            <View style={styles.containerBtn}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={_onHandlerFollow}
                    style={[styles.btn, { borderRightWidth: 1, borderRightColor: '#fff' }]}>
                    {showFollow()}
                    <Text style={[styles.txt, { color: '#fff', paddingLeft: 5 }]}>FOLLOW</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onHandlerRead()}
                    activeOpacity={0.7}
                    style={[styles.btn, {}]}>
                    <FastImage
                        resizeMode='cover'
                        style={styles.iconRead}
                        source={iconRead}></FastImage>
                    <Text numberOfLines={2} style={[styles.txt, { color: '#fff', marginLeft: 3 }]}>{nameChapRead}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default React.memo(ActionComic, isEqual);

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    love: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999888,
        elevation: 100
    },
    tinyicon: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH
    },
    total: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 15,
        backgroundColor: '#272536',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        paddingBottom: paddingBottom,
    },
    btn: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH_No / 2,
        paddingVertical: 5,
        paddingHorizontal: 20

    },
    txtTitle: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Averta',
    },
    txt: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'Averta-Bold',
        marginLeft: 5
    },
    containerTop: {
        position: 'absolute',
        zIndex: 999999,
        elevation: 9999,
        right: '5%',
        width: 35,
        height: 35,
    },
    icon: {
        width: 35,
        height: 35,
    },
    iconRead: {
        width: 30,
        height: 30,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

})



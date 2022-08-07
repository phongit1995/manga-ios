import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import isEqual from 'react-fast-compare';
import * as SCREEN from '../../../constants/ScreenTypes';
import { SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../../constants'
import { ItemComicProps } from '../../../constants/mangaItem.type'
export const iconhot = require('../../../assets/image/h.png');
export const iconNews = require('../../../assets/image/aav3.png');
import ApplovinService from './../../../Applovin/Applovin';

import { useFocusEffect } from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
type itemPropss = {
    item: ItemComicProps,
    type?: number,
    index: number,
    color__: string,
    color____: string
}

const Item: FunctionComponent<itemPropss> = ({ item, type, index, color__, color____ }) => {
    const _goToDetialComic = (id: string) => {
        ApplovinService.showAdsFull(SCREEN.DETIAL_COMIC_SCREEN, {
            item: item,
            id: id
        }, null);
    }

    return (
        <View style={[styles.container, { backgroundColor: color__ }]}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => _goToDetialComic(item?._id)} >
                <View style={styles.imageLeft}>
                    <View style={styles.containerImage}>
                        <FastImage source={{
                            uri: item?.image,
                            headers: {
                                Referer: "https://manganelo.com/"
                            }
                        }}
                            resizeMode='cover'
                            style={styles.imageRecommend} />
                    </View>
                    <View style={styles.containerIcon}>
                        <FastImage
                            resizeMode="contain"
                            style={styles.tiny}
                            source={type === 0 ? iconhot : iconNews} />
                    </View>
                    {
                        type === 1 ? (
                            <View style={styles.containerIconNew}>
                                <Text style={styles.txt}>{item?.chapter_update_count}</Text>
                            </View>
                        ) : <View style={styles.containerNumberChap}>
                            <Text style={styles.txtNumberChap}>#{index + 1}</Text>
                        </View>
                    }
                </View>
                <View style={styles.contaiItem}>
                    <Text numberOfLines={1} style={[styles.nameComic, { color: color____ }]}>{item?.name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default React.memo(Item, isEqual)
const styles = StyleSheet.create({
    container: {
        width: ((SCREEN_WIDTH_No / 3.8)),
        height: (SCREEN_WIDTH_No * 0.45),
        marginRight: 10,
    },
    imageRecommend: {
        width: "100%",
        height: "100%",
        borderRadius: 6,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    imageLeft: {
        height: '80%',
        position: 'relative'
    },
    contaiItem: {
        height: '20%',
        marginTop: 5,

    },
    nameComic: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
        paddingBottom: 5
    },
    tiny: {
        width: 20,
        height: 20
    },
    containerIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        elevation: 10,
    },
    containerIconNew: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
        elevation: 10,
        backgroundColor: '#E04F5F',
        paddingHorizontal: 10,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    containerNumberChap: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
        backgroundColor: '#E04F5F',
        paddingHorizontal: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,

    },
    txtNumberChap: {
        color: '#fff',
        fontFamily: 'Montserrat-Light',
        fontSize: 12
    },
    txt: { color: '#fff' }
})
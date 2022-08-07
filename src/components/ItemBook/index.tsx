import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { formatViews } from '../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/ScreenTypes';
import { SCREEN_WIDTH_No } from '../../constants'
export const icontop1 = require('../../assets/image/a4d.png');
export const icontop2 = require('../../assets/image/a4g.png');
export const icontop3 = require('../../assets/image/a4h.png');
export const iconView = require('../../assets/image/a96.png');
import Ionicons from 'react-native-vector-icons/Ionicons'
import ApplovinService from './../../Applovin/Applovin';
import FastImage from 'react-native-fast-image';
export const iconViews = require('./../../assets/image/eye.png');
const ItemComic = ({ index, deleteComic, item,name}: any) => {
    const navigation = useNavigation();
    const goToDetialComic = (id: String) => {
        ApplovinService.showAdsFull(SCREEN.DETIAL_COMIC_SCREEN, { id: id, item: item },null);
    }

    return (
        <View style={[styles.container, index % 2 === 0 && { marginRight: 5, marginLeft: 2 },
        index % 2 != 0 && { marginLeft: 5, marginTop: 30, marginRight: 2 }]}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.contaiItem} onPress={() => {
                    goToDetialComic(item._id)
              
                }} >
                <View style={{
                    height: '70%',
                }}>
                    <FastImage
                        resizeMode='cover'
                        source={{
                            uri: item?.image, headers: {
                                Referer: "https://manganelo.com/"
                            }
                        }} style={styles.imageRecommend}></FastImage>
                </View>
                <View style={{ height: '30%', paddingVertical: 10, paddingHorizontal: 10, justifyContent: 'space-around' }}>
                    <Text numberOfLines={1} style={[styles.nameComic, { color: '#5c6b73' }]}>{name}</Text>
                    <View style={styles.containerDelete}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FastImage
                                source={iconViews}
                                style={{ width: 20, height: 20 }}
                                resizeMode='contain'
                            >
                            </FastImage>
                            <Text style={[styles.nameChap, { color: '#5c6b73' }]}> {formatViews(item?.views)}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => deleteComic(item._id)}
                            activeOpacity={0.7}
                            style={{
                                backgroundColor: '#d34150',
                                paddingVertical: 5,
                                paddingHorizontal: 7,
                                borderRadius: 10,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 2,
                            }}
                        >
                            <Ionicons name="trash-outline" size={15} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}
export default React.memo(ItemComic)
const styles = StyleSheet.create({
    container: {
        width: (SCREEN_WIDTH_No / 2) - 15,
        height: Math.round(SCREEN_WIDTH_No * 0.5),
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        borderRadius: 10,

    },
    contaiItem: {
        // paddingHorizontal: 20,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    imageRecommend: {
        width: "100%",
        height: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    nameComic: {
        paddingVertical: 0,
        fontSize: 13,
        fontFamily: 'Nunito-Bold',

    },
    nameChap: {
        fontSize: 10,
        fontFamily: 'Nunito-Bold',
        color: '#5c6b73'
    },
    tinyiconLeft: {
        width: 45,
        height: 45,
    },
    category: {
        color: '#000',
        fontFamily: 'Montserrat-Light',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',
        color: '#5c6b73',
        backgroundColor: '#f1f4eb',
        paddingVertical: 5,
        fontSize: 11,
        paddingHorizontal: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    tinyLogo: {
        width: 16,
        height: 20,
    },
    AuthorComic: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73',
        marginLeft: 5
    },
    containerDelete: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    }
})
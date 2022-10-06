import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { formatViews } from '../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/ScreenTypes';
import { SCREEN_WIDTH_No } from '../../constants'
export const icontop1 = require('../../assets/image/a4d.png');
export const icontop2 = require('../../assets/image/a4g.png');
export const icontop3 = require('../../assets/image/a4h.png');
export const iconViews = require('./../../assets/image/eye.png');
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ApplovinService from './../../Applovin/Applovin';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image';
const ItemDownload = ({ isDark, deleteComic, item, color, color__ }: any) => {
    const _item = JSON.parse(item.itemManga)
    const navigation = useNavigation<any>();
    const goToDetialComic = () => {
        navigation.navigate(SCREEN.DOWNLOAD_CHAP_SCREEN, { idManga: item.idManga, nameChap: _item.name, numberChap: item.numberChap },null)

        // ApplovinService.showAdsFull(SCREEN.DOWNLOAD_CHAP_SCREEN, { idManga: item.idManga, nameChap: _item.name, numberChap: item.numberChap },null)
    }

    const showCategory = React.useCallback(() => {
        if (_item) {
            return _item?.category?.slice(0, 2).map((item, index) => {
                return (
                    <Text key={index} style={styles.normal}>{item}</Text>
                )
            })
        }
        return null
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.contaiItem} onPress={() => {
                    goToDetialComic()
          
                }
                }

            >
                <View style={{
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FastImage
                        resizeMode='cover'
                        source={{
                            uri: _item?.image, headers: {
                                Referer: "https://manganelo.com/"
                            }
                        }} style={styles.imageRecommend}></FastImage>
                </View>
                <View style={{ width: '70%', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center' }}>
                    <Text numberOfLines={1} style={[styles.nameComic, { color: color }]}>{_item?.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                        <FontAwesome name="user" size={20} color={color__} />
                        <Text numberOfLines={1} style={[styles.AuthorComic, { color: color__ }]}>{_item?.author?.split(/\s/)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>

                        <FastImage
                            source={iconViews}
                            style={{ width: 20, height: 20 }}
                            resizeMode='contain'
                        >
                        </FastImage>
                        <Text style={[styles.nameChap, { color: color__ }]}> {formatViews(_item?.views)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: 5 }}>
                            {showCategory()}
                            {
                                _item?.category.length > 3 ?
                                    <Text style={styles.normal}>...</Text> : null
                            }
                        </View>

                    </View>
                </View>

            </TouchableOpacity>
            {/* <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => deleteComic(_item._id)}
                >
                    <Ionicons name="trash-outline" size={20} color={color} />

                </TouchableOpacity>
            </View> */}
            <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => deleteComic(_item._id)}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: isDark ? '#fff' : '#d34150',
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
                    <Ionicons name="trash-outline" size={20} color={isDark ? '#000' : '#fff'} />

                </TouchableOpacity>
            </View>
        </View>
    )
}
export default React.memo(ItemDownload)
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
        width: SCREEN_WIDTH_No
    },
    contaiItem: {
        flexDirection: 'row',
        width: '90%'
    },
    imageRecommend: {
        width: "100%",
        height: Math.round(SCREEN_WIDTH_No * 0.35),
    },
    nameComic: {
        paddingVertical: 0,
        fontSize: 13,
        fontFamily: 'Montserrat-Light',
    },
    nameChap: {
        fontSize: 10,
        fontFamily: 'Montserrat-Light',
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
})
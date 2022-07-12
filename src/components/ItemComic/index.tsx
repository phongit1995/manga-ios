import React from 'react';
import { Text, View,  StyleSheet, } from 'react-native';
import { formatViews } from '../../common/stringHelper';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/ScreenTypes';
import { RectButton } from 'react-native-gesture-handler';
import { SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
export const icontop1 = require('../../assets/image/a4d.png');
export const icontop2 = require('../../assets/image/a4g.png');
export const icontop3 = require('../../assets/image/a4h.png');
export const iconView = require('../../assets/image/a96.png');
export const iconViews = require('./../../assets/image/eye.png');
import AdmodService from './../../firebase/Admod';
import FastImage from 'react-native-fast-image';
const ItemComic = ({ item, index, type, color_, color, color__ }) => {

    const navigation = useNavigation();
    const goToDetialComic = (id: String) => {
        AdmodService.showAdsFull(SCREEN.DETIAL_COMIC_SCREEN, { id: id, item: item },null);
    }

    const showCategory = React.useCallback(() => {
        if (item) {
            return item?.category?.slice(0, 3).map((item, index: string | number | null | undefined) => {
                return (
                    <Text key={index} style={styles.normal}>{item}</Text>
                )
            })
        }
        return null
    }, [])

    return (
        <RectButton style={styles.contaiItem} onPress={() => {
            goToDetialComic(item._id)
      
        }

        } >
            <View style={{
                width: '30%',

                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FastImage
                    resizeMode='stretch'
                    source={{
                        uri: item?.image, headers: {
                            Referer: "https://manganelo.com/"
                        }
                    }} style={styles.imageRecommend}></FastImage>

            </View>
            <View style={{ width: parseInt(type) === 0 ? '60%' : '70%', paddingHorizontal: 10, justifyContent: 'center' }}>
                <Text numberOfLines={2} style={[styles.nameComic, { color: color }]}>{item?.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                    {/* <FontAwesome name="user" size={20} color={color__} /> */}
                    <Text numberOfLines={1} style={[styles.AuthorComic, { color: color__ }]}>{item?.author?.split(/\s/)}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                    <FastImage
                        source={iconViews}
                        style={{ width: 20, height: 20 }}
                        resizeMode='contain'
                    >
                    </FastImage>
                    <Text style={[styles.nameChap, { color: color__ }]}> {formatViews(item?.views)}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: 5 }}>
                        {showCategory()}
                        {
                            item.category.length > 4 ?
                                <Text style={styles.normal}>...</Text> : null
                        }
                    </View>

                </View>
            </View>
            {
                parseInt(type) === 0 ? (
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            index === 0 ? (
                                <FastImage
                                    resizeMode="contain"
                                    style={styles.tinyiconLeft}
                                    source={icontop1}></FastImage>
                            ) : index === 1 ? (
                                <FastImage
                                    resizeMode="contain"
                                    style={styles.tinyiconLeft}
                                    source={icontop2}></FastImage>
                            ) : index === 2 ? (
                                <FastImage
                                    resizeMode="contain"
                                    style={styles.tinyiconLeft}
                                    source={icontop3}></FastImage>

                            ) : null
                        }
                    </View>
                ) : null
            }
        </RectButton>
    )
}
export default React.memo(ItemComic)
const styles = StyleSheet.create({
    contaiItem: {
        // height: Math.round(SCREEN_WIDTH_No * 0.35),

        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    imageRecommend: {
        width: "100%",
        height: Math.round(SCREEN_WIDTH_No * 0.35),
    },
    nameComic: {
        paddingVertical: 0,
        fontSize: 15,
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
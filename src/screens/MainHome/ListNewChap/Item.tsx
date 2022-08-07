import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes';
import isEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../../constants'
import { formatViews } from '../../../common/stringHelper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export const iconViews = require('../../../assets/image/eye.png');
export const iconView = require('../../../assets/image/a96.png');
export const iconNews = require('../../../assets/image/aav3.png');
import ApplovinService from './../../../Applovin/Applovin';
import { ItemComicProps } from '../../../constants/mangaItem.type'
import FastImage from 'react-native-fast-image';

type ItemNewProps = {
    item: ItemComicProps[] | any,
    color__: string,
    color____: string
}
const Item: FunctionComponent<ItemNewProps> = ({ color__, color____, item }) => {
    const navigation = useNavigation();
    const _goToDetialComic = (id: string) => {
        ApplovinService.showAdsFull(SCREEN.DETIAL_COMIC_SCREEN, {
            item: item,
            id: id
        },null);
        // navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN, {
        //     item: item,
        //     id: id
        // })
        
    }
    const showCategory = React.useCallback((e) => {
        return e.category.slice(0, 2).map((item, index) => {
            return (
                <Text key={index} style={styles.normal}>{item}</Text>
            )
        })
    }, [])
    const showItem = () => {
        return (
            <View>
                {
                    item.map((item: ItemComicProps) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                key={item?._id}
                                style={styles.container}
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
                                            style={styles.imageRecommend}></FastImage>
                                    </View>
                                    <View style={styles.containerIcon}>
                                        <FastImage
                                            resizeMode="contain"
                                            style={styles.tiny}
                                            source={iconNews}></FastImage>
                                    </View>
                                    <View style={styles.containerNumberUpdate}>
                                        <Text style={styles.txtNumberUpdate}>{item?.chapter_update_count}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '65%', paddingLeft: 10, paddingVertical: 5, justifyContent: 'center' }}>
                                    <Text numberOfLines={1} style={[styles.nameComic, { color: color____ }]}>{item?.name}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5, }}>
                                        <FontAwesome name="user" size={20} color={color____} />
                                        <Text numberOfLines={1} style={[styles.AuthorComic, { color: color____ }]}>{item?.author?.split(/\s/)}</Text>
                                    </View>
                                    <View style={styles.containerViews}>
                                        <FastImage
                                            source={iconViews}
                                            style={styles.imgViews}
                                            resizeMode='contain'
                                        >
                                        </FastImage>
                                        <Text style={[styles.nameChap, { color: color____ }]}> {formatViews(item?.views)}</Text>
                                    </View>
                                    <View style={styles.containerCategory}>
                                        <View style={styles.styleListCategory}>
                                            {showCategory(item)}
                                            {
                                                item?.category?.length > 2 ?
                                                    <Text style={styles.normal}>...</Text> : null
                                            }
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: color__ }}>
            {showItem()}
        </View>
    )
}
export default React.memo(Item, isEqual)
const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH_No - 100,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginBottom: 10,

    },
    imageRecommend: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
    },
    containerImage: {
        width: "100%",
        height: '100%',
        borderRadius: 5,
    },
    imageLeft: {
        width: ((SCREEN_WIDTH / 3.8)),
        height: (SCREEN_WIDTH * 0.35),
        position: 'relative',
    },

    nameComic: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
    },
    tiny: {
        width: 30,
        height: 30
    },
    category: {
        color: '#000',
        fontWeight: 'bold',
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
    nameChap: {
        fontSize: 10,
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73'
    },
    tinyiconLeft: {
        width: 45,
        height: 45,
    },
    AuthorComic: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73',
        marginLeft: 5
    },
    containerNumberUpdate: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999,
        elevation: 2,
        backgroundColor: '#E04F5F',
        paddingHorizontal: 10,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    txtNumberUpdate: { color: '#fff', fontSize: 12 },
    containerIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        elevation: 2,
    },
    imgViews: {
        width: 20, height: 20
    },
    containerViews: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center'
    },
    containerCategory: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    styleListCategory:{ flexWrap: 'wrap', flexDirection: 'row', paddingTop: 5 }
})
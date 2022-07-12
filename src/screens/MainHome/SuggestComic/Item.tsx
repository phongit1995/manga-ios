import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import isEqual from 'react-fast-compare';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes';
import { SCREEN_WIDTH } from '../../../constants'
import { ItemComicProps } from '../../../constants/mangaItem.type';
import AdmodService from '../../../firebase/Admod';
import FastImage from 'react-native-fast-image';
type ItemSuggestProps = {
    item: ItemComicProps,
    color____: string,
}
const Item: FunctionComponent<ItemSuggestProps> = ({ color____, item }) => {
    const navigation = useNavigation();
    const _goToDetialComic = (id: string) => {
        AdmodService.showAdsFull(SCREEN.DETIAL_COMIC_SCREEN, {
            id: id
        }, null);
    }
    return (
        <View style={styles.container}>
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
                            style={styles.imageRecommend}></FastImage>
                    </View>
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
        width: ((SCREEN_WIDTH / 3.8)),
        height: (SCREEN_WIDTH * 0.45),
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
        width: 30,
        height: 30
    }
})
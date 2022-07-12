import React, { useState, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { Dimensions, ActivityIndicator, Animated, FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { Image as ImageRN } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT } from '../../constants';
import FastImage from 'react-native-fast-image'
import LoadingImage from '../../components/LoadingImage';
import RNFetchBlob from 'rn-fetch-blob'
const { config, fs } = RNFetchBlob;
import { PermissonRequiredDowload } from '../../common/PermissionRequired';
let PictureDir = fs.dirs.PictureDir;
const ImageFullWith = React.memo(({isDarkMode,index, url, _goToNextPage, isTurn, count }: any): any => {
    const [heightImage, setHeightImage] = React.useState<number>(10000);
    const [indicator, Setindicator] = React.useState<boolean>(true);

    if (isTurn === 0) {
        return <TouchableOpacity
            activeOpacity={1}
            onPress={() => _goToNextPage(isTurn === 0 ? count : index)}
        >
            <FastImage
                style={{
                    width: SCREEN_WIDTH_No,
                    height: heightImage
                }}

                source={{
                    uri: `file://${url}`,
                    headers: {
                        Referer: "https://manganelo.com/"
                    },
                    priority: FastImage.priority.high,
                    // cache: FastImage.cacheControl.cacheOnly
                }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadEnd={() => Setindicator(false)}
                onLoad={evt => {
                    setHeightImage(evt.nativeEvent.height / evt.nativeEvent.width * SCREEN_WIDTH_No)
                }}
            >
                {
                    indicator ? <View style={{
                        top: -  (SCREEN_HEIGHT / 12) + 10,
                        height: SCREEN_HEIGHT,
                        width: SCREEN_WIDTH_No,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <LoadingImage></LoadingImage>
                    </View> : null
                }
            </FastImage>
        </TouchableOpacity>
    }
    if (isTurn === 1) {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={[`file://${url}`]}
                scrollEventThrottle={16}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => _goToNextPage(isTurn === 0 ? count : index)}
                            style={{
                                width: SCREEN_WIDTH_No,
                                height: heightImage >= SCREEN_HEIGHT ? heightImage : SCREEN_HEIGHT,
                                justifyContent: 'center',
                                marginTop: heightImage >= SCREEN_HEIGHT && index === 0 ? (SCREEN_HEIGHT / 12) + 12 : STATUS_BAR_HEIGHT,
                                marginBottom: heightImage >= SCREEN_HEIGHT && index === 0 ? (SCREEN_HEIGHT / 15) : 0,
                            }}
                        >
                            <FastImage
                                style={{
                                    width: SCREEN_WIDTH_No,
                                    height: heightImage
                                }}
                                source={{
                                    uri: `file://${item}`,
                                    headers: {
                                        Referer: "https://manganelo.com/"
                                    },
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                                onLoadEnd={() => Setindicator(false)}
                                onLoad={evt => {
                                    setHeightImage(evt.nativeEvent.height / evt.nativeEvent.width * SCREEN_WIDTH_No)
                                }}
                            >
                                {
                                    indicator ? <View style={{
                                        height: SCREEN_HEIGHT,
                                        width: SCREEN_WIDTH_No,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <LoadingImage {...{isDarkMode}}></LoadingImage>
                                    </View> : null
                                }
                            </FastImage>
                        </TouchableOpacity >
                    )
                }}
            >



            </FlatList>

        )
    }

})
export default React.memo(ImageFullWith, isEqual)
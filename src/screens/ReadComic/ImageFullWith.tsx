import React, {useRef} from 'react';
import isEqual from 'react-fast-compare';
import { FlatList, TouchableOpacity, View, Dimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { SCREEN_HEIGHT, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT, } from '../../constants';
import FastImage from 'react-native-fast-image'
import LoadingImage from '../../components/LoadingImage';
import ImageViewer from "./ImagePanZoom";
const ImageFullWith = React.memo(({
    url,
    isTurn,
    scrollY,
    scrollYFooter,
 }: any): any => {
    const [heightImage, setHeightImage] = React.useState<number>(7000);
    const [indicator, Setindicator] = React.useState<boolean>(true);
    const scaleValue = useRef(1);
    if (isTurn === 0) {
        return (
          <ImageViewer
            cropWidth={Dimensions.get('window').width}
            cropHeight={heightImage}
            imageWidth={SCREEN_WIDTH_No}
            imageHeight={heightImage}
            minScale={1}
            onStartShouldSetPanResponder={(e) => {
              return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
            }}
            onMove={({scale}) => {
              scaleValue.current = scale;
            }}
          >
            <FastImage
                style={{
                    width: SCREEN_WIDTH_No,
                    height: heightImage
                }}
                source={{
                    uri: url,
                    headers: {
                        Referer: "https://manganelo.com/"
                    },
                    priority: FastImage.priority.normal,

                }}
                onLoadStart={() => {
                    Setindicator(true)
                }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadEnd={() => {
                    Setindicator(false)
                }}
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
                        <LoadingImage ></LoadingImage>
                    </View> : null
                }
            </FastImage>
          </ImageViewer>

        )
    }

    if (heightImage > 7000) {
        return (
            <FlatList
                data={[url]}
                scrollEventThrottle={16}
                pinchGestureEnabled={false}
                scrollEnabled={true}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                        <View
                            style={{
                                width: SCREEN_WIDTH_No,
                                height: heightImage / 3,
                                justifyContent: 'center'
                            }}
                        >
                          <ImageViewer
                            cropWidth={Dimensions.get('window').width}
                            cropHeight={heightImage / 3}
                            imageWidth={SCREEN_WIDTH_No}
                            imageHeight={heightImage / 3}
                            minScale={1}
                            onStartShouldSetPanResponder={(e) => {
                              return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
                            }}
                            onMove={({scale}) => {
                              scaleValue.current = scale;
                            }}
                          >
                                <FastImage
                                    style={{
                                        width: SCREEN_WIDTH_No,
                                        height: heightImage / 3,

                                    }}
                                    source={{
                                        uri: item,
                                        headers: {
                                            Referer: "https://manganelo.com/"
                                        },
                                        priority: FastImage.priority.normal,
                                    }}

                                    onLoadStart={() => {
                                        Setindicator(true)
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    onLoadEnd={() => {
                                        Setindicator(false)
                                    }}
                                >
                                    {
                                        indicator ? <View style={{
                                            height: SCREEN_HEIGHT,
                                            width: SCREEN_WIDTH_No,
                                            position: 'absolute',
                                            top: 0,

                                        }}>
                                            <LoadingImage></LoadingImage>
                                        </View> : null
                                    }
                                </FastImage>
                          </ImageViewer>
                        </View>
                    )
                }}
            >
            </FlatList>
        )
    }
    return (
        <FlatList
            data={[url]}
            onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y > 0) {
                    scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
                    scrollYFooter.setValue(SCREEN_HEIGHT / 15)
                }
            }}
            scrollEventThrottle={16}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => {
                return (
                  <ImageViewer
                    cropWidth={Dimensions.get('window').width}
                    cropHeight={heightImage >= SCREEN_HEIGHT ? heightImage : SCREEN_HEIGHT}
                    imageWidth={SCREEN_WIDTH_No}
                    imageHeight={heightImage >= SCREEN_HEIGHT ? heightImage : SCREEN_HEIGHT}
                    minScale={1}
                    onStartShouldSetPanResponder={(e) => {
                      return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
                    }}
                    onMove={({scale}) => {
                      scaleValue.current = scale;
                    }}
                  >
                    <View
                        style={{
                            width: SCREEN_WIDTH_No,
                            height: heightImage >= SCREEN_HEIGHT ? heightImage : SCREEN_HEIGHT,
                            justifyContent: 'center'
                        }}
                    >
                        <FastImage
                            style={{
                                width: SCREEN_WIDTH_No,
                                height: heightImage,
                                zIndex: -1
                            }}
                            source={{
                                uri: item,
                                headers: {
                                    Referer: "https://manganelo.com/"
                                },
                                priority: FastImage.priority.normal,
                            }}
                            onLoadStart={() => {
                                Setindicator(true)
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                            onLoadEnd={() => Setindicator(false)}
                            onLoad={evt => {
                                setHeightImage(evt.nativeEvent.height / evt.nativeEvent.width * SCREEN_WIDTH_No)
                            }}
                        >
                        </FastImage>
                        {
                            indicator ? <View style={{
                                height: SCREEN_HEIGHT,
                                width: SCREEN_WIDTH_No,
                                position: 'absolute',
                                top: 0,
                                justifyContent: 'center', alignItems: 'center',
                            }}>
                                <LoadingImage ></LoadingImage>
                            </View> : null
                        }
                    </View>
                  </ImageViewer>

                )
            }}
        >
        </FlatList>
    )

})
export default React.memo(ImageFullWith, isEqual)

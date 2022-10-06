import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");
import ImageFullWith from './ImageFullWith'
import ImageFullWithScare from './../ReadComic/ImageFullWith';
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT, TYPE_READ } from '../../constants';
import { LongPressGestureHandler, ScrollView, State, TapGestureHandler, FlatList } from 'react-native-gesture-handler';

type listImageProps = {
    isTurn: number,
    imagesList: string[],
    scrollY: any,
    scrollYFooter: any,
    headerRef: any,
    footerRef: any
}

const ListImage: FunctionComponent<listImageProps> = ({
    isDarkMode,
    isTurn,
    imagesList,
    scrollY,
    scrollYFooter,
    headerRef,
    footerRef
}: any) => {
    let carousel = React.useRef<any>(null);

    let [count, setCount] = React.useState<number>(1)
    let [countScroll, setCountScroll] = React.useState<number>(1)

    React.useEffect(() => {
        return () => {
            setCount(1)
        }
    }, [isTurn])

    const renderItem = React.useCallback(({ item, index }) => {
        return <ImageFullWithScare {...{ isDarkMode, index, isTurn, url: item, scrollY, scrollYFooter }} />
    }, [isDarkMode, scrollY, scrollYFooter])

    const keyExtractor = React.useCallback((item, index: number) => `${index} ${item}`, [])

    React.useLayoutEffect(() => {
        if (imagesList?.length > 0) {
            headerRef.current?.handleChangePage({
                page: 1,
                totalPage: imagesList?.length != 0 ? JSON.parse(imagesList)?.length : 1,
            })
        }
    }, [imagesList])

    const _onViewableItemsChanged = React.useCallback(({ viewableItems, changed }) => {
        if (viewableItems && changed) {
            let indexView = viewableItems?.length - 1;
            if (viewableItems?.length > 0) {
                headerRef?.current?.handleChangePage({
                    page: viewableItems?.[indexView]?.index + 1,
                    totalPage: imagesList?.length != 0 ? JSON.parse(imagesList)?.length : 1
                })
            }
        }
    }, [imagesList]);

    const _onSingleTapVertical = event => {
        //handle tap action scroll to vetical
        if (event.nativeEvent.state === State.ACTIVE && isTurn === TYPE_READ.VERTICAL) {
            if (event.nativeEvent.y > SCREEN_HEIGHT / 2) {
                const offset = (SCREEN_HEIGHT / 2) * (countScroll != count ? ++countScroll : ++count)
                carousel.current.scrollToOffset({ offset, animated: true });
                if (countScroll != count) {
                    setCount(countScroll)
                }
            } else {
                scrollY.setValue(-Math.round(height / 9.5));
                scrollYFooter.setValue(-Math.round(height / 13))
            }
        }

        //handle tap action scroll to horizontal
        if (event.nativeEvent.state === State.ACTIVE && isTurn === TYPE_READ.HORIZONTAL) {
            if (event.nativeEvent.y < SCREEN_HEIGHT / 2) {
                scrollY.setValue(-Math.round(height / 9.5));
                scrollYFooter.setValue(-Math.round(height / 13))
            } else {
                let getIndex = count > imagesList?.length ? imagesList?.length - 1 : count++
                carousel.current.scrollToIndex({ index: getIndex, animated: true });
            }
        }
    }

    return (
        <View style={[styles.content, { backgroundColor: isDarkMode ? '#111217' : '#FFF' }]}>
            <View style={{ flex: 1 }}>
                <TapGestureHandler
                    onHandlerStateChange={_onSingleTapVertical}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ref={ref => {
                            carousel.current = ref;
                        }}
                        contentContainerStyle={{
                            zIndex: 99999,
                            elevation: 10000,
                            paddingTop: STATUS_BAR_HEIGHT
                        }}
                        data={imagesList.length != 0 ? JSON.parse(imagesList) : []}
                        keyExtractor={keyExtractor}
                        nestedScrollEnabled={true}
                        renderItem={renderItem}
                        horizontal={isTurn === TYPE_READ.HORIZONTAL}
                        pagingEnabled={isTurn === TYPE_READ.HORIZONTAL}
                        decelerationRate={isTurn === 0 ? "normal" : 'fast'}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={1}
                        snapToInterval={isTurn === 0 ? undefined : SCREEN_WIDTH_No}
                        onViewableItemsChanged={_onViewableItemsChanged}
                        onMomentumScrollEnd={(e) => {
                            if (isTurn === 0) {
                                let newIndex = Math.round(e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT / 2));
                                setCountScroll(newIndex)
                            }
                        }}
                        onScrollToIndexFailed={(error) => {
                            carousel.current?.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
                            setTimeout(() => {
                                if (imagesList?.length !== 0 && carousel.current !== null) {
                                    carousel.current.scrollToIndex({ index: error.index, animated: true });
                                }
                            }, 500);
                        }}
                        onScroll={(e) => {
                            if (isTurn === 0) {
                                if (e.nativeEvent.contentOffset.y > 0) {
                                    scrollY.setValue(Math.round(e.nativeEvent.contentOffset.y));
                                    scrollYFooter.setValue(Math.round(e.nativeEvent.contentOffset.y))
                                }
                            } else {
                                if (e.nativeEvent.contentOffset.x > 0) {
                                    scrollY.setValue(Math.round(e.nativeEvent.contentOffset.x));
                                    scrollYFooter.setValue(Math.round(e.nativeEvent.contentOffset.x))
                                }
                            }
                        }}
                    />
                </TapGestureHandler>
            </View>
        </View>
    );

}
export default React.memo(ListImage, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    Header: {
        position: "absolute",
        top: 0,
        left: 0,
        elevation: 1,
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center",
        height: height / 9.5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#404042',
        backgroundColor: '#404042',
        paddingTop: 30,
        zIndex: 10,

    },
    name: {
        textTransform: 'uppercase',
        fontSize: 15,
        flex: 1,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,

        backgroundColor: '#fff'
    },
    Img: {
        width: "100%",
        alignSelf: "center",
        flexDirection: "row",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.9,
        elevation: 5,
    },
    endchap: {
        textAlign: 'center'
    },
    Footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: height / 13,
        paddingHorizontal: 10,
        elevation: 6,
        width: width,
        backgroundColor: '#404042',
        justifyContent: "center",
        opacity: 0.8,
        zIndex: 10
    },
    textChapter: {
        fontSize: 14,
        color: "#b8b4b4"
    },
    pause: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        zIndex: 999,
        // paddingHorizontal: 20,
        // paddingVertical: 10,
        // backgroundColor: '#161a1d',
        borderRadius: 10
    },
    speed: {
        position: 'absolute',
        bottom: '16%',
        right: '5%',
        zIndex: 999,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#161a1d',
        borderRadius: 10
    }
})

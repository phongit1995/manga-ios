import React, { FunctionComponent, useCallback, useRef, useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Image, Dimensions, Text, StatusBar } from 'react-native';
import ImageFullWith from './ImageFullWith'
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT, TYPE_READ } from '../../constants';
import * as SCREEN from '../../constants/ScreenTypes';
import ApplovinService from './../../Applovin/Applovin';
import { State, TapGestureHandler, FlatList } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');

const ListImage: FunctionComponent<any> = ({
    isDarkMode,
    afterChapter,
    page,
    indexChap,
    dataTotleChap,
    idChap,
    isTurn,
    imagesList,
    scrollY,
    scrollYFooter,
    headerRef,
    footerRef
}: any) => {
    let carousel = React.useRef<any>(null);
    let [count, setCount] = React.useState<number>(1)
    const indexNow = useRef(0);
    const isMount = useRef(false);
    let [countScroll, setCountScroll] = React.useState<number>(1)

    const layouts = useRef([]);
    function getOffsetByIndex(index) {
        let offset = 0;
        for (let i = 0; i < index; i += 1) {
            const elementLayout: any = layouts.current[i];
            if (elementLayout && elementLayout?.height) {
                offset += elementLayout.height;
            }
        }
        return offset;
    }
    function scrollToIndex(index) {
        const commentIndex = index;
        if (commentIndex !== -1) {
            const offset = getOffsetByIndex(commentIndex);
            carousel.current.scrollToOffset({ offset, animated: true });
        }
    }

    useEffect(() => {
        if (imagesList?.length > 0) {
            headerRef.current?.handleChangePage({
                page: 1,
                totalPage: imagesList?.length,
            })
        }
    }, [imagesList])

    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log({ viewableItems })
        let indexView = viewableItems?.length - 1;
        if (viewableItems?.length > 0) {
            if (viewableItems?.[indexView]?.index === imagesList?.length - 1) {
                headerRef.current?.handleChangeShow(true);
                footerRef.current?.handleChangeShow(true);
            } else {
                headerRef.current?.handleChangeShow(false);
                footerRef.current?.handleChangeShow(false);
            }
            indexNow.current = viewableItems?.[indexView]?.index || 0;
            headerRef.current?.handleChangePage({
                page: viewableItems?.[indexView]?.index + 1,
                totalPage: imagesList?.length || 0,
            })
        }
    }, [imagesList]);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    useEffect(() => {
        if (isMount.current) {
            if (isTurn === 0) {
                scrollToIndex(indexNow.current)
            } else {
                let getIndex = count > imagesList?.length ? imagesList?.length - 1 : count++
                carousel?.current?.scrollToIndex({ index: getIndex, animated: false });
            }
        } else {
            isMount.current = true;
        }
    }, [isTurn])

    let _goToNextPage = (e: number) => {
        scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
        scrollYFooter.setValue(SCREEN_HEIGHT / 15)
        if (carousel.current) {
            if (isTurn === TYPE_READ.VERTICAL) {
                carousel.current.scrollToOffset({
                    offset: (SCREEN_WIDTH_No) * (e + 1),
                    animated: true,
                });
                setCount(e => e + 1)
                return
            }

            carousel.current.scrollToOffset((SCREEN_WIDTH_No) * (e + 1), 0, true)
            setCount(e => e + 1)
        }
    };

    React.useEffect(() => {
        let timer = setTimeout(() => {
            scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
            scrollYFooter.setValue(SCREEN_HEIGHT / 15)
        }, 1500);
        return () => clearTimeout(timer);
    }, [isTurn])

    const __goToNextChap = () => {
        try {
            if (afterChapter) {
                ApplovinService.showAdsFull(SCREEN.DETIAL_CHAPTER, { id: afterChapter, idChap: idChap, dataTotleChap, indexChap: indexChap + 1, page: 20 * page < (indexChap + 1) ? page + 1 : page }, 'replace');

            }
        } catch (error) {

        }
    }

    const _rowRenderer = (type, data) => {
        const { image, index } = data.item
        return (
            <View style={{ flex: 1 }}>
                <ImageFullWith {...{
                    url: image,
                    isTurn,
                    scrollY,
                    scrollYFooter,
                }} />
            </View>
        )
    }

    function addToLayoutsMap(layout, index) {
        // @ts-ignore
        layouts.current[index] = layout;
    }

    let renderItem = ({ item, index }) => {
        return (
            <View onLayout={({ nativeEvent: { layout } }) => {
                if (isTurn === 0) {
                    addToLayoutsMap(layout, index);
                }
            }}>
                <ImageFullWith id={index} {...{
                    url: item,
                    isTurn,
                    scrollY,
                    scrollYFooter,
                }} />
            </View>

        )
    }
    let keyExtractor = (_, index: number) => {
        return (index).toString()
    }
    const getItemLayout = isTurn === 0 ? undefined : (_, index: number) => {
        return ({
            length: SCREEN_WIDTH_No,
            offset: (SCREEN_WIDTH_No) * (index),
            index: index
        })
    }
    const __onhandlerOpenTab = () => {
        scrollY.setValue(-SCREEN_HEIGHT / 9.5);
        scrollYFooter.setValue(-SCREEN_HEIGHT / 15)
    }
    const _onSingleTapVertical = event => {
        // if (event.nativeEvent.state === State.ACTIVE) {
        //     // settingRef.current?.onShow();
        //     if (event.nativeEvent.y > SCREEN_HEIGHT / 2) {
        //         if(isTurn === TYPE_READ.VERTICAL){
        //             _goToNextPage(count)

        //         } else {
        //             if(event.nativeEvent.x > SCREEN_WIDTH / 2){
        //                 if(indexNow.current < imagesList.length - 1){
        //                     carousel.current?.scrollToIndex({
        //                         index: indexNow.current + 1,
        //                         animated: true
        //                     })
        //                 }
        //             } else {
        //                 if(indexNow.current > 0){
        //                     carousel.current?.scrollToIndex({
        //                         index: indexNow.current - 1,
        //                         animated: true
        //                     })
        //                 }
        //             }
        //         }

        //     } else {
        //         __onhandlerOpenTab()

        //         if(isTurn === TYPE_READ.VERTICAL){
        //         } else {
        //             const timeHide = setTimeout(() => {
        //                 scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
        //                 scrollYFooter.setValue(SCREEN_HEIGHT / 15)
        //                 clearTimeout(timeHide);
        //             }, 3000)

        //         }
        //     }
        // }
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

        //handle tap action scroll to vetical
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
        <View style={[styles.content, { backgroundColor: isDarkMode ? '#111217' : '#111217' }]}>
            <StatusBar barStyle="light-content" />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TapGestureHandler
                    onHandlerStateChange={_onSingleTapVertical}
                >
                    <FlatList
                        ref={ref => {
                            carousel.current = ref;
                        }}
                        key={isTurn?.toString()}
                        data={imagesList ? imagesList : []}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        horizontal={isTurn === TYPE_READ.HORIZONTAL}
                        decelerationRate={'normal'}
                        maxToRenderPerBatch={12}
                        pagingEnabled={isTurn === TYPE_READ.HORIZONTAL}
                        viewabilityConfig={_viewabilityConfig}
                        onViewableItemsChanged={_onViewableItemsChanged}
                        contentContainerStyle={{
                            zIndex: 99999,
                            elevation: 10000,
                            paddingTop: STATUS_BAR_HEIGHT
                        }}
                        onScroll={(e) => {
                            if (e.nativeEvent.contentOffset.y > 0) {
                                scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
                                scrollYFooter.setValue(SCREEN_HEIGHT / 15)
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
                        scrollEventThrottle={10}
                        // snapToInterval={isTurn === TYPE_READ.VERTICAL ? undefined : SCREEN_WIDTH_No}
                        getItemLayout={getItemLayout}
                        onMomentumScrollEnd={(e) => {
                            if (isTurn === 0) {
                                let newIndex = Math.round(e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT / 2));
                                setCountScroll(newIndex)
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
    content: {
        flex: 1,
    },
})

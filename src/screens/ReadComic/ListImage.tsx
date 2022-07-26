import React, {FunctionComponent, useState, useCallback, useRef, useEffect} from 'react';
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import ImageFullWith from './ImageFullWith'
import {SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT, TYPE_READ} from '../../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../constants/ScreenTypes';
import AdmodService from '../../firebase/Admod';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { LongPressGestureHandler, ScrollView, State, TapGestureHandler, FlatList } from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

type listImageProps = {
    isTurn: number,
    imagesList: string[],
    scrollY: any,
    scrollYFooter: any,
}

const ListImage: FunctionComponent<any> = ({ isDarkMode, afterChapter, page, indexChap, dataTotleChap, idChap, isTurn, imagesList, scrollY, scrollYFooter, headerRef }: any) => {
    let carousel = React.useRef<any>(null);
    let [count, setCount] = React.useState<number>(0)
    const indexNow = useRef(0);
    const isMount = useRef(false);

    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        indexNow.current = viewableItems?.[0]?.index || 0;
        headerRef.current?.handleChangePage({
            page: viewableItems?.[0]?.index + 1,
            totalPage: imagesList?.length || 0,
        })
    }, [imagesList]);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }

    useEffect(() => {
        if(isMount.current){
            console.log({indexNow})
            carousel.current?.scrollToIndex({
                index: indexNow.current,
            })
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
    useFocusEffect(
        React.useCallback(() => {
            AdmodService.loadAdmod();
        }, [])
    )

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
                AdmodService.showAdsFull(SCREEN.DETIAL_CHAPTER, { id: afterChapter, idChap: idChap, dataTotleChap, indexChap: indexChap + 1, page: 20 * page < (indexChap + 1) ? page + 1 : page }, 'replace');

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

    let renderItem = ({ item, index }) => {
        return(
          <ImageFullWith {...{
              url: item,
              isTurn,
              scrollY,
              scrollYFooter,
          }} />
        )
    }
    let keyExtractor = (_, index: number) => {
        return (index).toString()
    }
    const getItemLayout = isTurn === TYPE_READ.VERTICAL ? undefined : (_, index) => {
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
        if (event.nativeEvent.state === State.ACTIVE) {
            // settingRef.current?.onShow();
            if (event.nativeEvent.y > SCREEN_HEIGHT / 2) {
                _goToNextPage(count)
            } else {
                __onhandlerOpenTab()
            }
        }
    }
    const _onSingleTapHorizintal = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (event.nativeEvent.y > (SCREEN_HEIGHT / 2)) {
                _goToNextPage(count)
            } else {
                __onhandlerOpenTab()
            }
        }
    }
    console.log({isTurn})
    return (
        <View style={[styles.content, { backgroundColor: isDarkMode ? '#111217' : '#FFF' }]}>
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
                                onScrollToIndexFailed={info => {
                                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                                    wait.then(() => {
                                        carousel.current?.scrollToIndex({
                                            index: info.index,
                                            animated: true,
                                        });
                                    });
                                }}
                                scrollEventThrottle={10}
                                // snapToInterval={isTurn === TYPE_READ.VERTICAL ? undefined : SCREEN_WIDTH_No}
                                getItemLayout={getItemLayout}
                                onMomentumScrollEnd={(e) => {
                                    if (isTurn === TYPE_READ.VERTICAL) {
                                        let newIndex = Math.round(
                                            e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT / 2)
                                        );
                                        setCount(newIndex + 1)
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

import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Image, Dimensions, FlatList, Text } from 'react-native';
import ImageFullWith from './ImageFullWith'
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT } from '../../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../constants/ScreenTypes';
import AdmodService from '../../firebase/Admod';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import { LongPressGestureHandler, ScrollView, State, TapGestureHandler } from 'react-native-gesture-handler';

type listImageProps = {
    isTurn: number,
    imagesList: string[],
    scrollY: any,
    scrollYFooter: any,
}

const ListImage: FunctionComponent<any> = ({ isDarkMode, afterChapter, page, indexChap, dataTotleChap, idChap, isTurn, imagesList, scrollY, scrollYFooter }: any) => {
    const navigation = useNavigation<any>();
    let carousel = React.useRef<any>(null);
    const [feakeData, setfeakeData] = React.useState([])
    let [count, setCount] = React.useState<number>(0)

    let _goToNextPage = (e: number) => {
        scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
        scrollYFooter.setValue(SCREEN_HEIGHT / 15)
        if (carousel.current) {
            if (isTurn === 0) {
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
        (() => {
            if (isTurn === 1 && imagesList.length != 0) {
                let arr: any = []
                new Promise(async (reslove, reject) => {
                    for (let index = 0; index < imagesList.length; index++) {
                        arr.push({
                            type: 'NORMAL',
                            item: {
                                image: imagesList[index],
                                index: index
                            }
                        })
                    }
                    reslove(arr)
                }).then((i: any) => {
                    setfeakeData(i)
                }).catch(e => console.log(e))
            }

        })()
        return () => setCount(0)
    }, [imagesList, isTurn])
    const list = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(feakeData)
    const _layoutProvider = new LayoutProvider((i) => {
        return list.getDataForIndex(i).type;
    }, (type, dim) => {
        switch (type) {
            case 'NORMAL':
                dim.width = SCREEN_WIDTH_No
                dim.height = SCREEN_HEIGHT
                break;
            default:
                dim.width = 0;
                dim.height = 0;
        }
    });
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
    let renderItem = ({ item, index }) => <ImageFullWith {...{
        url: item,
        isTurn,
        scrollY,
        scrollYFooter,
    }} />
    let keyExtractor = (_, index: number) => {
        return (index).toString()
    }
    const getItemLayout = isTurn === 0 ? undefined : (_, index: number) => {
        return ({
            length: SCREEN_WIDTH_No,
            offset: (SCREEN_WIDTH_No) * (index + 1),
            index: index
        })
    }
    const __onhandlerOpenTab = () => {
        scrollY.setValue(-SCREEN_HEIGHT / 9.5);
        scrollYFooter.setValue(-SCREEN_HEIGHT / 15)
    }
    const _onSingleTapVertical = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
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
    return (
        <View style={[styles.content, { backgroundColor: isDarkMode ? '#111217' : '#FFF' }]}>
            {
                isTurn === 0 ? (
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
                                data={imagesList ? imagesList : []}
                                keyExtractor={keyExtractor}
                                renderItem={renderItem}
                                horizontal={false}
                                decelerationRate={'normal'}
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

                                scrollEventThrottle={10}
                                snapToInterval={isTurn === 0 ? undefined : SCREEN_WIDTH_No}
                                getItemLayout={getItemLayout}
                                onMomentumScrollEnd={(e) => {
                                    if (isTurn === 0) {
                                        let newIndex = Math.round(
                                            e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT / 2)
                                        );
                                        setCount(newIndex + 1)
                                    }
                                }}
                            />
                        </TapGestureHandler>
                    </View>
                ) : (
                    imagesList.length != 0 ? (
                        <React.Fragment>
                            <TapGestureHandler
                                onHandlerStateChange={_onSingleTapHorizintal}
                            >
                                <RecyclerListView
                                    rowRenderer={_rowRenderer}
                                    dataProvider={list}
                                    scrollThrottle={10}
                                    ref={ref => {
                                        carousel.current = ref;
                                    }}
                                    style={{ marginTop: STATUS_BAR_HEIGHT }}
                                    onScroll={(e) => {
                                        if (e.nativeEvent.contentOffset.x > 0) {
                                            scrollY.setValue((SCREEN_HEIGHT / 9.5) + STATUS_BAR_HEIGHT);
                                            scrollYFooter.setValue(SCREEN_HEIGHT / 15)
                                        }
                                    }}
                                    onMomentumScrollEnd={(e) => {
                                        if (isTurn === 1) {
                                            let newIndex = Math.round(
                                                e.nativeEvent.contentOffset.x / (SCREEN_WIDTH_No)
                                            );
                                            setCount(newIndex)

                                        }
                                    }}

                                    layoutProvider={_layoutProvider}
                                    isHorizontal={true}
                                    decelerationRate="normal"
                                    canChangeSize={true}
                                    snapToInterval={SCREEN_WIDTH_No}
                                />
                            </TapGestureHandler>
                        </React.Fragment>
                    ) : null
                )
            }
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

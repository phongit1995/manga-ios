import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
const { height, width } = Dimensions.get("window");
import ImageFullWith from './ImageFullWith'
import { SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants';
type listImageProps = {
    isTurn: number,
    imagesList: string[],
    scrollY: any,
    scrollYFooter: any,
}

const ListImage: FunctionComponent<listImageProps> = ({ isDarkMode, isTurn, imagesList, scrollY, scrollYFooter }: any) => {
    let carousel = React.useRef<any>(null);
    let [count, setCOunt] = React.useState<number>(1)

    React.useEffect(() => {
        return () => {
            setCOunt(1)
        }
    }, [isTurn])
    let _goToNextPage = (e) => {

        if (carousel.current) {
            carousel.current.scrollToOffset({
                offset: (SCREEN_WIDTH_No) * (e + 1),
                animated: true,
            });
        }
        if (isTurn === 0) setCOunt(e => e + 1)
    };

    let renderItem = ({ item, index }) => <ImageFullWith {...{isDarkMode, count, index, isTurn, url: item, _goToNextPage }} />
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

    return (
        <View style={[styles.content, { backgroundColor: isDarkMode  ? '#111217' : '#FFF'}]}>
            <View style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ref={ref => {
                        carousel.current = ref;
                    }}
                    contentContainerStyle={{
                        marginTop: isTurn === 0 ? (SCREEN_HEIGHT / 12) + 12 : 0,
                        paddingBottom: isTurn === 0 ? (SCREEN_HEIGHT / 15) : 0
                    }}
                    data={imagesList.length != 0 ? JSON.parse(imagesList) : []}
                    keyExtractor={keyExtractor}
                    nestedScrollEnabled={true}
                    renderItem={renderItem}
                    horizontal={isTurn === 0 ? false : true}
                    decelerationRate={isTurn === 0 ? "normal" : 'fast'}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={1}
                    snapToInterval={isTurn === 0 ? undefined : SCREEN_WIDTH_No}
                    getItemLayout={getItemLayout}
                    onMomentumScrollEnd={(e) => {
                        if (isTurn === 0) {
                            let newIndex = Math.round(
                                e.nativeEvent.contentOffset.y / (SCREEN_HEIGHT / 2)
                            );
                            setCOunt(newIndex + 1)
                        }
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

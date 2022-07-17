import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Animated } from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native';
import Header from './Header';
import InformationComic from './InformationComic'
import DescriptComic from './DescriptComic'
import ItemChap from './InformationChap/ItemChap'
import TitleChapter from './InformationChap/TitleChapter';
import SqlHelper from '../../common/SQLHelper';
import NetWork from '../../components/NetWork';
import Report from '../Report';
import { ItemComicProps } from '../../constants/mangaItem.type'
import { ChapterItem } from '../../api/interface/chapter.interface';
import Loading from '../../components/Loading';
import { SCREEN_WIDTH, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT } from '../../constants'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { RootState } from '../../redux/reducers'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import { getListChapter, getDetialComic } from '../../api/comic';
import HeaderName from './HeaderName';
import ActionComic from './ActionComic';
import {
    changeBackground,
    changeBackground_,
    changeBackground__,
    changeBackground___,
    changeBackground_____,
    changeBackground______,
    changeBackground_______,
    changeBackground________,
    changeBackground_________
} from '../../common/stringHelper';
export const iconBackTop = require('../../assets/image/top.png')
export const iconLove = require('../../assets/image/lf30_editor_ilhncfag.json');
import AdmodService from './../../firebase/Admod';
import { stores } from '../../../App'
export type RootStackParamList = {
    DETIAL_COMIC_SCREEN: { item: ItemComicProps, id: string };
};
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
export type DetailChapProps = {
    data: ChapterItem[],
}
const DetailComic: FunctionComponent = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const router = useRoute<RootRouteProps<'DETIAL_COMIC_SCREEN'>>();
    const { id } = router.params;
    const [page, setPage] = React.useState<number>(1);
    const [item, setItem] = React.useState<ItemComicProps | any>(null)
    const [loading, setLoading] = React.useState<boolean>(true);
    const [loadingChap, setLoadingChap] = React.useState<boolean>(true);
    const [data, setData] = React.useState<DetailChapProps | null>(null);
    const [dataTotleChap, setDataTotleChap] = React.useState<number>(0);
    const [isFollow, setIsFollow] = React.useState<boolean>(false);
    const [isactive, setisactive] = React.useState<boolean>(false);
    const [isloadingPage, setisLoadingPage] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [height, setHeight] = React.useState<number>(281)
    const [wWidth, setwWidth] = React.useState<number>(30)
    const [nameChapRead, setnameChapRead] = React.useState<string>('READ NOW');
    const offset = React.useRef(new Animated.Value(0)).current;
    const [listChapRead, setListChapRead] = React.useState<any>([])
    const carouselScroll = React.useRef<any>(null);
    const color_ = changeBackground_(isDarkMode)
    const color__ = changeBackground__(isDarkMode)
    const color____ = changeBackground_____(isDarkMode)
    const color________ = changeBackground_________(isDarkMode)

    React.useEffect(() => {
        dispatch(dispatchNetWork())
        return () => {
            setData(null)
            setItem(null)
        }
    }, [])


    React.useEffect(() => {
        if (isNetWork) fetchData(page)
    }, [page, isNetWork])

    React.useEffect(() => {
        if (item) {
            SqlHelper.addHistoryManga(item,item?.name);
            SqlHelper.getFollowManga(item).then((resultFollow: any) => {
                if (resultFollow.length > 0) {
                    setIsFollow(true)
                }
            })
        }
    }, [loading, isNetWork])

    const opacity = offset.interpolate({
        inputRange: [0, height - wWidth, height - (wWidth - 10), height],
        outputRange: [0, 0, 0, 1]
    })

    useFocusEffect(
        React.useCallback(() => {
            if (listChapRead[0]) {
                setnameChapRead(listChapRead[0].chapter_name)
            }
        }, [listChapRead[0]])
    )

    useFocusEffect(
        React.useCallback(() => {
            if (item) {
                SqlHelper.getaddhistoryMangaChapter(item?._id)
                    .then((result: any) => {
                        if (result.length != 0) {
                            setPage(result[0].number)
                            setListChapRead(result)
                        }
                    })
            }
        }, [loading])
    )

    const fetchData = async (_page) => {
        try {
            if (item) {
                console.log('item')
                setisLoadingPage(true)
                const resultChapter = await getListChapter(parseInt(_page), id, 20, 1)
                if (resultChapter?.data?.status == "success") {
                    setData({
                        data: resultChapter?.data?.data,
                    });
                    setisLoadingPage(false)
                }
            } else {
  
                getDetialComic(id).then((result) => {

                    if (result?.data?.status == "success") {
                        setItem(result?.data?.data);
                        setLoading(false);
                    }
                })
                getListChapter(parseInt(_page), id, 20).then((result) => {
                    if (result?.data?.status == "success") {
                        setData({
                            data: result?.data?.data,
                        });
                        setDataTotleChap(result?.data?.numberResult)
                        setLoadingChap(false);
                    }
                })
            }
        } catch (error) {
            setData(null)
        }
    }

    const showAimatedFollow = () => {
        return (
            <React.Fragment>
                {
                    isactive ? (
                        <View style={styles.love}>
                            <LottieView
                                source={iconLove}
                                autoPlay={true}
                                loop={false}
                                style={styles.tinyicon}
                                speed={3}
                                onAnimationFinish={() => {
                                    setisactive(false)
                                }}
                            />
                        </View>
                    ) : null
                }
            </React.Fragment>
        )
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: color_ }]}>
            <FocusAwareStatusBar barStyle='light-content' hidden={false} translucent={true} backgroundColor="transparent" />
            {
                loading ? (
                    <View style={[styles.containerLoading, { backgroundColor: color__ ,}]}>
                        <Loading></Loading>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        <Header {...{ setModalVisible }}></Header>
                        <HeaderName {...{ item, opacity }}></HeaderName>
                        <ScrollView
                            style={{ flex: 1, backgroundColor: '#ad772d' }}
                            stickyHeaderIndices={[2]}
                            scrollEventThrottle={1}
                            ref={ref => carouselScroll.current = ref}
                            showsVerticalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: offset } } }],
                                { useNativeDriver: false }
                            )}
                        >
                            <View onLayout={({
                                nativeEvent: {
                                    layout: { height },
                                },
                            }) => setHeight(height)}>
                                <InformationComic {...{ color__, dataTotleChap, idchapred: listChapRead[0], nameChap: data?.data[0]?.name, setwWidth, setHeight, idcomic: data?.data[0]?._id, _id: id, item: item, isFollow }}></InformationComic>
                            </View>
                            <DescriptComic {...{ item: item, color________, color____, color__ }}></DescriptComic>
                            <TitleChapter {...{ data, page, setPage, dataTotleChap, color________, color__, color____ }}></TitleChapter>
                            {
                                !isNetWork ? (
                                    <NetWork></NetWork>
                                ) : (
                                    loadingChap ? <View style={[{ backgroundColor: color__, }]}>

                                        <Loading></Loading></View> : (
                                        <View style={{ backgroundColor: color_ ,flex:1}}>
                                            <ItemChap {...{ page, listChapRead, dataTotleChap, item: item, id_: id, data, isloadingPage, color________, color____, color__ }}></ItemChap>
                                        </View>)
                                )
                            }

                        </ScrollView>
                        <ActionComic {...{ item, isFollow, setIsFollow, setisactive, listChapRead, data, id, dataTotleChap, nameChapRead }}></ActionComic>
                    </View>
                )
            }
            {showAimatedFollow()}

            <Report {...{ modalVisible, setModalVisible, id }}></Report>

        </SafeAreaView>
    )
}

export default React.memo(DetailComic, isEqual);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    love: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999888,
        elevation: 100
    },
    tinyicon: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH
    },
    total: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 15,
        backgroundColor: '#272536',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    btn: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH_No / 2,
        paddingVertical: 5,
        paddingHorizontal: 20

    },
    txtTitle: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'averta',
    },
    txt: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'Averta-Bold',
        marginLeft: 5
    },
    containerTop: {
        position: 'absolute',
        zIndex: 999999,
        elevation: 9999,
        right: '5%',
        width: 35,
        height: 35,
    },
    icon: {
        width: 35,
        height: 35,
    },
    iconRead: {
        width: 30,
        height: 30,
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

})



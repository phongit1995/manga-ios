import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import { SCREEN_WIDTH } from '../../../constants'
import Header from './Header';
import { getListChapter } from '../../../api/comic';
import Item from './Item'
import { useRoute, RouteProp } from '@react-navigation/native';
import Loading from '../../../components/Loading';
import { itemProps } from '../../DetailComic/InformationChap/ItemChap'
import NetWork from '../../../components/NetWork';
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
} from '../../../common/stringHelper';
import SQLHelper from '../../../common/SQLHelper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector ,useDispatch} from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ModalPage from '../../DetailComic/InformationChap/ModalPage';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import { RootState } from '../../../redux/reducers'
import { useFocusEffect } from '@react-navigation/native';
import AdmodService from '../../../firebase/Admod';
import { stores } from '../../../../App'
import { dispatchNetWork } from '../../../redux/action/NetWorkAction'
export type RootStackParamList = {
    CHAPTER_LIST_SCREEN: { id: string, idcomic: string, dataTotleChap: number };
};
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
type renderItemProps = {
    item: itemProps,
    index: number
}
const ListChapter: FunctionComponent<any> = () => {
    const dispatch = useDispatch()
    const router = useRoute<RootRouteProps<'CHAPTER_LIST_SCREEN'>>();
    const { id, idcomic, dataTotleChap } = router.params;
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const [page, setPage] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<itemProps[]>([]);
    const [numberResult, setnumberResult] = React.useState<number>(0);
    const [listChapRead, setListChapRead] = React.useState<any>([])

    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [numSort, setNumberSort] = React.useState<number>(1);
    React.useEffect(() => {
        dispatch(dispatchNetWork())
    },[])
    React.useEffect(() => {
        if (stores.getState().FunctionReduce.isPremium) return
        AdmodService.loadAdmod();
    },[])

    React.useEffect(() => {
        SQLHelper.getaddhistoryMangaChapter(id)
            .then((result: any) => {
                if (result.length != 0) {
                    setPage(result[0].number)
                    setListChapRead(result)

                }
            })
    }, [])
    React.useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const result = await getListChapter(page, id, 20, numSort)
                if (result?.data?.status === "success") {
                    setnumberResult(result?.data?.numberResult)
                    setData(result?.data?.data);
                    setLoading(false);
                }
            } catch (error) {
                setData([])
                setnumberResult(0)
            }
        })()
        return () => setData([])
    }, [page, numSort])


    const color = changeBackground(isDarkMode)
    const color_ = changeBackground_(isDarkMode)
    const color__ = changeBackground__(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    const color____ = changeBackground_____(isDarkMode)
    const colorStatusBar = changeBackground________(isDarkMode)
    const color_____ = isDarkMode ? '#1e1e23' : '#F2F2F2'
    const color________ = changeBackground_________(isDarkMode)
    const renderItem = ({ item, index }: renderItemProps) => <Item dataTotleChap={dataTotleChap} index={index} page={page} item={item} key={item._id} id={id} {...{ listChapRead, color________, color____, color__ ,color_____ }}></Item>
    const keyExtractor = React.useCallback((item: itemProps) => item._id.toString(), [])


    return (
        <View style={[styles.container, { backgroundColor: color__ }]}>
                <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' :'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor={color___}
            />
            <Header {...{ color___, color____ }}></Header>

            <View style={[{
                backgroundColor: color__,
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 10,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: color_____,
            }]}>
                <Text style={[
                    {
                        fontSize: 20,
                        paddingTop: 0,
                        color: '#000',
                        fontFamily: 'Nunito-Bold',

                    }, {
                        color: color____
                    }
                ]}>Chapter</Text>
                <View style={styles.containerRight}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            marginLeft: 15
                        }}
                        onPress={() => setModalVisible(true)}>
                        <AntDesign name="appstore-o" size={20} color={color____} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                !isNetWork ? (
                    <NetWork></NetWork>
                ) : (
                    loading ? (
                        <View style={styles.loading}>
                            <Loading></Loading>
                        </View>
                    ) :
                        (
                            <>

                                <FlatList
                                    onEndReachedThreshold={1}
                                    showsVerticalScrollIndicator={false}
                                    data={data}
                                    bounces={false}
                                    refreshing={false}
                                    renderItem={renderItem}
                                    keyExtractor={keyExtractor}
                                    initialNumToRender={20}
                                >
                                </FlatList>
                            </>
                        )
                )
            }
            <ModalPage {...{ page, setPage, modalVisible, setModalVisible, dataTotleChap: numberResult, color__, color________, color____}}></ModalPage>
        </View>
    );
};
export default React.memo(ListChapter, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    },
    Chapter_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#5bc6ff',
        padding: 20,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#5bc6ff',
    },
    containerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
})


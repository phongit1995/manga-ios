import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import SqlHelper from '../../common/SQLHelper';
export const icon = require('../../assets/image/ac2.png');
import Loading from '../../components/Loading';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import * as SCREEN from './../../constants/ScreenTypes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import ApplovinService from './../../Applovin/Applovin';
export type RootStackParamList = {
    ChapDowload: { nameChap: string, idManga: string, numberChap: number };
};
import { changeBackground, changeBackground_, changeBackground__, changeBackground___ } from '../../common/stringHelper';
import CustomModal from '../../components/CustomModal/CustomModal';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { RootState } from '../../redux/reducers'
import { stores } from '../../../App'
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>

const ChapDowload = () => {

    const router = useRoute<RootRouteProps<'ChapDowload'>>();
    const { nameChap, idManga, numberChap } = router.params;
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [data, setdata] = React.useState<any[]>([])
    const [id, setId] = React.useState('0');
    const [loading, setLoading] = React.useState<boolean>(false)
    const [page, setPage] = React.useState<number>(1);
    const [footerLoading, setFooterLoading] = React.useState<boolean>(false);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);

    React.useEffect(() => {
        (() => {
            try {
                setLoading(true)
                SqlHelper.GetListChapterByMangaDowload(1, 12, idManga)
                    .then((result: any) => {
                        if (result.length != 0) {
                            setdata([...result])
                        }
                        setLoading(false)
                    })
            } catch (error) {

            }
        })()
    }, [])
    const _OnLoadMore = () => {
        if (data.length >= 12) {
            setFooterLoading(true);
            SqlHelper.GetListDowload(page + 1, 12)
                .then((result: any) => {
                    if (result.length === 0) return setstatusLoadMore(true)
                    setdata([...data, ...result]);
                    setPage(page => page + 1);
                    setFooterLoading(false);
                })
        }
    }

    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }
    const Item = ({ item }) => {
        const navigation = useNavigation<any>();
        const deleteChap = () => {
            setModalVisible(true)
            setId(item.idchap)
        }

        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity style={{

                    backgroundColor: color_,
                    width: '90%',
                    paddingLeft: 20,
                    paddingVertical: 15,
                }}
                    activeOpacity={0.7}
                    onPress={() => {
                        navigation.navigate(SCREEN.READ_DOWNLOAD_CHAP_SCREEN, { item__: item }, null)
                        // ApplovinService.showAdsFull(SCREEN.READ_DOWNLOAD_CHAP_SCREEN, { item__: item },null)
                    }}
                >
                    <View style={{ width: '100%' }}>
                        <Text style={[{ fontFamily: 'Nunito-Bold' }, { color }]}>{item.nameChap}</Text>
                    </View>
                    {
                        item.status === 0 ? <View>
                            <Text style={[{ fontFamily: 'Nunito-Bold', fontSize: 10, color: '#ff4545' }, {}]}>Waiting to download...</Text>
                        </View> : <Text style={[{ fontFamily: 'Nunito-Bold', fontSize: 10, color: '#1fcf84' }, {}]}>Download success</Text>

                    }
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ width: '10%', alignItems: 'center', paddingVertical: 15, }}
                    onPress={() => deleteChap()}
                >
                    <Ionicons name="trash-outline" size={20} color={color} />

                </TouchableOpacity>
            </View>
        )
    }
    const renderItem = React.useCallback(({ item }) => <Item {...{ item }}></Item>, [])
    const keyExtractor = React.useCallback((item) => item?.id?.toString(), [])


    const onHandlerrDeleteAcpectChap = () => {
        SqlHelper.DeleteChapDownloadManga(idManga, id).then((result: any): any => {
            SqlHelper.GetListChapterByMangaDowload(1, 12, idManga)
                .then((results: any) => {
                    setdata([...results])
                })
            return Toast.show({
                type: "success",
                text1: "success",
                text2: "Delete Success 👌🏽",
                visibilityTime: 5000,
            })
        }).catch((e) => Toast.show({
            type: "success",
            text1: "success",
            text2: "Delete Fail 👌🏽",
            visibilityTime: 5000,
        }))
    }

    return (
        <View style={{
            backgroundColor: color_,
            flex: 1
        }}>
            <FocusAwareStatusBar barStyle='dark-content' hidden={false} translucent={true} backgroundColor="transparent" />
            <Header {...{ nameChap, color }}></Header>
            <View style={styles.numberChap}>
                <Text style={{ fontFamily: 'Nunito-Bold', }}>Dowload <Text style={{ color: '#ff4545' }}>{data.length}</Text>/{numberChap} Chapter</Text>
            </View>
            {loading ? <Loading></Loading> :
                data.length == 0 ?
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <FastImage
                            resizeMode="contain"
                            style={styles.tinyicon}
                            source={icon}></FastImage>
                        <Text style={[{ textAlign: "center", color: '#5c6b73', fontFamily: 'Averta' }, { color: color }]}>You have not download Chapter</Text>
                    </View> :
                    <View >

                        {modalVisible ? <CustomModal {...{ onHandlerrDeleteAcpectChap, modalVisible, setModalVisible }} type={4} title="Notification"> You sure want to delete </CustomModal> : null}
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            onEndReachedThreshold={1}
                            showsVerticalScrollIndicator={false}
                            onEndReached={_OnLoadMore}
                            ListFooterComponent={_renderFooterList}
                        >

                        </FlatList>
                    </View>
            }

        </View>
    )
}

export default ChapDowload;

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    numberChap: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FAFAFA'
    },
    tinyicon: {
        width: 180,
        height: 200,
        marginBottom: 10
    },
})

import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import ItemBook from '../../components/ItemBook';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';
export const icon = require('../../assets/image/ic_sorry_deleted_comic.png');
import { ItemComicProps } from './../../constants/mangaItem.type'
import CustomModal from '../../components/CustomModal/CustomModal';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-toast-message';
import { STATUS_BAR_HEIGHT } from '../../constants';
import AdmodService from './../../firebase/Admod';
import { stores } from '../../../App'
import Search from './Search';
import FastImage from 'react-native-fast-image';
type itemProps = {
    _id: string,
    category: string,
    date_time: number
}
type renderItemProps = {
    item: itemProps,
    index: number
}
const History = ({ colorBorder, showAlert, showAlertFaile, color_, color, color__, isDark }) => {
    const [listComic, setListComic] = React.useState<itemProps[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [footerLoading, setFooterLoading] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [id, setId] = React.useState('0');
    const [typeDelete, settypeDelete] = React.useState<number>(1);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);
    const [listSearch, setListSearch] = React.useState<any>('')
    useFocusEffect(
        React.useCallback(() => {
            let mounted = true;
            try {
                if (mounted) {
                    if (!loading) {
                        setLoading(true)
                    }
                    fecth()
                }
            } catch (error) {

            }
            return () => {
                mounted = false;
                setLoading(true)
                setstatusLoadMore(false)
                setPage(1)
                setListComic([])

            }
        }, [])
    )
    const fecth = async () => {
        SqlHelper.GetListHistory(1, 12)
            .then((result: any) => {
                if (result.length != 0) {
                    setListComic([...result]);
                }
                setLoading(false)
            })
    }

    const _OnLoadMore = () => {

        try {
            if (listComic.length >= 12) {
                setFooterLoading(true);
                SqlHelper.GetListHistory(page + 1, 12)
                    .then((result: any) => {
                        if (result.length === 0) return setstatusLoadMore(true)
                        setListComic([...listComic, ...result]);
                        setPage(page => page + 1);
                        setFooterLoading(false);
                    })
            } else {
                return setstatusLoadMore(true)
            }
        } catch (error) {
            setListComic([])
        }
    }

    const deleteComic = (i: string) => {
        settypeDelete(1)
        setModalVisible(true)
        setId(i)
    }
    const onHandlerDeleteAll = () => {
        setModalVisible(true)
        settypeDelete(2)
    }
    const onHandlerrDeleteAcpect = () => {
        SqlHelper.DeleteAllHistoryManga().then((e) => {
            showAlert()
        })
            .catch((e) => {
                showAlertFaile()
            })
        setListComic([]);
    }
    const onHandlerAcess = () => {
        SqlHelper.DeleteMangaHistory(id)
        SqlHelper.GetListHistory(1, 12)
            .then((result: any) => {
                setListComic([...result]);
                showAlert()
            }).catch(() => showAlertFaile())
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }

    const renderItem = ({ item, index }: renderItemProps|any) => <ItemBook
        index={index}
        isDark={isDark}
        onHandlerAcess={onHandlerAcess}
        deleteComic={deleteComic}
        item={JSON.parse(item.category)}
        type={3}
        {...{ color_, color, color__, name: item?.name }}

    />
    const keyExtractor = React.useCallback((_, index: number) => index.toString(), [])

    return (
        <View style={[styles.container, { backgroundColor: color_ }]}>
            {
                loading ? <View style={styles.containerLoading}><Loading></Loading></View> :
                    listComic.length === 0 ?
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                            <FastImage
                                resizeMode="contain"
                                style={styles.tinyicon}
                                source={icon}></FastImage>
                            <Text style={[{ textAlign: "center", color: '#5c6b73', fontFamily: 'averta' }, { color: color }]}>You have not history any stories</Text>
                        </View> :
                        <View style={styles.containerList}>

                            {modalVisible ? <CustomModal {...{ onHandlerAcess, onHandlerrDeleteAcpect, modalVisible, setModalVisible }} type={typeDelete} title="Notification">You sure want to delete {typeDelete === 2 ? 'all' : ''}</CustomModal> : null}
                            <Search {...{
                                colorFontWhileToDark: color,
                                setListComic,
                                setListSearch,
                                nameTable: 'history',
                                isDarkMode: isDark
                            }}></Search>
                            {
                                listSearch.length != 0 ? (
                                    <View style={styles.containerNoSearch}>
                                        <FastImage
                                            resizeMode="contain"
                                            style={styles.tinyicon}
                                            source={icon}></FastImage>
                                        <Text style={styles.txt}>No search results</Text>
                                    </View>
                                ) : <FlatList
                                    data={listComic}
                                    keyExtractor={keyExtractor}
                                    renderItem={renderItem}
                                    numColumns={2}
                                    onEndReachedThreshold={1}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={styles.containerFlat}
                                    ListFooterComponent={_renderFooterList}

                                    onEndReached={_OnLoadMore}
                                />
                            }


                        </View>
            }
        </View>
    )
}

export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containerList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,

    },
    tinyicon: {
        width: 180,
        height: 200,
        marginBottom: 10
    },
    containerFlat: {
        paddingBottom: STATUS_BAR_HEIGHT + 60,
        marginLeft: 10,
        paddingTop: 10,

    }, containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        textAlign: "center",
        color: '#adb5bd',
        fontFamily: 'averta'
    },
    containerNoSearch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

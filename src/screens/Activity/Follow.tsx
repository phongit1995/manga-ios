import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import ItemBook from '../../components/ItemBook';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
export const icon = require('../../assets/image/ic_sorry_deleted_comic.png');
import Loading from '../../components/Loading';
import CustomModal from '../../components/CustomModal/CustomModal';
import Ionicons from 'react-native-vector-icons/Ionicons'
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
const Follow = ({ colorBorder, showAlert, showAlertFaile, isDark, color_, color, color__ }) => {
    const [listComic, setListComic] = React.useState<itemProps[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [footerLoading, setFooterLoading] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [typeDelete, settypeDelete] = React.useState<number>(1);
    const [id, setId] = React.useState('0');
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
                    SqlHelper.GetListFollower(1, 12)
                        .then((result: any) => {
                            if (result.length != 0) {
                                setListComic([...result]);
                            }
                            setLoading(false)
                        })
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
   
    const _OnLoadMore = () => {
        if (listComic.length >= 12) {
            setFooterLoading(true);
            SqlHelper.GetListFollower(page + 1, 12)
                .then((result: any) => {
                    if (result.length === 0) return setstatusLoadMore(true)
                    setListComic([...listComic, ...result]);
                    setPage(page => page + 1);
                    setFooterLoading(false);
                })
        }
    }

    const deleteComic = (i: string) => {
        settypeDelete(1)
        setModalVisible(true)
        setId(i)
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }
    const onHandlerAcess = () => {
        SqlHelper.unFollowManga(id)
        SqlHelper.GetListFollower(1, 12)
            .then((result: any) => {
                setListComic([...result]);
                showAlert()
            }).catch(() => showAlertFaile())
    }
    const onHandlerDeleteAll = () => {
        setModalVisible(true)
        settypeDelete(2)
    }
    const onHandlerrDeleteAcpect = () => {
        SqlHelper.DeleteAllFollowManga().then((e) => {
            showAlert()
        })
            .catch((e) => showAlertFaile())
        setListComic([]);
    }
    const renderItem = React.useCallback(({ item, index }: renderItemProps | any) => <ItemBook
        index={index}
        isDark={isDark}
        deleteComic={deleteComic}
        item={JSON.parse(item.category)} type={3}
        {...{ color_, color, color__, name: item?.name }}></ItemBook>, [color_, color, color__])
    const keyExtractor = React.useCallback((_, index: number) => index.toString(), [])

    return (
        <View style={[styles.container, { backgroundColor: color_ }]}>
            { loading ? <View style={styles.containerLoading}><Loading></Loading></View> :
                listComic.length == 0 ?
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <FastImage
                            resizeMode="contain"
                            style={styles.tinyicon}
                            source={icon}></FastImage>
                        <Text style={[{ textAlign: "center", fontFamily: 'Averta' }, {
                            color: color
                        }]}>You have not followed any stories</Text>
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
                                ) :  <FlatList
                                data={listComic}
                                keyExtractor={keyExtractor}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={1}
                                contentContainerStyle={styles.containerFlat}
                                onEndReached={_OnLoadMore}
                                numColumns={2}
                                ListFooterComponent={_renderFooterList}
                            />
                            }
                       

                    </View>
            }
        </View>
    )
}

export default Follow;

const styles = StyleSheet.create({
    container: {
        flex: 1,


        justifyContent: 'center'

    },
    header: {
        height: 50,
        fontFamily: "Nunito-SemiBold",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowRadius: 20,
        elevation: 2
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleHeader: {
        textTransform: "uppercase",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    containerList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
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

    },
    txt: {
        textAlign: "center",
        color: '#adb5bd',
        fontFamily: 'Averta'
    },
    containerNoSearch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList,} from 'react-native';
import ItemBook from '../../components/ItemDownload';
import SqlHelper from '../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
export const icon = require('../../assets/image/ic_sorry_deleted_comic.png');
import Loading from '../../components/Loading';
import CustomModal from '../../components/CustomModal/CustomModal';
import Toast from 'react-native-toast-message';
import { STATUS_BAR_HEIGHT } from '../../constants';
import FastImage from 'react-native-fast-image';
type itemProps = {
    _id: string,
    category: string,
    date_time: number
}

const Download = ({ colorBorder, showAlert, showAlertFaile, isDark, color_, color, color__ }) => {
    const [listComic, setListComic] = React.useState<itemProps[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [typeDelete, settypeDelete] = React.useState<number>(1);
    const [page, setPage] = React.useState<number>(1);
    const [footerLoading, setFooterLoading] = React.useState<boolean>(false);
    const [id, setId] = React.useState('0');
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);
    useFocusEffect(
        React.useCallback(() => {
            let mounted = true;
            try {
                if (mounted) {
                    if (!loading) {
                        setLoading(true)
                    }
                    SqlHelper.GetListDowload(1, 12)
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
            SqlHelper.GetListDowload(page + 1, 12)
                .then((result: any) => {
                    if (result.length === 0) return setstatusLoadMore(true)
                    setListComic([...listComic, ...result]);
                    setPage(page => page + 1);
                    setFooterLoading(false);
                })
        }
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }
    const deleteComic = (i: string) => {
        settypeDelete(1)
        setModalVisible(true)
        setId(i)
    }
    const onHandlerAcess = () => {
        SqlHelper.DeleteDownManga(id).then((_: any) => {
            showAlert()
        }).catch((e) => showAlertFaile())
        SqlHelper.GetListDowload()
            .then((result: any) => {
                setListComic([...result]);
                setLoading(false)
            })
    }
    const onHandlerDeleteAll = () => {
        setModalVisible(true)
        settypeDelete(2)
    }
    const onHandlerrDeleteAcpect = () => {
        SqlHelper.DeleteAllDownloadManga().then((e) => {
            showAlert()
        })
            .catch((e) => showAlertFaile())
        setListComic([]);
    }
    const renderItem = React.useCallback(({ item, index }: any) => <ItemBook isDark={isDark} deleteComic={deleteComic} item={item} index={index} type={3} {...{ color_, color, color__ }}></ItemBook>, [color_, color, color__])
    const keyExtractor = React.useCallback((item, index: number) => item.idManga.toString(), [])

    return (
        <View style={[styles.container, { backgroundColor: color_ }]}>
            <Toast ref={(ref) => Toast.setRef(ref)} style={{ zIndex: 9999 }} />
            { loading ? <Loading></Loading> :
                listComic.length == 0 ?
                    <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                        <FastImage
                            resizeMode="contain"
                            style={styles.tinyicon}
                            source={icon}></FastImage>
                        <Text style={[{ textAlign: "center", color: '#5c6b73', fontFamily: 'averta' }, { color: color }]}>You have not downloaded any stories</Text>
                    </View> :
                    <View style={styles.containerList}>
                        {/* <View style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor:color_,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            borderTopColor: isDark ? '#000' : '#e8e8e4',
                            borderTopWidth: 1
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => onHandlerDeleteAll()}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: isDark ? '#fff' : '#d34150',
                                    paddingVertical: 5,
                                    paddingHorizontal: 7,
                                    borderRadius: 10,
                                    elevation: 4
                                }}
                            >
                                <Ionicons name="trash-outline" size={20} color={isDark ? '#000' : '#fff'} />

                            </TouchableOpacity>
                        </View> */}
                        {modalVisible ? <CustomModal {...{ onHandlerAcess, onHandlerrDeleteAcpect, modalVisible, setModalVisible }} type={typeDelete} title="Notification">You sure want to delete {typeDelete === 2 ? 'all' : ''}</CustomModal> : null}
                        <FlatList
                            data={listComic}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: STATUS_BAR_HEIGHT + 60, justifyContent: "space-between", alignItems: "center", paddingTop: 10 }}
                            onEndReachedThreshold={1}
                            onEndReached={_OnLoadMore}
                            ListFooterComponent={_renderFooterList}

                        />

                    </View>
            }
        </View>
    )
}

export default Download;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

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
})

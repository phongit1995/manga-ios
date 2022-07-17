import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native';
import {  useFocusEffect } from '@react-navigation/native';
import { GetlistPublicComment } from '../../api/comments'
import { useDispatch, useSelector } from 'react-redux'
export const icon = require('../../assets/image/box.png');
import Item from './Item'
import Loading from '../../components/Loading';
import NetWork from '../../components/NetWork';
import { STATUS_BAR_HEIGHT } from '../../constants';
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import { RootState } from '../../redux/reducers'
import AdmodService from './../../firebase/Admod';
import FastImage from 'react-native-fast-image';
export default function ListComent({ color__, color_____, isDark }) {
    const dispatch = useDispatch()
    const [listComment, setListComment] = React.useState<any>([])
    const [loading, setloading] = React.useState<boolean>(false)
    const state = useSelector((state: RootState) => state)
    const { isNetWork } = state.NetWorkReduce;
    const [page, setPage] = React.useState<number>(1);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);
    const [footerLoading, setFooterLoading] = React.useState(false);
    useFocusEffect(
        React.useCallback(() => {
            dispatch(dispatchNetWork())
        }, [])
    )
    React.useEffect(()=>{
        try {
            if (isNetWork) {
                if (!loading) {
                    setloading(true)
                }
                GetlistPublicComment(page, 12).then((result) => {
                    if (result.data.status === "success") {
                        setListComment(result.data.data)
                        setloading(false)
                    }
                })
            }
        } catch (error) {
            setListComment([])
        }
        return () => {
            setloading(true)
            setstatusLoadMore(false)
            setPage(1)
            setListComment([])
        }
    },[isNetWork])

    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }


    const _onLoadMore = async () => {
        try {
            if (isNetWork) {
                if (listComment.length >= 12) {
                    setFooterLoading(true);
                    GetlistPublicComment(page + 1, 12).then((result) => {
                        if (result.data.status === "success") {
                            if (result?.data?.data?.length === 0) return setstatusLoadMore(true)
                            setPage(page => page + 1);
                            setListComment([...listComment, ...result?.data?.data]);
                        }
                    })
                } else {
                    return setstatusLoadMore(true)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            AdmodService.loadAdmod();
        }, [])
    )
    const renderItem = React.useCallback(({ item }) => <Item {...{ color__, item, color_____ }}></Item>, [isDark])
    const keyExtractor = React.useCallback((item, _) => item._id.toString(), [])
    const showComent = () => <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={listComment}
        contentContainerStyle={{ paddingBottom: 60 + STATUS_BAR_HEIGHT, paddingTop: 10 }}
        onEndReachedThreshold={1}
        renderItem={renderItem}
        onEndReached={_onLoadMore}
        keyExtractor={keyExtractor}
        ListFooterComponent={_renderFooterList}
    ></FlatList>
    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#111217' : '#F2F2F2' }]}>
            {
                !isNetWork ? (
                    <NetWork></NetWork>
                ) : (
                    loading ? <View style={[styles.containerLoading, { backgroundColor: isDark ? '#111217' : '#fff' }]}>
                        <Loading></Loading>
                    </View>
                        : (
                            listComment.length != 0 ? showComent() : <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                                <FastImage
                                    resizeMode="contain"
                                    style={styles.tinyicon}
                                    source={icon}></FastImage>
                                <Text style={[{ textAlign: "center", fontFamily: 'Averta', marginTop: 10, fontSize: 16 }, {
                                    color: color__
                                }]}>No Data</Text>
                            </View>
                        )
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e1e23'
    },
    tinyicon: {
        width: 180,
        height: 180,

    },
})
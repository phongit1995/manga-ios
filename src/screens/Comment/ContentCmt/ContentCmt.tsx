import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Item from './Item';
import Loading from '../../../components/Loading';
import ListRep from '../RepCmt/ListRep';
export const icon = require('../../../assets/image/box.png');
import * as screen from '../../../constants/ScreenTypes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native';
import { GetListCommentManga } from '../../../api/comments'
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
export default function ContentCmt({ color_____, color_, color__, idManga, statuscmt }) {
    const [listComment, setListComment] = React.useState<any>([])
    const navigation = useNavigation();
    const [loading, setloading] = React.useState<boolean>(true)
    const [footerLoading, setFooterLoading] = React.useState(false);
    const [page, setPage] = React.useState<number>(1);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);
    useFocusEffect(
        React.useCallback(() => {
            try {
                // if (!loading) {
                //     setloading(true)
                // }
                GetListCommentManga(page, 15, idManga).then((result) => {
                    if (result.data.status === "success") {
                        setListComment(result.data.data)
                        setloading(false)
                    }
                })
            } catch (error) {
                console.log(error)
            }
            return () => {
                setstatusLoadMore(false)
                setPage(1)
                // setloading(true)
                // setListComment([])
            }
        }, [statuscmt])
    )



    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }


    const _onLoadMore = async () => {

        try {
            if (listComment.length >= 15) {
                setFooterLoading(true);
                GetListCommentManga(page + 1, 15, idManga).then((result) => {
                    if (result.data.status === "success") {
                        if (result.data.data.length === 0) return setstatusLoadMore(true)
                        setPage(page => page + 1);
                        setListComment([...listComment, ...result.data.data]);
                    }
                })
            } else {
                return setstatusLoadMore(true)
            }
        } catch (error) {
            console.log(error)
        }

    }


    const renderItem = React.useCallback(({ item }) => {
        const onHandlerGotoRep = () => {
            navigation.navigate(screen.REP_COMMENT_SCREEN, { idRepcmt: item?._id })
        }

        return (
            <View style={{ flex: 1, marginBottom: 15 }}>
                <Item {...{ color__, item, noRep: 1 }}></Item>
                {/* {
                    item.replyCount != 0 ? (
                        <View style={styles.replycmt}>
                            {
                                item.replyCount > 2 ? (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => onHandlerGotoRep()}
                                        style={styles.feedback}>
                                        <MaterialIcons name="subdirectory-arrow-right" color="#1fcf84" size={20}></MaterialIcons>
                                        <Text style={styles.txt}>See more {item.replyCount - 2} feedback</Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                            <ListRep {...{ color__, idRepcmt: item._id, noRep: 1, showNumberItem: 2 }}></ListRep>
                        </View>
                    ) : null
                } */}

            </View>
        )
    }, [])

    const keyExtractor = React.useCallback((item, _) => item._id.toString(), [])
    const showComent = () => {
        return (
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                data={listComment}
                contentContainerStyle={{ padding: 10 }}
                onEndReached={_onLoadMore}
                onEndReachedThreshold={1}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListFooterComponent={_renderFooterList}
            ></FlatList>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: color_____ }]}>
            {
                loading ? <View style={styles.containerLoading}>
                    <Loading></Loading>
                </View>
                    : (
                        listComment.length != 0 ? showComent() : <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                            <FastImage
                                resizeMode="contain"
                                style={styles.tinyicon}
                                source={icon}></FastImage>
                            <Text style={[{ textAlign: "center", fontFamily: 'averta', marginTop: 5 }, {
                                color: color__
                            }]}>No comment</Text>
                        </View>
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
        alignItems: 'center'
    },
    replycmt: {
        marginLeft: 70,
        marginTop: 5
    },
    tinyicon: {
        width: 180,
        height: 180,

    },
    feedback: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt: {
        marginLeft: 10,
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
        fontSize: 16,
        color: '#1fcf84'
    }
})
import React from 'react'
import { Text, View, StyleSheet, FlatList} from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { GetlistCmtRepCommentManga } from '../../../api/comments'
export const icon = require('../../../assets/image/box.png');
import Item from '../ContentCmt/Item';
import Loading from '../../../components/Loading';
import TitleCmt from './TitleCmt';
import FastImage from 'react-native-fast-image';
export default function ListRep({ item_, color_____, color______, color__, color_, idRepcmt, noRep, statuscmt, showNumberItem }): any {
    const [listComment, setListComment] = React.useState<any>([])
    const [loading, setloading] = React.useState<boolean>(true)
    const [footerLoading, setFooterLoading] = React.useState(false);
    const [page, setPage] = React.useState<number>(1);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);

    useFocusEffect(
        React.useCallback(() => {
            try {
                GetlistCmtRepCommentManga(page, 15, idRepcmt).then((result) => {
                    if (result.data.status === "success") {
                        setListComment(result.data.data.reply)
                        setloading(false)
                    }
                })
            } catch (error) {
                console.log(error)
            }
            return () => {
                setstatusLoadMore(false)
                setPage(1)
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
                GetlistCmtRepCommentManga(page + 1, 15, idRepcmt).then((result) => {
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
        return (
            <View style={{ paddingVertical: 5 }}>
                <Item {...{ color__, item, idRepcmt, noRep: noRep }}></Item>
            </View>
        )
    }, [])
    const keyExtractor = React.useCallback((item) => item._id.toString(), [])
    return (
        <View style={[styles.container, { backgroundColor: color_____ }]}>
            <TitleCmt {...{ item_, color______, color__ }}></TitleCmt>
            {
                !loading ? listComment.length != 0 ? (
                    <View style={{ flex: 1 }}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={showNumberItem ? listComment.slice(0, showNumberItem) : listComment}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            onEndReached={_onLoadMore}
                            onEndReachedThreshold={1}
                            ListFooterComponent={_renderFooterList}
                            contentContainerStyle={{ padding: 10, flex: 1 }}
                        >
                        </FlatList>
                    </View>
                ) : <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                    <FastImage
                        resizeMode="contain"
                        style={styles.tinyicon}
                        source={icon}></FastImage>
                    <Text style={[{ textAlign: "center", fontFamily: 'Montserrat-Light', }, {
                        color: color__
                    }]}>No Reply</Text>
                </View> : <View style={{ justifyContent: "center", alignItems: 'center', flex: 1 }}>
                    <Loading></Loading>
                </View>

            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tinyicon: {
        width: 180,
        height: 200,
        marginBottom: 10
    },
})
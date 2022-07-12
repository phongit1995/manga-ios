import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { getListByCategorySortViews } from './../../api/comic';
import ItemComic from '../../components/ItemComic';
import Loading from '../../components/Loading';
import {useFocusEffect } from '@react-navigation/native';

const NUMBER_ITEM_PAGE = 12;
const CategoryPage = ({ type, color_, color, color__ }) => {
    const [page, setPage] = useState(1);
    const [listComic, setListComic] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [footerLoading, setFooterLoading] = useState(false);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const result = await getListByCategorySortViews(page, NUMBER_ITEM_PAGE, type)
                if (result.data.code == 200) {
                    if (result.data.data.length != 0) {
                        setListComic(result.data.data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                setListComic([])
            }
        })()
        return () => {
            setLoading(true);
            setListComic([])
        }
    }, [])
    const _onLoadMore = async () => {
        setFooterLoading(true);
        try {
            if (listComic.length >= NUMBER_ITEM_PAGE) {
                const result = await getListByCategorySortViews(page + 1, NUMBER_ITEM_PAGE, type)
                if (result.data.code == 200) {
                    if (result.data.data.length === 0) return setstatusLoadMore(true)
                    setPage(page => page + 1);
                    setListComic([...listComic, ...result.data.data]);
                    setFooterLoading(false);
                }
            } else {
                return setstatusLoadMore(true)
            }
        } catch (error) {
            setListComic([])
        }
    }
    const _onFreshList = () => {
        setLoading(true);
        getListByCategorySortViews(1, NUMBER_ITEM_PAGE, type)
            .then(result => {
                if (result.data.code == 200) {
                    setPage(1);
                    setListComic([...result.data.data]);
                    setLoading(false);
                }
            })
    }

    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }
    return (
        <View style={[styles.container, { backgroundColor: color_ }]}>
            {
                loading ? (
                    <View style={styles.loading}>
                        <Loading />
                    </View>
                ) :
                    <View style={styles.containerItem}>
                        <FlatList
                            data={listComic}
                            keyExtractor={(item, index) => item._id + index}
                            renderItem={({ item, index }) => <ItemComic item={item} index={index} type={3} {...{ color_, color, color__ }} />}
                            onEndReachedThreshold={1}
                            onEndReached={_onLoadMore}
                            showsVerticalScrollIndicator={false}
                            onRefresh={_onFreshList}
                            refreshing={false}
                            contentContainerStyle={{ justifyContent: "space-between", alignItems: "center", marginTop: 10, }}
                            ListFooterComponent={_renderFooterList}
                        />
                    </View>
            }
        </View>
    )
}
export default React.memo(CategoryPage);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
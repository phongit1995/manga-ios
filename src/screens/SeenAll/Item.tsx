import React, { useState, useEffect, FunctionComponent } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { getListTypeCommic } from '../../api/comic';
import ItemComic from '../../components/ItemComic';
import Loading from '../../components/Loading';
import { ItemComicProps } from '../../constants/mangaItem.type'

const NUMBER_ITEM_PAGE = 12;

type ItemProps = {
    type?: number,
    color_: string,
    color: string,
    color__: string
}
type renderItemProps = {
    item: ItemComicProps,
    index: number,

}
const Item: FunctionComponent<ItemProps> = ({ type, color_, color, color__ }) => {
    const [page, setPage] = useState<number>(1);
    const [listComic, setListComic] = useState<ItemComicProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [footerLoading, setFooterLoading] = useState(false);
    const [statusLoadMore, setstatusLoadMore] = React.useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let result = await getListTypeCommic(page, NUMBER_ITEM_PAGE, type)
                if (result.data.code === 200) {
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
                const result = await getListTypeCommic(page + 1, NUMBER_ITEM_PAGE, type)
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
    const _onFreshList = async () => {
        setLoading(true);
        try {
            const result = await getListTypeCommic(1, NUMBER_ITEM_PAGE, type)
            if (result.data.code == 200) {
                setPage(1);
                setListComic([...result.data.data]);
                setLoading(false);
            }
        } catch (error) {
            setListComic([])
        }
    }
    const _renderFooterList = () => {
        if (!footerLoading) return null;
        return !statusLoadMore ? <Loading></Loading> : null
    }
    const renderItem = React.useCallback(({ item, index }: renderItemProps) => <ItemComic item={item} index={index} type={type} {...{ color_, color, color__ }} />, [color_, color, color__])
    const keyExtractor = React.useCallback((item: ItemComicProps) => item._id.toString(), [])

    return (
        <View style={[styles.container, { backgroundColor: color_ }]}>
            {
                loading ?
                    <View style={styles.loading}>
                        <Loading></Loading>
                    </View> :
                    <View style={styles.containerItem}>
                        <FlatList

                            data={listComic}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            onEndReachedThreshold={1}
                            showsVerticalScrollIndicator={false}
                            onEndReached={_onLoadMore}
                            onRefresh={_onFreshList}
                            refreshing={false}
                            contentContainerStyle={{ justifyContent: "space-between", alignItems: "center", marginTop: 10 }}
                            ListFooterComponent={_renderFooterList}
                        />
                    </View>
            }
        </View>
    )
}
export default React.memo(Item);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        justifyContent: "center"
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})
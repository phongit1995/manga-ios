import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Item from './Item';
import * as SCREEN from '../../../constants/ScreenTypes';
import { SCREEN_WIDTH_No } from '../../../constants'
import { ItemComicProps } from '../../../constants/mangaItem.type'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Loading from '../../../components/Loading';
import isEqual from 'react-fast-compare';
import { navigate } from '../../../navigations/NavigationService'
import AdmodService from '../../../firebase/Admod';
type ComicHotProps = {
    listComic: ItemComicProps[],
    loading: boolean,
    type: number,
    color__: string,
    color____: string
}

export type itemProps = {
    item: ItemComicProps,
    type?: number,
    index: number,

}

const ListHot: FunctionComponent<ComicHotProps> = ({ listComic, loading, type, color__, color____ }) => {

    const renderItem = ({ item, index }: itemProps) => <Item {...{ item, index, type, color__, color____ }} ></Item>
    const keyExtractor = React.useCallback((item: ItemComicProps) => item._id.toString(), [])

    const getItemLayout = React.useCallback((_, index: number) => ({
        length: Math.round(SCREEN_WIDTH_No * 0.38),
        offset: (Math.round(SCREEN_WIDTH_No * 0.38)) * index,
        index
    }), [])
    const ShowListNew = () => {
        return (
            <View style={{ flex: 1 }}>
                {
                    loading ?
                        (
                            <View style={styles.loading}>
                                <Loading></Loading>
                            </View>
                        ) :
                        (
                            <FlatList
                                horizontal
                                style={styles.styleFlat}
                                onEndReachedThreshold={1}
                                showsHorizontalScrollIndicator={false}
                                data={listComic}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                getItemLayout={getItemLayout}
                            >
                            </FlatList>
                        )
                }
            </View>
        )
    }
    const onHandlerGotoList = () => {
        AdmodService.showAdsFull(SCREEN.SHOWALL_LIST_SCREEN, { type }, null)
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <Text style={[styles.title, { color: color____ }]}>Top Manga</Text>
                <TouchableOpacity
                    onPress={onHandlerGotoList}
                    style={styles.titleSeenAll}
                >
                    <Text style={{
                        color: color____,
                        left: 7
                    }}>All</Text>
                    <EvilIcons name="chevron-right" color={color____} size={35} style={styles.styleIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerItem}>
                {ShowListNew()}
            </View>
        </View>

    )
}
export default React.memo(ListHot, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerItem: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loading: {
        flex: 1,
        height: Math.round(SCREEN_WIDTH_No * 0.35) + 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontFamily: 'averta_bold',
        fontWeight: 'normal'
    },
    titleSeenAll: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seenAll: {
        fontSize: 14,
        left: 5,
        color: '#000',
        fontFamily: 'averta_bold',
        fontWeight: 'normal'
    },
    styleIcon: {
        marginRight: 10,
    },
    styleFlat: {
        marginLeft: 15
    }
})
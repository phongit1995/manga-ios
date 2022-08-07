import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import * as SCREEN from '../../../constants/ScreenTypes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { SCREEN_WIDTH_No } from '../../../constants'
import { ItemComicProps } from '../../../constants/mangaItem.type'
import Item from './Item';
import Loading from '../../../components/Loading';
import isEqual from 'react-fast-compare';
import ApplovinService from './../../../Applovin/Applovin';

type ComicHotProps = {
    listComicNewChap: ItemComicProps[],
    loading: boolean,
    color__: string,
    color____: string,
}

export type itemProps = {
    item: ItemComicProps,
    type?: number,
    index: number
}
const NUMBERSIZE = 100
const index: FunctionComponent<ComicHotProps> = ({ color__, color____, listComicNewChap, loading }) => {
    const navigation = useNavigation();
    const [_listComicNewChap, setListComicNewChap] = React.useState<Array<ItemComicProps>>([]);
    React.useEffect(() => {
        let listResult: Array<any> = [];
        while (listComicNewChap.length) {
            listResult.push(listComicNewChap.splice(0, 3))
        }
        setListComicNewChap([...listResult])
    }, [listComicNewChap])
    const renderItem = ({ item, index }: itemProps) => <Item {...{ color__, color____ }} item={item} key={item._id}></Item>
    const keyExtractor = React.useCallback((item: ItemComicProps, index) => index.toString(), [])
    const onHandlerGoToList = () => {
        ApplovinService.showAdsFull(SCREEN.SHOWALL_LIST_SCREEN, { type: 1 }, null)
    }
    const ShowList = () => {
        return (
            <View>
                {
                    loading ?
                        (
                            <View style={styles.loading}>
                                <Loading></Loading>
                            </View>
                        ) :
                        <FlatList
                            style={{ flex: 1 }}
                            horizontal
                            decelerationRate="fast"
                            snapToInterval={SCREEN_WIDTH_No - NUMBERSIZE}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={_listComicNewChap}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                        >
                        </FlatList>
                }
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onHandlerGoToList}
                    style={styles.containerSeenAll}
                >
                    <Text style={styles.seenAll}>All</Text>
                    <EvilIcons name="chevron-right" color='#6c757d' size={30} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: color__ }]}>
            <View style={styles.headerTitle}>
                <Text style={[styles.title, { color: color____ }]}>Latest update</Text>

            </View>
            <View style={[styles.containerItem, { backgroundColor: color__ }]}>
                {ShowList()}
            </View>
        </View>

    )
}
export default React.memo(index, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
    },
    containerItem: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginHorizontal: 15,
        borderRadius: 10,
        paddingTop: 10,
        zIndex: 1,
        marginTop: 2
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
        fontFamily: 'Averta-Bold',
        fontWeight: 'normal'
    },
    seenAll: {
        fontSize: 14,
        left: 5,
        color: '#6c757d',
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal'
    },
    containerSeenAll: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    icon: {
        marginRight: 10,
    }
})
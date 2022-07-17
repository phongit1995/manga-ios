import React, { FunctionComponent } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import isEqual from 'react-fast-compare';
import { ItemComicProps } from '../../../constants/mangaItem.type'
import Loading from '../../../components/Loading';
import ItemSuggest from './Item';
type SuggestProps = {
    listComic: ItemComicProps[],
    loading: boolean,
    color__: string,
    color____: string,
}
export type renderItemProps = {
    item: ItemComicProps,
    index: number
}
const SuggestComic: FunctionComponent<SuggestProps> = ({ color__, color____, loading, listComic }) => {

    const renderItem = ({ item, index }: renderItemProps) => <ItemSuggest  {...{  color____, item }}></ItemSuggest>
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
                <Text style={[styles.title, { color: color____ }]}>Suggest For You</Text>
            </View>
            <View style={styles.containerItem}>
                {loading ?
                    <View style={styles.loadingItem}>
                        <Loading />
                    </View> :
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={listComic}
                            style={{ flex: 1, marginLeft: 15, }}
                            horizontal
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString() + "adwdw"}
                        />
                    </View>
                }

            </View>
        </View>
    )
}
export default React.memo(SuggestComic, isEqual);
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flex: 1,
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
    containerItem: {
        flex: 1
    },
    loadingItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',

    },
    nameComic: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        fontWeight: 'normal',
        paddingBottom: 5
    },
    normal: {
        fontWeight: 'normal',
        color: '#5c6b73',
        backgroundColor: '#f1f4eb',
        paddingVertical: 5,
        fontSize: 11,
        paddingHorizontal: 5,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 5,
    },
    nameChap: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73'
    },
    AuthorComic: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73',
        marginLeft: 5,
    },
})
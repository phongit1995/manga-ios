import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, FlatList } from "react-native";
import isEqual from 'react-fast-compare';

import { ItemComicProps } from '../../../constants/mangaItem.type'
import Loading from '../../../components/Loading';
import Item from './Item'

type categoryItemProps = {
    _id: string,
    name: string,
    image: string
}
type categoryProps = {
    color____: string,
    listCategory: any,
    loading: boolean,
}
type renderItemProps = {
    item: categoryItemProps,
}
const Category: FunctionComponent<categoryProps> = (({ color____, listCategory, loading }) => {
    const [listCategory_, setlistCategory] = React.useState<Array<ItemComicProps>>([]);



    React.useEffect(() => {
        let listResult: Array<any> = [];
        while (listCategory.slice(5).length) {
            listResult.push(listCategory.splice(0, 2))
        }
        setlistCategory([...listResult])
    }, [listCategory])

    const renderItem = ({ item }: renderItemProps) => <Item  {...{ item }} ></Item>
    const keyExtractor = React.useCallback((_, index: number) => index.toString(), [])

    const showList = () => {
        return (
            <View>
                {
                    loading ?
                        (
                            <View style={styles.containerLoading}>
                                <Loading></Loading>
                            </View>
                        ) : (
                            listCategory_.length != 0 ?
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                    style={styles.containerFlat}
                                    data={listCategory_}
                                    renderItem={renderItem}
                                    keyExtractor={keyExtractor}
                                >
                                </FlatList>
                                : null
                        )
                }
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: color____ }]}>Categories</Text>
            {showList()}
        </View>
    );
})
export default React.memo(Category, isEqual)
const styles = StyleSheet.create({
    container: {
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        fontFamily: 'averta_bold',
        fontWeight: 'normal',
        marginBottom: 5,
        marginLeft: 15,
    },
    txt: {
        paddingTop: 2,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'averta_bold',
    },
    containerFlat: {
        marginLeft: 15
    },
    containerLoading: { height: 100, justifyContent: 'center', alignItems: 'center' }
})

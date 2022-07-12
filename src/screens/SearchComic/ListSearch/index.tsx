import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, View, FlatList } from "react-native";
import Loading from '../../../components/Loading';
import NetWork from '../../../components/NetWork';
import { ItemComicProps } from '../../../constants/mangaItem.type'
import Item from './Item'
type ListSearchProps = {
    loading: boolean,
    network: boolean,
    listComic: ItemComicProps[],
    color__:string,
    color:string
}
const ListSearch: FunctionComponent<ListSearchProps> = ({ loading, network, listComic,color__,color }) => {
    return (
        <View style={styles.container}>
            {loading ?
                <View style={{ flex: 1, paddingTop: 15 }}>
                    <Loading></Loading>
                </View> :
                <View style={{ flex: 1 }}>
                    {
                        !network ? (
                            <NetWork></NetWork>
                        ) : (
                                listComic.length === 0 ?
                                    <View>
                                        <Text style={[{ textAlign: "center", fontFamily: 'Nunito-Bold' },{color:color}]}>No search results</Text>
                                    </View>
                                    :
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        data={listComic}
                                        keyExtractor={(item, index) => item._id + index}
                                        renderItem={({ item }) => <Item data={item} {...{color__,color}}/>}
                                        onEndReachedThreshold={10}
                                    />)
                    }
                </View>
            }
        </View>
    );
}
export default React.memo(ListSearch, isEqual)
const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        flex: 1,
        paddingTop: 10
    }
})
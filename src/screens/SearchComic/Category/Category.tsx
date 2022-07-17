import React from 'react'
import { StyleSheet, Text, View } from "react-native";

import Loading from '../../../components/Loading';
import Item from './Item';


export default React.memo(({ listCategory, loading, color }: any) => {

    const showItem = () => listCategory.map((item, index) => {
        return <Item item={item} key={index}></Item>
    })
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color }]}>Categories</Text>
            <View style={styles.contain}>
                {loading ? <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Loading></Loading>
                </View> : showItem()}
            </View>
        </View>
    );
})

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Averta-Bold',
        fontWeight: 'normal',
    },
    contain: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginVertical: 10
    }
})

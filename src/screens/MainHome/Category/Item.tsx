import React, { FunctionComponent } from 'react'
import {  StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import * as screen from '../../../constants/ScreenTypes';
import AdmodService from '../../../firebase/Admod';
import FastImage from 'react-native-fast-image';
type itemCategoryProps = {
    image: string,
    name: string
}
type ItemProps = {
    item: itemCategoryProps | any,
}
const Item: FunctionComponent<ItemProps> = ({ item }) => {
    const navigation = useNavigation();

    const onHandlerGotoCategory = (i: itemCategoryProps) => {
        AdmodService.showAdsFull(screen.CATEGORY_SCREEN, { key: i.name },null)
    }
    const showCategory = () => {
        return item.map((item: itemCategoryProps, index: number) => {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => onHandlerGotoCategory(item)}
                    style={styles.container}
                    activeOpacity={0.7}>
                    <View
                        style={styles.contaiWrapper}>
                        <FastImage source={{
                            uri: item.image
                        }} style={styles.imgIcon}></FastImage>
                    </View>
                    <Text style={[styles.txt]}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }
    return (
        <View>
            { showCategory()}
        </View>
    );
}
export default React.memo(Item, isEqual)
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        marginRight: 10,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    contaiWrapper: {
        width: 30,
        height: 30,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#489dcf',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 1,
        marginVertical: 5,
        marginRight: 5,
        borderRadius: 200,
    },
    imgIcon: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        borderRadius: 200
    },
    txt: {
        paddingTop: 2,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#000'
    }
})

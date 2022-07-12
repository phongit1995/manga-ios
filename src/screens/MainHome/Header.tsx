import React, { FunctionComponent } from 'react'
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import * as screen from '../../constants/ScreenTypes'
import AdmodService from './../../firebase/Admod';
export const iconSearch = require('../../assets/image/search1.png');
const Header: FunctionComponent = () => {
    const navigation = useNavigation<any>();
    function onHandlerGoToSearch() {
        AdmodService.showAdsFull(screen.SEARCH_SCREEN, null, null);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.contaiSearch}
                onPress={onHandlerGoToSearch}
            >
                <View style={styles.containerInput}>
                    <Text style={styles.txt}>Search manga etc</Text>
                    <Image
                        resizeMode="contain"
                        style={styles.tiny}
                        source={iconSearch}></Image>
                </View>
            </TouchableOpacity>
        </View>
    );
}
export default React.memo(Header, isEqual)
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        width: '100%',
        zIndex: 99,
    },
    tinyLogo: {
        width: 45,
        height: 45,
        resizeMode: 'contain'
    },
    contaiSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        marginVertical: 10,
        borderRadius: 25,

    },
    tiny: {
        width: 20,
        height: 20
    },
    containerInput: {
        flex: 1, padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25,
    },
    txt: {
        color: '#b9b9bb',
        fontSize: 15,
        fontFamily: 'Montserrat-Light',
    }
})
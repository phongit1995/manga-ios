import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Screen from '../../constants/ScreenTypes'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import ApplovinService from './../../Applovin/Applovin';
type HeaderProps = {
    type?: number,
    color____: string,
    color_: string
}
const Header: FunctionComponent<HeaderProps> = ({ type, color____, color_ }) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.headerContainer, { backgroundColor: color_ }]}>
            <TouchableOpacity style={styles.iconback} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={color____} />
            </TouchableOpacity>
            <Text style={[styles.txt, { color: color____ }]}>{
                type === 0 ? 'Top Manga' : 'New Manga'
            }</Text>
            <TouchableOpacity style={styles.iconback}
                onPress={() => {
                    ApplovinService.showAdsFull(Screen.SEARCH_SCREEN,null,null);
                }}
            >
                <AntDesign name="search1" size={25} color={color____} />
            </TouchableOpacity>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: STATUS_BAR_HEIGHT + 15,
        backgroundColor: '#ff4545',
        justifyContent: 'space-between',
        elevation:2
    },
    iconback: {

    },
    txt: {
        fontSize: 22,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',
        color: '#fff'
    }
})
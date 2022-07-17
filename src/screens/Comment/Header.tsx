import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from './../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Screen from '../../constants/ScreenTypes'
const Header: FunctionComponent<any> = ({ isDark, color__, color_, colorBorder, children }) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.headerContainer, { backgroundColor: isDark ? '#111217' : "#fff" }]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={isDark ? '#fff' : "#111217"} />
            </TouchableOpacity>
            <Text style={[styles.txt, { color: isDark ? '#fff' : "#111217", fontSize: 18, fontFamily: 'Averta-Bold', }]}>{children}</Text>
            <View

            >
                {/* <AntDesign name="search1" size={25} color="#000" /> */}
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingTop: STATUS_BAR_HEIGHT + 15,
        backgroundColor: '#ff4545',
        justifyContent: 'space-between',


    },
    txt: {
        fontSize: 22,
        fontFamily: 'Nunito-Bold',

        color: '#fff'
    }
})
import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Screen from '../../../constants/ScreenTypes'
const Header: FunctionComponent<any> = ({ colorBorder, color__, color_,isDark }) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.headerContainer, { backgroundColor: isDark ? '#111217' : "#fff" }]}>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={isDark ? '#fff' : "#111217"} />
            </TouchableOpacity>
            <View >
                <Text style={[styles.txt, {color: isDark ? '#fff' : "#111217", fontSize: 18,    fontFamily: 'Averta-Bold', }]}>Reply Comment</Text>
            </View>
            <View
                // onPress={() => navigation.navigate(Screen.SEARCH_SCREEN)}
                style={{ opacity: 0 }}
            >
                <AntDesign name="search1" size={25} color={color__} />
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
        paddingVertical: 15,
        paddingTop: STATUS_BAR_HEIGHT + 15,
        backgroundColor: '#ff4545',
        justifyContent: 'space-between',
    },
    txt: {
        fontSize: 22,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',
        color: '#fff'
    }
})
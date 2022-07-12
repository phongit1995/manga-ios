import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from './../../constants';

const Header: FunctionComponent<any> = ({ color_, color______ }) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.headerContainer, { backgroundColor: color_, }]}>
            <Text style={[styles.txt, { color: color______ }]}>Community</Text>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: STATUS_BAR_HEIGHT + 10,
        backgroundColor: '#ff4545',
        justifyContent: 'center',
        elevation:2
    },
    txt: {
        fontSize: 22,
        fontFamily: 'averta_bold',
        fontWeight: 'normal',
        color: '#fff'
    }
})
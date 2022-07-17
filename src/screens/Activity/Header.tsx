import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from './../../constants';
const Header = ({ color___, color____ }: any) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.headerContainer, { backgroundColor: color___ }]}>
            {/* <Text style={{ fontSize: 22, fontFamily: 'Averta-Bold',color:color____ }}>Story Cabinets</Text> */}

        </View >
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: STATUS_BAR_HEIGHT ,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
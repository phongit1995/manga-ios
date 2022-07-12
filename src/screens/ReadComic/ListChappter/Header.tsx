import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from '../../../constants';
import * as Screen from '../../../constants/ScreenTypes'
const Header: FunctionComponent<any> = ({color____,color___}) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.headerContainer,{backgroundColor:color___}]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={color____} />
            </TouchableOpacity>
            <View >
                <Text style={{ fontSize: 22, fontFamily: 'averta', color: color____ }}>Chapter</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(Screen.SEARCH_SCREEN)
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
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 15,
        paddingTop: STATUS_BAR_HEIGHT + 15,
        elevation:2
    }
})
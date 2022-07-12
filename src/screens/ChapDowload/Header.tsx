import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Screen from '../../constants/ScreenTypes'
import { useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import { color } from 'react-native-reanimated';
type HeaderProps = {
    nameChap: string,
    color: string
}

const Header: FunctionComponent<HeaderProps> = ({ nameChap, color }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                activeOpacity={0.7}
                style={[styles.iconback, { width: '10%' }]} onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={25} color={color} />
            </TouchableOpacity>
            <View style={{ width: '80%', }}>
                <Text numberOfLines={1} style={[styles.txt, { color }]}>{nameChap}</Text>
            </View>
            <View style={{ width: '10%', }}>

            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingTop: STATUS_BAR_HEIGHT + 10,
        // backgroundColor: '#ff4545',
        justifyContent: 'space-between',
    },
    iconback: {

    },
    txt: {
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',
        color: '#000'
    }
})
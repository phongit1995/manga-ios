import React, { FunctionComponent } from 'react';
import {View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons'
import { STATUS_BAR_HEIGHT } from '../../constants';
import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';
export const iconBack = require('../../assets/image/ic_left-arrow-white.png');
import {paddingBottom} from "../../constants";
type headerProps = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
}
const NUMBERHEIGHT = 55 + STATUS_BAR_HEIGHT
const Header: FunctionComponent<headerProps> = ({ setModalVisible }) => {
    const navigation = useNavigation();
    return (
        <View style={{
            height: NUMBERHEIGHT,
            backgroundColor: '#ad772d',
        }}>
            <View
                style={[styles.headerContainer, {
                    backgroundColor: 'transparent',
                }]}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}

                >
                    <FastImage source={iconBack} style={styles.imgIcon}></FastImage>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setModalVisible(true)}
                >
                    <Octicons name="report" size={30} color="#fff" ></Octicons>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default React.memo(Header, isEqual);

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingTop: 18,
        flex: 1,
        // height: 70,
        backgroundColor: '#A46329',
    },
    imgIcon: {
        width: 23,
        height: 23,
        resizeMode: 'contain',

    }
})

import React from 'react'
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import { STATUS_BAR_HEIGHT } from '../../constants'
export default ({color___}) => {
    return (
        <View style={[styles.container]}>
            {/* <Text style={styles.txt}>Search</Text> */}
        </View>

    );
}


const styles = StyleSheet.create({
    container: {

        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingTop: STATUS_BAR_HEIGHT + 10,
    },
    txt: {
        fontSize: 25,
        fontFamily: 'Averta-Bold',
        fontWeight: 'normal',
        color: '#fff'
    }
})
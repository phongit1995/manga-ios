import React, { FunctionComponent } from 'react';
import { View,  StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT } from '../../constants'
import { useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
type footerprops = {
    translateYFooter: any,
    _setModalVisible: (e: boolean) => void
}
const Footer: FunctionComponent<footerprops> = ({ translateYFooter, _setModalVisible }) => {
    return (

        <Animated.View style={[styles.Footer, {
            transform: [
                { translateY: translateYFooter }
            ]
        }]}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
               
                <View>
                    <TouchableOpacity
                        onPress={() => _setModalVisible(true)}
                    >
                        <Ionicons name="settings-outline" size={25} color={"#ffffff"} />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>

    );

}
export default React.memo(Footer, isEqual)
const styles = StyleSheet.create({
    endchap: {
        textAlign: 'center'
    },
    Footer: {
        width: '100%',
        position: "absolute",
        bottom: 0,
        left: 0,
        height: SCREEN_HEIGHT / 13,
        paddingHorizontal: 20,
        elevation: 6,
        backgroundColor: '#404042',
        justifyContent: "center",
        opacity: 0.8,
        zIndex: 10,

    },
    textChapter: {
        fontSize: 14,
        color: "#b8b4b4"
    },
    listchap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tinyiconLeft: {
        width: 30,
        height: 30,
    },
})

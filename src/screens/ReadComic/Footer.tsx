import React, {FunctionComponent, useImperativeHandle, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT } from '../../constants'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import * as SCREEN from './../../constants/ScreenTypes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
export const iconlist = require('../../assets/image/comic.png');
import Orientation from 'react-native-orientation';
import SQLHelper from '../../common/SQLHelper';
import { getDetailChapter } from '../../api/comic';
import AdmodService from './../../firebase/Admod';
import FastImage from 'react-native-fast-image';
type footerprops = {
    dataTotleChap: number,
    id: string,
    idChap: string,
    translateYFooter: any,
    beforeChapter?: string | null,
    afterChapter?: string | null,
    _setModalVisible: (e: boolean) => void,
    name: string | null,
    indexChap: number,
    page: number,
}
const Footer: FunctionComponent<footerprops> = React.forwardRef(({ page, indexChap, dataTotleChap, name, id, idChap, translateYFooter, beforeChapter, afterChapter, _setModalVisible }, ref) => {

    const navigation = useNavigation<any>();
    const [isAlwaysShow, setAlwaysShow] = useState(false);
    function handleChangeShow(status) {
        setAlwaysShow(status === undefined ? true : status);
    }

    useImperativeHandle(ref, () => ({
        handleChangeShow
    }), [])

    const onHandlerAfterChap = async () => {
        try {
            AdmodService.showAdsFull(SCREEN.DETIAL_CHAPTER, { id: afterChapter, idChap: idChap, dataTotleChap, indexChap: indexChap + 1, page: 20 * page < (indexChap + 1) ? page + 1 : page  },'replace');
        } catch (error) {

        }
    }

    const onHandlerBeforerChap = async () => {
        try {
            AdmodService.showAdsFull(SCREEN.DETIAL_CHAPTER, { id: beforeChapter, idChap: idChap, dataTotleChap, indexChap: indexChap - 1, page: (20 * page) - 20 >= (indexChap - 1) ? page - 1 : page },'replace');
        } catch (error) {

        }
    }
    return (

        <Animated.View style={[styles.Footer, !isAlwaysShow && {
            transform: [
                { translateY: translateYFooter }
            ]
        }]}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View >
                    {beforeChapter != null ?
                        <TouchableOpacity onPress={() => onHandlerBeforerChap()} style={{

                            paddingHorizontal: 20,
                            flexDirection: "row", justifyContent: "center", alignItems: "center"
                        }}>
                            <FontAwesome5 name={"angle-left"} size={35} color={"#ffffff"} />
                        </TouchableOpacity> : null
                    }
                </View>
                <View >
                    <TouchableOpacity
                        onPress={() => {
                            AdmodService.showAdsFull(SCREEN.CHAPTER_LIST_SCREEN, { id: idChap, idcomic: id, dataTotleChap },null);
                        }}
                        style={styles.listchap}
                    >
                        <FastImage
                            resizeMode="contain"
                            style={styles.tinyiconLeft}
                            source={iconlist}></FastImage>
                        <Text style={{ color: '#fff', fontFamily: 'Nunito-Bold', }}> Chapter</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => _setModalVisible(true)}
                    >
                        <Ionicons name="settings-outline" size={25} color={"#ffffff"} />
                    </TouchableOpacity>
                </View>
                <View >
                    {afterChapter != null ?
                        <TouchableOpacity
                            onPress={() => onHandlerAfterChap()}
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 20,
                            }}>
                            <FontAwesome5 name={"angle-right"} size={35} color={"#ffffff"} />
                        </TouchableOpacity> : null
                    }
                </View>
            </View>
        </Animated.View>

    );

});
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
        height: SCREEN_HEIGHT / 15,
        paddingHorizontal: 20,
        elevation: 6,
        backgroundColor: '#777777',
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

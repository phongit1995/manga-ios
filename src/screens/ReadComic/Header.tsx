import React, {FunctionComponent, useImperativeHandle, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Image } from 'react-native';
import { STATUS_BAR_HEIGHT, SCREEN_HEIGHT } from '../../constants'
import { useNavigation } from '@react-navigation/native';
export const iconquestion = require('../../assets/image/information.png');
export const iconBack = require('../../assets/image/ic_left-arrow-white.png');
import isEqual from 'react-fast-compare';
type headerProps = {
    translateY: any,
    name: string | null,
    setShowTutorial: any
}

const Header: FunctionComponent<headerProps> = React.forwardRef(({ translateY, name, setShowTutorial }, ref) => {
    const navigation = useNavigation<any>();
    const [page, setPage] = useState({
        page: '--',
        totalPage: '--',
    })
    const [isAlwaysShow, setAlwaysShow] = useState(false);

    useImperativeHandle(ref, () => ({
        handleChangePage,
        handleChangeShow
    }), [])
    function handleChangePage(_page){
        setPage(_page);
    }

    function handleChangeShow(status) {
        setAlwaysShow(status === undefined ? true : status);
    }
    const onHandlerShow = () => {
        setShowTutorial(true)

    }
    return (

        <Animated.View style={[styles.Header, !isAlwaysShow ? {
            transform: [
                { translateY: translateY }
            ]
        } : {}]}>
            <TouchableOpacity
                onPress={() => {

                    navigation.goBack()
                }}
            >
                <Image source={iconBack} style={styles.imgIcon}></Image>

            </TouchableOpacity>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <TouchableOpacity
                onPress={onHandlerShow}
            >
                <Image source={iconquestion} style={styles.imgIcon}></Image>
            </TouchableOpacity>
            <View style={styles.page}>
                <Text style={styles.pageNow}>{page.page}/{page.totalPage}</Text>
            </View>
        </Animated.View>

    );

})
export default React.memo(Header, isEqual)
const styles = StyleSheet.create({
    Header: {
        position: "absolute",
        top: 0,
        left: 0,
        elevation: 1,
        width: '100%',
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "center",
        height: SCREEN_HEIGHT / 9.5,
        alignItems: 'center',

        backgroundColor: '#777777',
        paddingTop: 15,
        zIndex: 12,
    },

    name: {
        textTransform: 'uppercase',
        fontSize: 13,
        flex: 1,
        textAlign: "center",
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        marginHorizontal: 10,
    },
    imgIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',

    },
    page: {
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
    },
    pageNow: {
        textTransform: 'uppercase',
        fontSize: 13,
        flex: 1,
        textAlign: "center",
        fontFamily: 'Nunito-Bold',
        color: '#fff',
        marginHorizontal: 10
    }
})

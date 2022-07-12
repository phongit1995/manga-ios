import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as screen from '../../../constants/ScreenTypes';
import moment from 'moment'
import AdmodService from '../../../firebase/Admod';
import FastImage from 'react-native-fast-image';
export default function Item({ color__, item, idRepcmt, noRep }) {
    const navigation = useNavigation();

    const onHandlerGotoRep = () => {
        AdmodService.showAdsFull(screen.REP_COMMENT_SCREEN, { idRepcmt: idRepcmt ? idRepcmt : item?._id, item_: item }, null);
    }


    return (
        <View style={styles.InforUserCmt}>
            <View style={styles.containerLeft}>
                <FastImage
                    source={{ uri: item?.user ? item.user.avatar : 'https://vuecidity.wemakesites.net/static/images/avatar-01.png' }}
                    resizeMode='cover'
                    style={styles.img}></FastImage>
            </View>
            <View style={styles.containerRight}>
                <View style={styles.contentCmt}>
                    <Text style={[styles.name, {}]}>{item?.user ? item?.user?.name : ''}</Text>
                    <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 14 }}>{item?.message ? item?.message : ''}</Text>
                </View>
                <View style={styles.Actiontime}>
                    <Text style={[styles.txtDate, { color: color__ }]}>{item?.createdAt ? moment(item?.createdAt).format("DD-MM-yy H:mm") : ''}</Text>
                    {
                        noRep === 1 ? (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => onHandlerGotoRep()}
                            >
                                <Text style={[styles.txtRep, { color: color__ }]}>Reply(<Text style={{ color: '#d34150' }}>{item ? item?.replyCount : ''}</Text>)</Text>
                            </TouchableOpacity>
                        ) : null
                    }

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 55,
        height: 55,
        borderRadius: 100,
    },
    InforUserCmt: {
        flexDirection: 'row',

    },
    name: {
        fontFamily: 'Nunito-Bold',
    },
    containerLeft: {
        width: 55,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        backgroundColor: '#fff',
        height: 55,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerRight: {

        flex: 1,
        marginLeft: 10
    },
    contentCmt: {
        backgroundColor: '#fff',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        borderRadius: 10,
        marginVertical: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 2
    },
    Actiontime: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    txtDate: {
        fontFamily: 'Montserrat-Light',
        fontSize: 13
    },
    txtRep: {
        marginHorizontal: 10,
        fontFamily: 'Montserrat-Light',
    },
    replycmt: {
        marginLeft: '15%',
        marginVertical: 10
    }
})
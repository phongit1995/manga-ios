import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as screen from '../../../constants/ScreenTypes';
import moment from 'moment'
import FastImage from 'react-native-fast-image';
export default function TitleCmt({ item_, color______, color__ }) {
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: color______ }]}>
            <View style={styles.InforUserCmt}>
                <View style={styles.containerLeft}>
                    <FastImage
                        source={{ uri: item_?.user ? item_.user.avatar : 'https://vuecidity.wemakesites.net/static/images/avatar-01.png' }}
                        resizeMode='cover'
                        style={styles.img}></FastImage>
                </View>
                <View style={styles.containerRight}>
                    <View style={styles.contentCmt}>
                        <Text style={[styles.name, {}]}>{item_?.user ? item_?.user?.name : ''}</Text>

                        <Text style={[styles.txtMess, { color: '#000' }]}>{item_ ? item_?.message : ''}</Text>

                        <View style={{ alignItems: 'flex-end' }}>
                            {
                                <Text style={[styles.txtDate, { color: '#000' }]}>{item_ ? moment(item_?.createdAt).format("DD-MM-yy H:mm") : ''}</Text>
                            }

                        </View>
                    </View>
                </View>
            </View>
            {
                item_?.manga && item_?.manga?.name ? (
                    <View>
                        <View
                            style={styles.ContainComic}>
                            <View style={styles.ContainComicLeft}>
                                <FastImage
                                    source={{ uri: item_?.manga?.image }}
                                    resizeMode='cover'
                                    style={styles.img1}></FastImage>
                            </View>
                            <View style={styles.ContainComicRight}>
                                <Text style={[styles.name, {}]}>{item_?.manga ? item_?.manga?.name : ''}</Text>
                                <Text style={[styles.txtDate, {}]}>{item_?.manga ? item_?.manga?.author?.split(/\n/) : ''}</Text>
                            </View>
                        </View>
                        <View style={styles.Actiontime}>
                            <Text style={[styles.txtRep, { color: color__ }]}>Reply(<Text style={{ color: '#d34150' }}>{item_ ? item_?.replyCount : ''}</Text>)</Text>
                        </View>
                    </View>

                ) : null
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {

        paddingHorizontal: 10,

        backgroundColor: '#fff',
        paddingVertical: 10,
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    img1: {
        width: 55,
        height: 55,
        borderRadius: 10,
    },
    InforUserCmt: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',

    },
    name: {
        fontFamily: 'Nunito-Bold',
    },
    containerLeft: {
        width: 52,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
        backgroundColor: '#fff',
        height: 52,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerRight: {

        flex: 1,
        marginLeft: 10
    },
    contentCmt: {
        backgroundColor: '#e6e5eb',
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
        justifyContent: 'flex-end'
    },
    txtDate: {
        fontFamily: 'Montserrat-Light',
        color: '#000',
        fontSize: 13
    },
    txtRep: {
        marginHorizontal: 10,
        fontFamily: 'Montserrat-Light',
    },
    replycmt: {
        marginLeft: '15%',
        marginVertical: 10
    },
    mess: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    txtMess: {
        fontFamily: 'Montserrat-Light',
        fontSize: 14,

    },
    ContainComic: {
        flexDirection: 'row',
        backgroundColor: '#e6e5eb',
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        alignItems: 'center',
        width: '100%',

        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    ContainComicLeft: {

    },
    ContainComicRight: {

        paddingHorizontal: 10

    }
})
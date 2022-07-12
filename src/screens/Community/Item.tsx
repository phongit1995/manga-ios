import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as screen from './../../constants/ScreenTypes';
import moment from 'moment'
import AdmodService from './../../firebase/Admod';
export default function Item({ color__, item, color_____ }) {
    const navigation = useNavigation();

    const onHandlergoToComent = () => {
        AdmodService.showAdsFull(screen.REP_COMMENT_SCREEN, { item_: item, idRepcmt: item._id },null)
    }
    const onHandlergoToManga = () => {
        AdmodService.showAdsFull(screen.DETIAL_COMIC_SCREEN, { id: item.manga._id },null)
    }
    const withPadding = (duration) => {
        if (duration.asDays() > 0) {
            return 'at least one day';
        } else {
            return [
                ('0' + duration.hours()).slice(-2),
                ('0' + duration.minutes()).slice(-2),
                ('0' + duration.seconds()).slice(-2),
            ].join(':')
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: color_____ }]}>
            <View style={styles.InforUserCmt}>
                <View style={styles.containerLeft}>
                    <Image
                        source={{ uri: item?.user ? item?.user?.avatar : 'https://vuecidity.wemakesites.net/static/images/avatar-01.png' }}
                        resizeMode='cover'
                        style={styles.img}></Image>
                </View>
                <View style={styles.containerRight}>
                    <View style={styles.contentCmt}>
                        <Text style={[styles.name, {}]}>{item?.user ? item?.user?.name : ''}</Text>

                        <Text style={[styles.txtMess, { color: '#000' }]}>{item?.message ? item?.message : ''}</Text>

                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={[styles.txtDate, { color: '#000' }]}>{item ? moment(item?.createdAt).format("DD-MM-yy H:mm") : ''}</Text>

                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>{
                    onHandlergoToManga()
                }}
                style={styles.ContainComic}>
                <View style={styles.ContainComicLeft}>
                    {
                        item?.manga ? (
                            <Image
                                source={{ uri: item?.manga?.image }}
                                resizeMode='cover'
                                style={styles.img1}></Image>
                        ) : null
                    }

                </View>
                <View style={styles.ContainComicRight}>
                    <Text style={[styles.name, {}]}>{item?.manga ? item?.manga?.name : ''}</Text>
                    <Text style={[styles.txtDate, {}]}>{item?.manga ? item.manga?.author?.split(/\n/) : ''}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.Actiontime}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        onHandlergoToComent()
             
                    }}
                >
                    <Text style={[styles.txtRep, { color: color__ }]}>Reply(<Text style={{ color: '#d34150' }}>{item ? item?.replyCount : ''}</Text>)</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 10,
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
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    InforUserCmt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontFamily: 'averta_bold',
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
        marginLeft: 5
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
        fontSize: 12
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
        fontSize: 15,

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

        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    ContainComicLeft: {
        // width: '20%'
    },
    ContainComicRight: {
        // width: '80%',
        paddingHorizontal: 10,
        flex: 1,


    }
})
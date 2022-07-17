import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Share } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../constants'
import { getBundleId } from 'react-native-device-info';
import { formatViews } from '../../common/stringHelper'
import * as SCREEN from '../../constants/ScreenTypes'
import { ItemComicProps } from '../../constants/mangaItem.type'
import AdmodService from './../../firebase/Admod';
import FastImage from 'react-native-fast-image';
type DetailComicProps = {
    idcomic?: string,
    _id: string,
    item: ItemComicProps,
    isFollow: boolean,
    setHeight: (e: number) => void,
    setwWidth: (e: number) => void,
    idchapred: any,
    nameChap: any,
    dataTotleChap: number,
    color__: string
}
const InformationComic: FunctionComponent<DetailComicProps> = ({ color__, setwWidth, setHeight, item }) => {
    const navigation = useNavigation();

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `Read ${item.name} with me https://play.google.com/store/apps/details?id=${getBundleId()}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.log(error)
        }
    };
    const onHandlergoToComent = () => {
        AdmodService.showAdsFull(SCREEN.COMMENT_SCREEN, { name: item?.name, idManga: item?._id }, null)
    }

    return (
        <View style={[styles.conatiner, { backgroundColor: color__ }]}>
            <View style={[styles.conatiner]}>
                <View
                    onLayout={(event) => {
                        var { height } = event.nativeEvent.layout;
                        setHeight(height)
                    }}
                    style={styles.container_}>
                    <View style={styles.containerImage}>
                        <FastImage source={{
                            uri: item?.image, headers: {
                                Referer: "https://manganelo.com/"
                            }
                        }}
                            style={styles.img} />
                    </View>
                    <Text
                        onLayout={(event) => {
                            var { height } = event.nativeEvent.layout;
                            setwWidth(height)
                        }}
                        style={[styles.nameComic, { color: '#fff' }]}>{item?.name}</Text>
                </View>
                <View style={styles.contai}>
                    <Text style={[styles.nameAuthor, { color: '#fff' }]}>{item?.author?.split(/\n/)}</Text>
                    <View style={[styles.conatinerInfor]}>
                        <View style={[styles.itemInfor]}>
                            <Text style={[styles.txtTitle]}>Status</Text>
                            <Text style={[styles.txt]}>{item?.manga_status === 0 ? 'Continue' : 'Full'}</Text>
                        </View>
                        <View style={[styles.itemInfor, { marginHorizontal: 20 }]}>
                            <Text style={[styles.txtTitle]}>Language</Text>
                            <Text style={[styles.txt]}>ENG</Text>
                        </View>
                        <View style={[styles.itemInfor]}>
                            <Text style={[styles.txtTitle]}>Views</Text>
                            <Text style={[styles.txt]}>{formatViews(item?.views)}</Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <View style={styles.containerBtn}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => onShare()}
                        style={[styles.btn, { borderRightWidth: 1, borderRightColor: '#fff' }]}>
                        <AntDesign name="sharealt" size={20} color='#fff' ></AntDesign>
                        <Text style={[styles.txt, { paddingLeft: 10 }]}>SHARE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onHandlergoToComent()}
                        activeOpacity={0.7}
                        style={[styles.btn, {}]}>

                        <AntDesign name="message1" size={20} color='#fff'></AntDesign>
                        <Text style={[styles.txt, { color: '#fff', paddingLeft: 10 }]}>COMMENT</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default InformationComic;
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#ad772d'
    },
    container_: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
        zIndex: 1,

    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 1.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 15,
    },

    img: {
        width: "100%",
        height: "100%",
        borderRadius: 15,

    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 200,
        backgroundColor: '#F92C2C',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },
    contai: {
        width: '100%',

    },
    nameAuthor: {
        color: '#000',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'center',
        fontFamily: 'Montserrat-Light',
    },
    status: {
        color: '#1fcf84',
        fontSize: 15,
        fontFamily: 'Averta-Bold',
    },
    category: {
        color: '#000',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',
        color: '#5c6b73',
        fontSize: 13,
        fontFamily: 'Montserrat-Light',
        marginLeft: 5
    },
    nameComic: {
        color: '#000',
        fontSize: 22,
        textAlign: 'center',
        marginTop: 10,
        marginHorizontal: 10,
        fontFamily: 'Averta-Bold',
    },
    conatinerInfor: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
    },
    itemInfor: {
        alignItems: 'center'
    },
    txtTitle: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Averta-Bold',
    },
    txt: {
        color: '#fff',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'averta',
        marginTop: 5
    },
    containerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: -25,
        borderRadius: 15,
        backgroundColor: '#272536',
        width: 300,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    btn: {
        width: 150,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

        paddingVertical: 5

    },

})

import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes'
import { SCREEN_WIDTH_No } from '../../../constants';
import RNFetchBlob from 'rn-fetch-blob'
import SqlHelper from '../../../common/SQLHelper';
import { getDetailChapter } from '../../../api/comic'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PermissonRequiredDowload } from './../../../common/PermissionRequired';
import { useDispatch, useSelector } from 'react-redux'
export const iconDowload = require('../../../assets/image/cloud-download.png')
import AdmodService from '../../../firebase/Admod';
import * as RNFS from 'react-native-fs';
import FastImage from 'react-native-fast-image';
type itemChapProps = {
    listChapRead: any,
    __id: string,
    item: any,
    _item: any,
    dataTotleChap: number,
    id_: string,
    color__: string,
    listChapDown: any,
    index_: number,
    page: number,
    count: number,
    setCount: any,
    isPremium: boolean,
    color________: string
}
const { config, fs } = RNFetchBlob;
let PictureDir = fs.dirs.PictureDir;
const Item: FunctionComponent<itemChapProps> = ({ color________, isPremium, count, setCount, page, index_, listChapDown, listChapRead, __id, _item, item, dataTotleChap, id_, color__ }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [isdowload, setDowload] = React.useState<boolean>(false)
    const [isRead, setisRead] = React.useState<boolean>(false)
    const [loading, setloading] = React.useState<any>(false)

    React.useEffect(() => {
        let isMounted = true;
        (() => {
            if (listChapRead.length != 0 && isMounted) {
                if (listChapRead[0].chapter_id === item._id) {
                    setisRead(true)
                }
            }
        })()
        return () => {
            setisRead(false)
            isMounted = false;
        }
    }, [listChapRead])
 
    React.useEffect(() => {
        let isMounted = true;
        if (listChapDown.length != 0 && isMounted) {
            let index_ = listChapDown.findIndex((e) => e?.idchap === item._id && e.status != 0)
            if (index_ != -1) {
                setDowload(true)
            }
        }
        return () => {
            setDowload(false)
            isMounted = false;
        }
    }, [listChapDown])

    React.useEffect(() => {
        let isMounted = true;
        if (listChapDown.length != 0 && isMounted) {
            let index_ = listChapDown.findIndex((e) => e?.idchap === item._id && e.status === 0)
            if (index_ != -1) {
                setDowload(true)
            }
        }
        return () => {
            setloading(false)
            isMounted = false;
        }
    }, [listChapDown])
    const onHandlerDownload = async (i: string, e: string) => {
        if (!isPremium) {
            return navigation.navigate(SCREEN.PERMIUM_SCREEN)
        }
        if (count != 1) {
            return ToastAndroid.show('You can only download chapter one at a time', ToastAndroid.SHORT)
        } else {
            setCount(0)
            setloading(true)
            let obj = {
                idManga: _item._id,
                idChap: i,
                data: [],
                numberChap: dataTotleChap,
                nameChap: e,
                number: (index_ + 1) * page,
                status: 0
            }
            let resultData = await getDetailChapter(i);
            SqlHelper.DownloadManga(_item, obj, 0)
            if (resultData?.data?.status === "success") {
                let chap: any = {
                    idManga: _item._id,
                    idChap: i,
                    data: [],
                    numberChap: dataTotleChap,
                    nameChap: e,
                    number: (index_ + 1) * page,
                    status: 1
                }
                new Promise(async (reslove, reject) => {
                    for (var is = 0; is < resultData.data?.data.images.length; is++) {
                        await RNFS.downloadFile({
                            fromUrl: resultData.data?.data.images[is].toString(),
                            headers: {
                                Referer: "https://manganelo.com/"
                            },
                            toFile: `${RNFS.DocumentDirectoryPath}/${i + is}`,
                        }).promise.then((r) => {
                            if (r.statusCode === 200) return chap.data.push(`${RNFS.DocumentDirectoryPath}/${i + is}`)
                            else chap.data.push([])
                        }).catch((err) => {
                            reject(err)
                        });

                    }
                    reslove(chap)
                })
                    .then((i: any): void => {
                        if (i.length != 0) {
                            let load = SqlHelper.DownloadManga(_item, i, 1)
                            load.then(e => {
                                if (!e) setDowload(true)
                                setCount(1)
                                setloading(e);
                            }).catch(e => console.log(e))
                        } else {
                            setDowload(false)
                            setCount(1)
                            setloading(e);
                        }
                    })
                    .catch(e => console.log(e))
            }
        }

    }

    const getExtention: any = filename => {
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };
    const onHandlergoToRead = (idchap, idmanga, name, index_) => {
        AdmodService.showAdsFull(SCREEN.DETIAL_CHAPTER, { id: idchap, idChap: idmanga, dataTotleChap, indexChap: index_, page },null);
    }

    return (
        <View style={{
            flexDirection: 'row',
            width: SCREEN_WIDTH_No,
            borderBottomWidth: 1,
            borderColor: '#ddd',

        }}>

            <TouchableOpacity
                style={{
                    width: '85%',
                    paddingVertical: 7, paddingHorizontal: 10
                }}
                activeOpacity={0.6}
                onPress={() => onHandlergoToRead(item?._id, id_, item?.name, item?.index)}
            >
                <View style={styles.Chapter_}>
                    <Text numberOfLines={1} allowFontScaling={false} style={[styles.name, { color: isRead ? '#e63946' : color__ }]} >{item?.index}. {item?.name}</Text>
                    <Text allowFontScaling={false} style={[styles.txtdate, {
                        color: isRead ? '#e63946' : color__
                    }]}>
                        {item?.createdAt?.split(/T.*/)[0]}
                    </Text>
                </View>
            </TouchableOpacity>
            {
                isdowload ? (
                    <View style={{
                        width: '15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <AntDesign name="check" size={20} color={color__} />
                    </View>
                ) : (
                    <React.Fragment>
                        {
                            loading ? (
                                <View style={styles.containerLoading}>
                                    <ActivityIndicator size="small" color={color__} ></ActivityIndicator>
                                </View>
                            ) : (
                                <TouchableOpacity style={styles.containerIcon}
                                    activeOpacity={0.6}
                                    onPress={() => onHandlerDownload(item?._id, item?.name)}
                                >
                                    <FastImage
                                        resizeMode='cover'
                                        style={styles.icon}
                                        source={iconDowload}></FastImage>
                                </TouchableOpacity>
                            )
                        }

                    </React.Fragment>
                )
            }

        </View>
    );
};
export default React.memo(Item, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    name: {
        fontSize: 13,
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73',
    },
    Chapter_: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    containerLoading: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerIcon: {
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 25,
        height: 25,
    },
    txtdate: {
        fontFamily: 'Montserrat-Light',
        fontSize: 12,
    }
})

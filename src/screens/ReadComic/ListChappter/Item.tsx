
import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as SCREEN from '../../../constants/ScreenTypes'
import { SCREEN_WIDTH, SCREEN_WIDTH_No } from '../../../constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SQLHelper from '../../../common/SQLHelper';
import RNFetchBlob from 'rn-fetch-blob'
import ApplovinService from './../../../Applovin/Applovin';

const Item: FunctionComponent<any> = ({index,dataTotleChap, page, listChapRead, item, id, color________, color____, color__,color_____  }) => {

    const navigation = useNavigation<any>();
    const [isRead, setisRead] = React.useState<boolean>(false)


    React.useEffect(() => {
        (() => {
            setisRead(false)
            if (listChapRead.length != 0) {

                if (listChapRead[0].chapter_id === item._id) {
                    setisRead(true)
                }
            }
        })()
    }, [listChapRead])

    const onHandlergoToRead = (idchap, idmanga, name, index) => {

        ApplovinService.showAdsFull(SCREEN.DETIAL_CHAPTER, { id: idchap, idChap: idmanga ,dataTotleChap,indexChap:index,page},null);
    }


    return (

        <View key={item._id} style={{
            flexDirection: 'row',
            width: SCREEN_WIDTH_No,
            // height: 70,
            borderBottomWidth: 1,
            borderColor: color_____,

        }}>
            <RectButton
                style={{
                    width: '100%',

                    paddingVertical: 5, paddingHorizontal: 10
                }}
                onPress={() => onHandlergoToRead(item?._id, id, item?.name, item?.index)}
            >
                <View style={styles.Chapter_}>
                    <Text style={[styles.name, { color: isRead ? '#f77f00' : color____ }]} numberOfLines={2}>{item?.index}. {item?.name}</Text>
                    <Text style={[{
                        fontFamily: 'Averta',
                        fontSize: 13,
                        color: '#5c6b73',

                    }, {
                        color: isRead ? '#f77f00' : color____
                    }]}>
                        {item?.createdAt?.split(/T.*/)[0]}
                    </Text>
                </View>
            </RectButton>

            {/* <RectButton style={{
                width: '15%',
                // height: '100%',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <MaterialCommunityIcons name="download" size={25} color="#5c6b73" />
            </RectButton> */}
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
        fontSize: 14,
        color: '#000',
        fontFamily: 'Averta',
    },
    Chapter_: {
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    containerTitl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
})


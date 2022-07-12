import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_HEIGHT, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT } from '../../constants'
export const iconTap = require('../../assets/image/tap.png');
import { dispatchActionTutorial } from '../../redux/action/FunctionAction'
const TutorialRead: FunctionComponent<any> = ({ setShowTutorial }) => {
    const dispatch = useDispatch()
    const onHandlerClose = () => {
        setShowTutorial(false)
        dispatch(dispatchActionTutorial(false))
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.containerContent}>
                <View style={styles.containerItem}>
                    <Text style={styles.txt}>Press the TOP of the screen to view setting</Text>
                    <Image
                        resizeMode="contain"
                        style={styles.tinyIcon}
                        source={iconTap}></Image>
                </View>
                <View style={styles.containerItem}>
                    <Text style={styles.txt}>Press the BOTTOM of the screen to view photos before</Text>
                    <Image
                        resizeMode="contain"
                        style={styles.tinyIcon}
                        source={iconTap}></Image>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onHandlerClose}
                style={styles.bthSkip}>
                <Text style={styles.txt}>Understanded</Text>
            </TouchableOpacity>
        </View>
    )
}
export default React.memo(TutorialRead, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        width: SCREEN_WIDTH_No,
        height: SCREEN_HEIGHT + STATUS_BAR_HEIGHT,
        top: 0 ,
        zIndex: 999999,
        backgroundColor: 'rgba(1, 1, 1, 0.8)',
        elevation: 10000,
        padding:30
    },
    containerContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height:'80%',
        paddingTop: STATUS_BAR_HEIGHT,
        
    },
    txt: {
        fontSize: 17,
        color: '#fff',
        fontFamily: 'Nunito-Bold',
        paddingRight: 10
    },
    bthSkip: {
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#1281f9',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
  
    },
    tinyIcon: {
        width: 50,
        height: 50,

    },
    containerItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    }
})
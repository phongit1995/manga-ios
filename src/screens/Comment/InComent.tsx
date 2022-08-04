import React from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, NativeSyntheticEvent } from 'react-native';
import Header from './Header';
import { useRoute, RouteProp } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { PostCommentManga, PostRepCommentManga } from '../../api/comments'
import * as screen from './../../constants/ScreenTypes';
import { RootState } from '../../redux/reducers';
import Toast from 'react-native-toast-message';
export default function InComent({ color_____, color_, idManga, setstatuscmt, type }) {
    const [value, onChangeText] = React.useState<string>('')
    const state = useSelector((state: RootState) => state)
    const { UserReduce } = state
    const [inforUser, setInforUser] = React.useState<any>(null)
    const navigation = useNavigation();
    const [disabled, setdisabled] = React.useState<boolean>(true)
    React.useEffect(() => {
        (() => {
            if (Object.keys(UserReduce.user).length != 0) return setInforUser(UserReduce.user)
            setInforUser(null)
        })()
    }, [UserReduce.user])

    const _Onhandlersubmit = () => {

        if (!inforUser?.token && inforUser?.token != 'undefined') return navigation.navigate(screen.LOGIN_SCREEN, { type: 0 })
        if (type === 0) {
            PostCommentManga(idManga, value, inforUser.token).then((result) => {
                if (result.data.status === "success") {
                    const message = result.data?.data?.message ? result.data?.data?.message : "Thanks. Comment are being reviewed" ;
                    Toast.show({
                        type:"success",
                        text1:"Success",
                        text2:message,
                        visibilityTime:5000,
                        
                    })
                    onChangeText('')
                    setstatuscmt((prve) => !prve)
                }
            })
                .catch((e) => console.log(e.response))
        } else {
            PostRepCommentManga(idManga, value, inforUser.token).then((result) => {
                if (result.data.status === "success") {
                    const message = result.data?.data?.message ? result.data?.data?.message : "Thanks. Comment are being reviewed" ;
                    Toast.show({
                        type:"success",
                        text1:"Success",
                        text2:message,
                        visibilityTime:5000,
                        
                    })
                    onChangeText('')
                    setstatuscmt((prve) => !prve)
                }
            })
                .catch((e) => console.log(e.response))
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: color_, borderTopColor: color_____ }]}>
            <TextInput
                underlineColorAndroid='transparent'
                onChangeText={text => {
                    if (text != '') {
                        setdisabled(false)
                    } else {
                        setdisabled(true)
                    }
                    onChangeText(text)
                }}
                value={value}
                multiline
                blurOnSubmit
                style={styles.input} placeholder="Enter comments"></TextInput>
            <TouchableOpacity
                onPress={() => _Onhandlersubmit()}
                disabled={disabled}
                activeOpacity={0.5}
                style={{
                    backgroundColor: '#e5e5e5',
                    paddingVertical: 8,
                    borderRadius: 100,
                    marginLeft: 10,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Feather name="send" size={25} color={disabled ? '#8e8e84' : '#03071e'} />
            </TouchableOpacity>
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#e5e5e5'
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#e5e5e5',
        fontFamily: 'Averta-Bold',
        borderRadius: 8,
        paddingHorizontal: 10
    }
})
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants/index'
import LinearGradient from 'react-native-linear-gradient';
import { validateEmail } from '../../constants/Validate'
import { useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
const ForgotPassword = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(true)

    const {
        _checkExistUsername,
        _onChangeText } = getEventHandlers(
            email,
            disabled,
            setEmail,
            setDisabled)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.gobackScreen}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={30}
                        color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>

                <View style={styles.logoWrapper}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={require('./../../assets/image/ic_launcher.png')} />
                </View>
                <View style={styles.loginForm}>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            value={email}
                            onChangeText={(e: string) => _onChangeText(e)}
                            autoCapitalize="none"
                            placeholder="Nhập địa chỉ Email"
                            style={styles.input} />
                    </View>
                    <TouchableOpacity
                        disabled={disabled}
                        activeOpacity={0.8}
                        onPress={_checkExistUsername}

                    >
                        <LinearGradient
                            colors={['#53edaa', '#1fcf84']}
                            useAngle={true}
                            angle={145}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            style={styles.btnLogin}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: '#fff',
                                fontWeight: '500'
                            }}>Tiếp tục</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                </View>
                <View style={styles.otherOptionsWrapper}>
                    <TouchableOpacity 
                        style={styles.forgotPassword}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 12,
                            fontFamily: 'Nunito-Bold',
                            color: '#6c757d'
                        }}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView >
    );
}
export default React.memo(ForgotPassword, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT,
    },
    gobackScreen: {
        position: 'absolute',
        top: 30 + STATUS_BAR_HEIGHT,
        left: 15,
    },
    centerContainer: {
        paddingVertical: 40,
        width: SCREEN_WIDTH - 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#489dcf',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 5,
        borderRadius:10
    },
    logoWrapper: {
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 15 },
        shadowColor: '#fff',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 5,
        height: 64,
        width: 64,
        borderRadius: 35
    },
    logo: {
        height: '100%',
        width: '100%'

    },
    loginForm: {
        width: '100%',
        flexDirection: 'column'
    },
    textInputWrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#489dcf',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 3,
    },
    input: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 15,
    
    },
    btnLogin: {
        width: '100%',
        padding: 15,
        backgroundColor: '#318bfb',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#fff',
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5,
    },
    otherOptionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    },
    forgotPassword: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})

function getEventHandlers(
    email: string,
    disabled: boolean,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
) {
    const _checkExistUsername = React.useCallback((): void => {
        if (!validateEmail(email)) return ToastAndroid.show(
            "Email Không Hợp Lệ",
            ToastAndroid.SHORT,
        );
    }, [])
    const _onChangeText = React.useCallback((e: string): void => {
        setEmail(e)
        if (e === '') return setDisabled(true)
        setDisabled(false)
    }, [])
    return {
        _checkExistUsername, _onChangeText
    }
}
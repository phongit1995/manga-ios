import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants/index'
import LinearGradient from 'react-native-linear-gradient';
import TextInput from '../../components/FormHelper/TextInput'
import * as screen from './../../constants/ScreenTypes'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { RegisterRequest } from '../../redux/action/UserAction'
import * as Yup from 'yup';
import isEqual from 'react-fast-compare';
import { changeBackground, changeBackground_, changeBackground__ } from '../../common/stringHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import ApplovinService from './../../Applovin/Applovin';
import { RootState } from '../../redux/reducers'
import { stores } from '../../../App'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import FastImage from 'react-native-fast-image';
export const iconBack = require('../../assets/image/left-arrow.png');

const SignUp = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [hidePassword, sethidePassword] = React.useState<boolean>(true)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isDown, setDown] = React.useState<boolean>(false);
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const {
        _onPressToggleHidePassword,
        _handlePressIn,
        _handlePressOut
    } = getEventHandlers(sethidePassword, hidePassword, setDown)

    React.useEffect(() => {
        dispatch(dispatchNetWork())
    },[])
    const validationSchema = Yup.object().shape({
        Email: Yup.string().email().required(),
        Name: Yup.string().required(),
        password: Yup.string().required()
            .min(6, "Password must be at least 6 characters"),
    });
    const { Loading, UserReduce } = state

    React.useEffect(() => {
        (() => {
            setLoading(Loading.showloading)
            if (Object.keys(UserReduce.user).length != 0) {
                navigation.navigate(screen.LOGIN_SCREEN)
            }
        })()
    }, [Loading.showloading, UserReduce.user])

    const gradColors = isDown ? ['#1fcf84', '#53edaa'] : ['#53edaa', '#1fcf84'];
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color__ = changeBackground(isDarkMode)

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: color_ }]}>
            <FocusAwareStatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden={false} translucent={true} backgroundColor="transparent" />
            <View style={styles.centerContainer}>
                <View style={styles.gobackScreen}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                       <FastImage source={iconBack} style={styles.imgIcon}></FastImage>
                    </TouchableOpacity>

                </View>
                <View style={styles.logoWrapper}>
                    <FastImage
                        resizeMode="contain"
                        style={styles.logo}
                        source={require('./../../assets/image/ic_launcher.png')} />
                    <Text style={[styles.txtName, { color: '#000' }]}>Manga Reader</Text>
                </View>

                <Formik
                    initialValues={{ Email: '', Name: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        if (!isNetWork) return ToastAndroid.show('Check Internet', ToastAndroid.SHORT)
                        let user = {
                            email: values.Email,
                            name: values.Name,
                            password: values.password
                        }
                        setLoading(true)
                        dispatch(RegisterRequest(user))
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue
                    }) => {

                        return (
                            <View style={styles.loginForm}>
                                <View style={styles.textInputWrapper}>
                                    <TextInput
                                        icon="ios-mail-open-outline"
                                        name="Email"
                                        placeholder="Email"
                                        onChange={handleChange("Email")}
                                        onBlur={handleBlur('Email')}
                                        value={values.Email}

                                        touched={touched.Email}
                                        errors={errors.Email}
                                        onPressCleanText={() => setFieldValue("Email", "")}
                                        autoCompleteType="Email"
                                        returnKeyLabel="next"
                                        returnKeyType="next"

                                    ></TextInput>
                                </View>
                                <View style={styles.textInputWrapper}>
                                    <TextInput
                                        icon="ios-mail-open-outline"
                                        name="Name"
                                        placeholder="Name"
                                        onChange={handleChange("Name")}
                                        onBlur={handleBlur('Name')}
                                        value={values.Name}
                                        touched={touched.Name}
                                        errors={errors.Name}

                                        onPressCleanText={() => setFieldValue("Name", "")}
                                        autoCompleteType="Name"
                                        returnKeyLabel="next"
                                        returnKeyType="next"

                                    ></TextInput>
                                </View>
                                <View style={styles.textInputWrapper}>
                                    <TextInput
                                        icon="lock-closed-outline"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange("password")}
                                        onBlur={handleBlur('password')}
                                        value={values.password}

                                        keyboardType={false}
                                        secureTextEntry={hidePassword}
                                        touched={touched.password}
                                        onPresssecureTextEntry={_onPressToggleHidePassword}
                                        onPressCleanText={() => setFieldValue("password", "")}
                                        errors={errors.password}
                                        autoCompleteType="password"
                                        returnKeyLabel="next"
                                        returnKeyType="next"

                                    ></TextInput>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    // onPressIn={_handlePressIn}
                                    // onPressOut={_handlePressOut}
                                    onPress={handleSubmit}
                                    style={styles.btnLogin}
                                >
                                  
                                        {
                                            loading ? <ActivityIndicator size="small" color="#fff" /> :
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: '#fff',
                                                    fontFamily: 'Nunito-Bold',
                                                }}>Sign Up</Text>
                                        }
             
                                </TouchableOpacity>
                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 10,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: '#000', fontFamily: 'Montserrat-Light', marginRight: 5 }}>Already have an account?
                </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            ApplovinService.showAdsFull(screen.LOGIN_SCREEN,null,null)
                                        }}
                                    >
                                        <Text style={{ color: '#d34150', fontFamily: 'Averta-Bold', }}>Sign In</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>

        </SafeAreaView >
    );
}
export default React.memo(SignUp, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },

    gobackScreen: {

    },
    centerContainer: {
        paddingVertical: 20,
        width: SCREEN_WIDTH - 40,

        padding: 15,
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#489dcf',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 5,
        borderRadius: 10
    },
    logoWrapper: {
        marginBottom: 15,

        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 60,
        width: 60,

    },
    loginForm: {
        width: '100%',
        flexDirection: 'column'
    },
    textInputWrapper: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    hidePasswordIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    input: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 10,
    },
    btnLogin: {
        width: '100%',
        height: 45,
        borderRadius: 20,
        backgroundColor: '#334148',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#fff',
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 3,
        marginTop: 5

    },
    btnLoginLinearGradient: {
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    forgotPassword: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    ORtextWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        top: (2 - 20) / 2,
        left: (SCREEN_WIDTH - 30 - 40 - 40) / 2,
        position: 'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    txtName: {
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
        fontWeight: 'normal',


    },
    imgIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',

    }
})

function getEventHandlers(
    sethidePassword: React.Dispatch<React.SetStateAction<boolean>>,
    hidePassword: boolean,
    setDown: React.Dispatch<React.SetStateAction<boolean>>) {
    const _onPressToggleHidePassword = React.useCallback((): void => {
        sethidePassword((preve) => !preve)
    }, [])

    const _handlePressIn = React.useCallback(() => {
        setDown(true);
    }, [setDown]);

    const _handlePressOut = React.useCallback(() => {
        setDown(false);
    }, [setDown]);

    return {
        _onPressToggleHidePassword, _handlePressIn, _handlePressOut
    }
}

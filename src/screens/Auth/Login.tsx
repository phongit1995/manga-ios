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
import CheckBox from '../../common/Checkbox';
import TextInput from '../../components/FormHelper/TextInput'
import * as screen from './../../constants/ScreenTypes'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { useRoute, RouteProp } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import isEqual from 'react-fast-compare';
import { changeBackground, changeBackground_, changeBackground__ } from '../../common/stringHelper';
import { LoginRequest, LoginSuccess } from '../../redux/action/UserAction'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import AdmodService from './../../firebase/Admod';
import { RootState } from '../../redux/reducers'
import { stores } from '../../../App'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import FastImage from 'react-native-fast-image';
export const iconBack = require('../../assets/image/left-arrow.png');
export type RootStackParamList = {
    Login: { type: number };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
const Login = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const router = useRoute<RootRouteProps<'Login'>>();
    const type = router?.params?.type;
    const navigation = useNavigation();
    const [hidePassword, sethidePassword] = React.useState<boolean>(true)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [isDown, setDown] = React.useState<boolean>(false);
    const [token, settoken] = React.useState<string>('');

    React.useEffect(() => {
        dispatch(dispatchNetWork())
    }, [])
    const { Loading, UserReduce } = state
    const {
        _onPressToggleHidePassword,
        _handlePressIn,
        _handlePressOut
    } = getEventHandlers(sethidePassword, hidePassword, setDown)

    const validationSchema = Yup.object().shape({
        Email: Yup.string().email().required(),
        password: Yup.string().required()
            .min(6, "Password must be at least 6 characters"),
    });

    const initUser = (token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                let data = {
                    // email: json.email,
                    name: json.name,
                    avatar: json.picture.data.url,
                    role: 'Member',
                    token
                }
                dispatch(LoginSuccess(data))
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    const reject = (arg0: string) => {
        throw new Error('Function not implemented.');
    }

    // const getResponseInfo = (error, result) => {
    //     if (error) {
    //         ToastAndroid.show('Login Fail!', ToastAndroid.SHORT);
    //     } else {
    //         console.log(token)
    //         if (token.length != 0) {
    //             let data = {
    //                 email: result.name,
    //                 avatar: result.picture.data.url,
    //                 role: 'Member',
    //                 token
    //             }
    //             dispatch(LoginSuccess(data))
    //         }

    //     }
    // };

    React.useEffect(() => {
        (() => {
            setLoading(Loading.showloading)
            if (Object.keys(UserReduce.user).length != 0 && UserReduce.user.token) {
                if (type === 0) return navigation.goBack()
                navigation.navigate(screen.MAIN_HOME_SCREEN)
            }
        })()
    }, [Loading.showloading, UserReduce.user])
    const gradColors = isDown ? ['#1fcf84', '#53edaa'] : ['#53edaa', '#1fcf84'];
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color__ = changeBackground(isDarkMode)

    const onHandlerSignUp = () => {

        AdmodService.showAdsFull(screen.SIGN_UP_SCREEN, null, null)
    }

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
                    <View style={styles.logoWrapper}>
                        <FastImage
                            resizeMode="contain"
                            style={styles.logo}
                            source={require('./../../assets/image/ic_launcher.png')} />
                        <Text style={[styles.txtName, { color: '#000' }]}>Manga Reader</Text>
                    </View>

                </View>
                <Formik
                    // initialValues={{ Email: '' , password: '' }}
                    initialValues={{ Email: Object.keys(UserReduce.user).length != 0 ? UserReduce.user.email : '', password: Object.keys(UserReduce.user).length != 0 ? UserReduce.user.password : '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        if (!isNetWork) return ToastAndroid.show('Check Internet', ToastAndroid.SHORT)
                        let user: any = {
                            email: values.Email,
                            password: values.password
                        }
                        setLoading(true)
                        dispatch(LoginRequest(user))
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
                                                fontSize: 17,
                                                color: '#fff',
                                                fontFamily: 'averta_bold',
                                            }}>Sign In</Text>
                                    }

                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </Formik>
                <View style={{
                    marginTop: 20,
                    marginBottom: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: '#000', fontFamily: 'Montserrat-Light', marginRight: 5 }}>Don't Have an account?
                </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => onHandlerSignUp()}
                    >

                        <Text style={{ color: '#d34150', fontFamily: 'averta_bold', }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView >
    );
}
export default React.memo(Login, isEqual)
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

        paddingHorizontal: 15,
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#489dcf',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 3,
        borderRadius: 10
    },
    logoWrapper: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
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
        // backgroundColor: '#fff',
        // shadowOffset: { width: 12, height: 12 },
        // shadowColor: '#489dcf',
        // shadowOpacity: 1.0,
        // shadowRadius: 18,
        // elevation: 3,
    },
    hidePasswordIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    input: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 15,
    },
    btnLogin: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#334148',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#fff',
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5,
        borderRadius: 20,
        marginBottom: 10
    },
    btnLoginLinearGradient: {
        width: '100%',
        height: '100%',
        padding: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    otherOptionsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,

        width: '100%'
    },
    forgotPassword: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    divideLine: {
        marginVertical: 30,
        position: 'relative',
        height: 2,
        width: '100%',
        backgroundColor: '#ddd',
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
        fontFamily: 'averta_bold',
        fontWeight: 'normal',
        marginBottom: 10,

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

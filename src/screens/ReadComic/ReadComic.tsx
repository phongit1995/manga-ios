import React, {useEffect, useRef} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { getDetailChapter } from './../../api/comic'
import { useRoute, RouteProp } from '@react-navigation/native';
import Modals from './Modals';
import Footer from './Footer';
import ListImage from './ListImage';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'
import NetWork from '../../components/NetWork';
import Header from './Header';
import { changeBackground, changeBackground__ } from '../../common/stringHelper';
import SQLHelper from '../../common/SQLHelper';
import {paddingBottom, SCREEN_HEIGHT, SCREEN_WIDTH_No} from '../../constants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { RootState } from '../../redux/reducers'
import { useFocusEffect } from '@react-navigation/native';
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import { stores } from '../../../App'
import TutorialRead from './TutorialRead';
import * as RNFS from 'react-native-fs';
export type RootStackParamList = {
    DETIAL_CHAPTER: { id: string, idChap: string, dataTotleChap: number, indexChap: number, page: number };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
export type RouterProps = {
    route: {
        key: string,
        title: string
    }
}

export default function ReadComic() {
    const dispatch = useDispatch()
    const router = useRoute<RootRouteProps<'DETIAL_CHAPTER'>>();
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const { id, idChap, dataTotleChap, indexChap, page } = router.params;
    const state = useSelector((state: RootState) => state)
    const { isDarkMode, isTurn, isTutorial } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string | null>(null);
    const [imagesList, setImagesList] = React.useState<string | null>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [beforeChapter, setBeforeChapter] = React.useState<string | null>(null);
    const [afterChapter, setAfterChapter] = React.useState<string | null>(null);
    const scrollY = new Animated.Value(0);
    const scrollYFooter = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, SCREEN_HEIGHT / 9.5)
    const diffClampFooter = Animated.diffClamp(scrollYFooter, 0, Math.round(SCREEN_HEIGHT / 15))
    const [showTutorial, setShowTutorial] = React.useState<boolean>(isTutorial);
    const [statusbar,setStatusbar] = React.useState<boolean>(true);
    const translateY = diffClamp.interpolate({
        inputRange: [0, SCREEN_HEIGHT / 9.5],
        outputRange: [0, -(SCREEN_HEIGHT / 9.5)]
    })
    React.useEffect(() => {
        dispatch(dispatchNetWork())
    }, [])
    const translateYFooter = diffClampFooter.interpolate({
        inputRange: [0, Math.round(SCREEN_HEIGHT / 15)],
        outputRange: [0, Math.round(SCREEN_HEIGHT / 15) + paddingBottom]
    })

    let _setModalVisible = (e: boolean) => {
        setModalVisible(e)
    }

    React.useEffect(() => {
        (async () => {
            try {
                fetchData()
            } catch (error) {
                console.log(error)
            }
        })()
        return () => {
            setName(null)
            setAfterChapter(null)
            setBeforeChapter(null)
            setImagesList(null)
            setIsLoading(true)
        }
    }, [id, idChap])
    const fetchData = async () => {
        if (isNetWork) {
            try {
                let resultData = await getDetailChapter(id)
                if (resultData?.data?.status == "success") {
                    SQLHelper.addhistoryMangaChapter(idChap, id, resultData.data.data.name, page)
                    setName(resultData.data.data.name);
                    setAfterChapter(resultData.data?.data?.after);
                    setBeforeChapter(resultData.data?.data?.before);
                    setImagesList(resultData.data?.data?.images);
                    setIsLoading(false)
                }
            } catch (error) {
                setName(null)
                setAfterChapter(null)
                setBeforeChapter(null)
                setImagesList(null)
            }
        }
    }


    const color_ = changeBackground__(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    React.useEffect(()=>{
        setStatusbar(false);
    },[])
    
    return (
        <>

            <FocusAwareStatusBar
                barStyle="light-content"
                hidden={statusbar}
                translucent={true}
                backgroundColor='transparent'
            />
            {
                isLoading ? (
                    <View style={[styles.containers, { backgroundColor: color_ }]}>
                        <Loading></Loading>
                    </View>
                ) : (
                    <React.Fragment>
                        <Header ref={headerRef} {...{ translateY, name, setShowTutorial }}></Header>
                        <View style={[styles.container, { backgroundColor: color_ }]}>
                            {
                                isNetWork ? (
                                    <ListImage footerRef={footerRef} headerRef={headerRef} {...{ isDarkMode, afterChapter, page, indexChap, dataTotleChap, idChap, isTurn, imagesList: imagesList ? imagesList : [], scrollY, scrollYFooter }}></ListImage>
                                ) : (
                                    <NetWork></NetWork>
                                )
                            }
                        </View>
                        {
                            showTutorial ? <TutorialRead {...{ setShowTutorial }}></TutorialRead> : null
                        }
                        <Footer ref={footerRef} {...{ page, indexChap, dataTotleChap, name, id, idChap, translateYFooter, beforeChapter, afterChapter, _setModalVisible }}></Footer>
                        <Modals {...{ color_, color__, isTurn, modalVisible, _setModalVisible }}></Modals>
                    </React.Fragment>
                )
            }

        </>
    );
    // }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        flex: 1
    },
    Img: {
        width: "100%",
        alignSelf: "center",
        flexDirection: "row",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.9,
        elevation: 5,
    },
    endchap: {
        textAlign: 'center'
    },
    Footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: SCREEN_HEIGHT / 15,
        paddingHorizontal: 10,
        elevation: 6,
        width: SCREEN_WIDTH_No,
        backgroundColor: '#404042',
        justifyContent: "center",
        opacity: 0.8,
        zIndex: 10
    },
    textChapter: {
        fontSize: 14,
        color: "#b8b4b4"
    }
})

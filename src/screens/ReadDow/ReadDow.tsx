import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
const { height, width } = Dimensions.get("window");
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import Header from '../ReadComic/Header'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Footer from './Footer';
import Modals from '../ReadComic/Modals';
import ListImage from './ListImage';
import ListImageScale from './../ReadComic/ListImage';
import { RootState } from '../../redux/reducers'
export type RootStackParamList = {
    ReadDow: { item__: any };
};
import { changeBackground, changeBackground_, changeBackground__ } from '../../common/stringHelper';
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

export default function ReadDow() {
    const scrollY = new Animated.Value(0);
    const scrollYFooter = new Animated.Value(0);
    const state = useSelector((state: RootState) => state)
    const { isDarkMode, isNetWork, isTurn } = state.FunctionReduce;
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const diffClamp = Animated.diffClamp(scrollY, 0, height / 9.5)
    const translateY = diffClamp.interpolate({
        inputRange: [0, height / 9.5],
        outputRange: [0, -(height / 9.5)]
    })
    const diffClampFooter = Animated.diffClamp(scrollYFooter, 0, Math.round(height / 13))
    const translateYFooter = diffClampFooter.interpolate({
        inputRange: [0, Math.round(height / 13)],
        outputRange: [0, Math.round(height / 13)]
    })
    const [headerStatus,setHeaderStatus]= useState(true);
    const router = useRoute<RootRouteProps<'ReadDow'>>();
    const { item__ } = router.params

    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    let _setModalVisible = (e: boolean) => {
        setModalVisible(e)
    }
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    useEffect(()=>{
        setHeaderStatus(false);
    },[])
    return (
        <View style={{ backgroundColor: color, flex: 1 }}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                hidden={headerStatus}
                translucent={true}
                backgroundColor='transparent'
            />
            <Header ref={headerRef} {...{ translateY, name: item__.nameChap }}></Header>
            <ListImage {...{ isDarkMode,imagesList: item__.data, scrollY, scrollYFooter, isTurn, color_ }}/>
            <Footer {...{ translateYFooter, _setModalVisible }}></Footer>
            <Modals {...{ color_, color__, isTurn, modalVisible, _setModalVisible }}></Modals>
        </View>
    );
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
        height: height / 13,
        paddingHorizontal: 10,
        elevation: 6,
        width: width,
        backgroundColor: '#404042',
        justifyContent: "center",
        opacity: 0.8,
        zIndex: 10
    },
    textChapter: {
        fontSize: 14,
        color: "#b8b4b4",
        fontFamily: 'Montserrat-Light',
    }
})
function data(data: any): string[] {
    throw new Error('Function not implemented.');
}


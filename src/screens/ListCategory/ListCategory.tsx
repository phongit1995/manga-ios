import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator, StatusBar } from 'react-native';
const { width } = Dimensions.get("window");
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CategoryPage from './CategoryPage';
import { getListCategory } from './../../api/category';
import { STATUS_BAR_HEIGHT } from '../../constants'
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux'
import NetWork from '../../components/NetWork';
import AdmodService from './../../firebase/Admod';
export type RootStackParamList = {
    CATEGORY_SCREEN: { key: string };
};
import { RootState } from '../../redux/reducers'
import { stores } from '../../../App'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import { changeBackground___, changeBackground_, changeBackground__, changeBackground, changeBackground_____ } from '../../common/stringHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>


const ListCategory = () => {
    const router = useRoute<RootRouteProps<'CATEGORY_SCREEN'>>();
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    const color______ = changeBackground_____(isDarkMode)
    React.useEffect(() => {
        dispatch(dispatchNetWork())
    },[])

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor={color___}
            />
            <Header {...{ type: router.params?.key }} {...{ color_, color______ }}></Header>
            {
                !isNetWork ? (
                    <NetWork></NetWork>
                ) : (
                    <CategoryPage type={router.params?.key} {...{ color_, color, color__ }} />
                )
            }

        </View>
    )
}

export default ListCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFF",
    },
    header: {
        fontFamily: 'Averta-Bold',
        borderBottomWidth: 0.5,
        paddingVertical: 13,
        //borderBottomColor:"#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation: 1
    },
    labelStyle: {
        fontSize: 12,
        color: "#fff",
        fontFamily: 'Montserrat-Light',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: "white",

    },
    labelStyleActive: {
        fontSize: 12,
        color: "#fff",
        fontFamily: "Brygada1918-Medium",
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderBottomWidth: 2,
        borderBottomColor: "#4da7db",
    }
})

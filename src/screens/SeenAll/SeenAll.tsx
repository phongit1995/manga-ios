import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux'
import NetWork from '../../components/NetWork';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import Header from './Header';
import isEqual from 'react-fast-compare';

export type RootStackParamList = {
    CATEGORY_SCREEN: { type: number };
};
import { changeBackground___, changeBackground_, changeBackground__, changeBackground, changeBackground_____ } from '../../common/stringHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { RootState } from '../../redux/reducers'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
import { stores } from '../../../App'
export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>

const SeenAll = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const router = useRoute<RootRouteProps<'CATEGORY_SCREEN'>>();
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    const color____ = changeBackground_____(isDarkMode)
    const color__ = changeBackground(isDarkMode)
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
            <Header type={router.params?.type} {...{ color____, color_ }}></Header>
            {
                !isNetWork ? (
                    <NetWork></NetWork>
                ) : (
                    <Item type={router.params?.type} {...{ color_, color, color__ }} />
                )
            }

        </View>
    )
}

export default React.memo(SeenAll, isEqual);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFF",
    },
    header: {
        fontFamily: "Brygada1918-Medium",
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
        fontFamily: "Brygada1918-Medium",
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

import React from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import Header from './Header';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import ContentCmt from './ContentCmt/ContentCmt';
import InComent from './InComent';
import { useDispatch, useSelector } from 'react-redux'
import { changeBackground____, changeBackground___, changeBackground__, changeBackground } from '../../common/stringHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import NetWork from '../../components/NetWork';
import { RootState } from '../../redux/reducers'
import AdmodService from './../../firebase/Admod';
import { stores } from '../../../App'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
export type RootStackParamList = {
    COMMENT_SCREEN: { name: string, idManga: string };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
export default function Comment() {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const router = useRoute<RootRouteProps<'COMMENT_SCREEN'>>();
    const { name, idManga } = router.params
    const [statuscmt, setstatuscmt] = React.useState<boolean>(false)

    const color___ = changeBackground___(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const colorBorder = changeBackground____(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    const color_____ = isDarkMode ? '#1e1e23' : '#F2F2F2'

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
            <Header {...{ color__, color_, colorBorder, isDarkMode }}>{name}</Header>
            {

                !isNetWork ? (
                    <NetWork></NetWork>
                ) : (
                    <View style={{ flex: 1 }}>
                        <ContentCmt {...{ color_____, color_, color__, idManga, statuscmt }}></ContentCmt>
                        <InComent {...{ color_____, color_, idManga, setstatuscmt, type: 0 }}></InComent>
                    </View>
                )
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
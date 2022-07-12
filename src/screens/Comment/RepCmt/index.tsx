import React from 'react'
import { Text, View, StyleSheet} from 'react-native';
import Header from './Header';
import { useRoute, RouteProp ,useFocusEffect} from '@react-navigation/native';
import InComent from '../InComent';
import { changeBackground____, changeBackground_, changeBackground__, changeBackground } from '../../../common/stringHelper';
export type RootStackParamList = {
    REP_COMMENT_SCREEN: { idManga: string, idRepcmt: string, item_: any };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import ListRep from './ListRep';
import FocusAwareStatusBar from '../../../components/FocusAwareStatusBar';
import NetWork from '../../../components/NetWork';
import { dispatchNetWork } from '../../../redux/action/NetWorkAction'
import { stores } from '../../../../App'
import AdmodService from '../../../firebase/Admod';
export default function RepCmt() {
    const dispatch = useDispatch()
    const router = useRoute<RootRouteProps<'REP_COMMENT_SCREEN'>>();
    const { idRepcmt } = router.params
    const item_ = router?.params?.item_
    const [statuscmt, setstatuscmt] = React.useState<boolean>(false)
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const [noRep] = React.useState<number>(0)
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const colorBorder = changeBackground____(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    const color_____ = isDarkMode ? '#1e1e23' : '#F2F2F2'
    const color______ = isDarkMode ? '#111217' : '#FFF'
    React.useEffect(() => {
        dispatch(dispatchNetWork())
    },[])

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden={false} translucent={true} backgroundColor={isDarkMode ? '#111217' : "#FAFAFA"} />
            <Header {...{ ...{ colorBorder, color__, color_, isDark: isDarkMode } }}></Header>
            {
                !isNetWork ? (
                    <NetWork></NetWork>
                ) : (
                    <View style={{ flex: 1 }}>
                        <ListRep {...{ item_, color_____, color______, color__, color_, idRepcmt: idRepcmt, noRep, statuscmt }}></ListRep>
                        <InComent {...{ colorBorder, color_, idManga: idRepcmt, setstatuscmt, type: 1 }}></InComent>
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
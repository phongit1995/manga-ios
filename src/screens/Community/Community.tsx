import React from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import Header from './Header';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { changeBackground____, changeBackground_______, changeBackground__, changeBackground, changeBackground___, changeBackground_____ } from '../../common/stringHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import ListComent from './ListComent';
import { RootState } from '../../redux/reducers'
import { stores } from '../../../App'
export type RootStackParamList = {
    COMMUNITY_SCREEN: { name: string, idManga: string };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>
export default function Community() {
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;

    const color = changeBackground_______(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const colorB = changeBackground____(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    const color_____ = isDarkMode ? '#1e1e23' : '#FFF'
    const color______ = changeBackground_____(isDarkMode)


    return (
        <View style={styles.container}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor={color___}
            />
            <Header {...{ color_, color______ }}></Header>
            <ListComent {...{ color__, colorB, color_____, isDark: isDarkMode }}></ListComent>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
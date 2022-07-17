import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { STATUS_BAR_HEIGHT } from './../../constants';
import * as Screen from '../../constants/ScreenTypes'
import AdmodService from './../../firebase/Admod';
type headerProps ={
    type:string,  
    color______: string,
    color_: string
}
const Header:FunctionComponent<headerProps> = ({ type , color______, color_ }) => {

    const navigation = useNavigation();

    return (
        <View style={[styles.headerContainer,{backgroundColor:color_}]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={25} color={color______} />
            </TouchableOpacity>
            <View >
                <Text style={{ fontSize: 22,     fontFamily: 'Averta-Bold', color:color______}}>{type}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(Screen.SEARCH_SCREEN)
      
                    AdmodService.showAdsFull(Screen.SEARCH_SCREEN,null,null);
                }}
            >
                <AntDesign name="search1" size={25} color={color______} />
            </TouchableOpacity>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingTop: STATUS_BAR_HEIGHT + 15,
        backgroundColor: '#ff4545',
        elevation:2
    }
})
import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, NativeSyntheticEvent } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
export const iconClose = require('../../assets/image/z1.png');
import { TextInputSubmitEditingEventData } from './SearchComic'

type FormInputSearchProps = {
    value: string,
    onChangeText: React.Dispatch<React.SetStateAction<string>>,
    _Onhandlersubmit: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined
    setistoggle: React.Dispatch<React.SetStateAction<boolean>>,
    color: string
}

const FormInputSearch: FunctionComponent<FormInputSearchProps> = ({
    value,
    onChangeText,
    _Onhandlersubmit,
    setistoggle,
    color
}) => {
    const navigation = useNavigation();

    return (
        <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={styles.contaiSearch}>
                <Ionicons style={{ padding: 5 }} name="search-outline" size={25} color="#000" />
                <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={text => onChangeText(text)}
                    value={value}
                    multiline
                    blurOnSubmit
                    onSubmitEditing={_Onhandlersubmit}
                    style={{ flex: 1, paddingVertical: 5, fontFamily: 'Montserrat-Light', }} placeholder="Search"></TextInput>
                {
                    value !== '' ? (
                        <TouchableOpacity
                            onPress={() => {
                                onChangeText('')
                                setistoggle(true)
                            }}
                        >
                            <MaterialCommunityIcons style={{ padding: 5 }} name="close-outline" size={15} color="#000" />
                        </TouchableOpacity>
                    ) : null
                }
            </View>
            <TouchableOpacity
                style={{ width: '20%' }}
                onPress={() => navigation.goBack()}
            >
                <Text style={[{ textAlign: 'center', fontFamily: 'Averta-Bold', }, { color }]}>Cancel</Text>
            </TouchableOpacity>
        </View>

    );
}
export default React.memo(FormInputSearch, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,

    },
    title: {
        fontSize: 18,
        margin: 20,
        textAlign: 'center'
    },
    contaiSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f1f4eb',
        marginVertical: 10,
        borderRadius: 5,
        width: '80%'
    },
})
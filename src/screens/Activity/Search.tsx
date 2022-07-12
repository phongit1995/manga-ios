import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, NativeSyntheticEvent } from "react-native";
import { useNavigation } from '@react-navigation/native';
import SQLHelper from '../../common/SQLHelper';
import FastImage from 'react-native-fast-image';
export const iconClose = require('../../assets/image/ic_closecross.png');
export const iconSearch = require('../../assets/image/ic_search.png');
// ic_closecross
export interface TextInputSubmitEditingEventData {
    text: string,
}
type FormInputSearchProps = {

    colorFontWhileToDark: string,
    setListComic:any,
    setListSearch:any,
    nameTable:string,
    isDarkMode
}

const Search: FunctionComponent<FormInputSearchProps> = ({

    colorFontWhileToDark,
    setListComic,
    setListSearch,
    nameTable,
    isDarkMode
}) => {
    const navigation = useNavigation();
    const [value, onChangeText] = React.useState<string>('')
    const onhandlersubmit = async ({ nativeEvent }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        onChangeText(nativeEvent.text)
        SQLHelper.getMangaByName(nativeEvent.text,nameTable).then((result:any)=>{
            if (result.length != 0)  {
                setListSearch('')
                return  setListComic([...result])
            }
            else setListSearch("No Search")
        }).catch(()=>{
            setListSearch("No Search")
        })

    }
    const onhandlersubmits = async () => {
        SQLHelper.getMangaByName(value,nameTable).then((result:any)=>{
            if (result.length != 0)  {
                setListSearch('')
                return  setListComic([...result])
            }
            else setListSearch("No Search")
        }).catch(()=>{
            setListSearch("No Search")
        })

    }
    return (
        <View style={styles.container}>
            <View style={[styles.contaiSearch,{backgroundColor:isDarkMode?'#131C20':'#f1f4eb'}]}>
                <TextInput
                    numberOfLines={1}
                    onChangeText={text => onChangeText(text)}
                    value={value}
           
                    blurOnSubmit
                    onSubmitEditing={onhandlersubmit}
                    placeholderTextColor={isDarkMode ? '#fff' : '#495057'}
                    style={[styles.InputForm,{color:isDarkMode?'#fff':'#000'}]} placeholder="Search"></TextInput>
                {
                    value !== '' ? (
                        <TouchableOpacity
                            onPress={() => {
                                onChangeText('')
              
                            }}
                            style={styles.containerSearch}
                        >
                            <FastImage resizeMode='stretch'
                                source={iconClose}
                                style={styles.tiny} />
                        </TouchableOpacity>
                    ) : null
                } 
            </View>
            <TouchableOpacity
                style={styles.containerCancle}
                onPress={onhandlersubmits}
                activeOpacity={0.9}
            >
                       <FastImage
                        resizeMode="contain"
                        style={styles.tinysearch}
                        source={iconSearch}></FastImage>
            </TouchableOpacity>
        </View>

    );
}
export default React.memo(Search, isEqual)
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingTop: 15
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
        // backgroundColor: '#f1f4eb',

        borderRadius: 20,
        width: '90%',
        paddingHorizontal:10

    },
    containerSearch: { paddingRight: 10 },
    txtCancle: {
        textAlign: 'center',
        fontFamily: "Nunito-Bold",
        color: '#000'
    },
    tiny: {
        width: 15,
        height: 15,

    },
    InputForm: {
        flex: 1,
        padding:8,
        fontFamily: "Brygada1918-Medium",
        
    },
    txt: { textAlign: 'center', fontFamily: "Nunito-Bold" },
    containerCancle: {
         width: '10%',
         justifyContent:'center',
         alignItems:'center',
         },
    tinysearch:{
        width: 20,
        height: 20,
    }
})
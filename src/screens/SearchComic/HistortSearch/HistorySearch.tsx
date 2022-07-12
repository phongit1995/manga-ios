import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SqlHelper from '../../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Item from './Item'
import isEqual from 'react-fast-compare';
type HistorySearchProps = {
    __Onhandlersubmit: (e: string) => void,
    color:string
}
const HistorySearch: FunctionComponent<HistorySearchProps> = ({ __Onhandlersubmit ,color}) => {
    const [listHistorySearch, setLisHistorySearch] = React.useState([]);
    useFocusEffect(
        React.useCallback(() => {
            fetchall()
            return () => setLisHistorySearch([])
        }, [])
    )
    const fetchall = () => {
        SqlHelper.GetListSearch()
            .then((result: any) => {
                setLisHistorySearch(result)
            })
    }
    const deleteSearch = () => {
        SqlHelper.DeleteManga()
        fetchall()
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={[styles.title,{color}]}>History</Text>
                    {
                        listHistorySearch.length != 0 ? (
                            <TouchableOpacity
                                onPress={() => deleteSearch()}
                            >
                                <Ionicons name="trash-outline" size={20} color={color}/>
                            </TouchableOpacity>
                        ) : null
                    }

                </View>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginVertical: 10 }}>
                    {
                        listHistorySearch.map((item, index) => {
                            return <Item {...{ __Onhandlersubmit, item }} key={index}></Item>
                        })
                    }
                </View>
            </View>
        </>
    );
}
export default React.memo(HistorySearch, isEqual)
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: 'averta_bold',
        fontWeight: 'normal',
    }
})

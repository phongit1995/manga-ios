import React from 'react'
import isEqual from 'react-fast-compare';
import { SafeAreaView, StyleSheet, View, NativeSyntheticEvent } from "react-native";
import Header from './Header';
import Category from './Category/Category'
import HistorySearch from './HistortSearch/HistorySearch';
import { searchComicByName } from './../../api/comic';
import { useDispatch, useSelector } from 'react-redux'
import SqlHelper from './../../common/SQLHelper';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import FormInputSearch from './FormInputSearch';
import { ItemComicProps } from '../../constants/mangaItem.type'
import ListSearch from './ListSearch';
import { RootState } from '../../redux/reducers'
import { changeBackground, changeBackground_, changeBackground__, changeBackground___ } from '../../common/stringHelper';
import NetWork from '../../components/NetWork';
import AdmodService from './../../firebase/Admod';
import { useFocusEffect } from '@react-navigation/native';
import { getListCategory } from './../../api/category';
import { stores, cache } from '../../../App'
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
export interface TextInputSubmitEditingEventData {
    text: string,
}
type categoryItemProps = {
    _id: string,
    name: string,
    image: string
}
const SearchComic = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const [value, onChangeText] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false);
    const [listComic, setListComic] = React.useState<ItemComicProps[]>([]);
    const [istoggle, setistoggle] = React.useState<boolean>(true);

    const [listCategory, setListCategory] = React.useState<categoryItemProps[] | any>([]);

    const [loadings, setLoadings] = React.useState<boolean>(true)
    React.useEffect(() => {
        (async () => {
            try {
                const value = await cache.get("category");
                if (value?.length && value){
                     setListCategory(value);
                     return  setLoadings(false)
                }
                if (isNetWork) {
                    let result = await getListCategory()
                    if (result.status === 200) {
                        setListCategory(result.data.data);
                        setLoadings(false)
                    } else setListCategory([])
                }
            } catch (error) {
                setListCategory([])
            }
        })()
        return () => setListCategory([])
    }, [isNetWork])
    React.useEffect(() => {
        dispatch(dispatchNetWork())
    }, [])

    const _Onhandlersubmit = async ({ nativeEvent }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        if (nativeEvent.text === "") {
            return null;
        }
        onChangeText(nativeEvent.text)
        setistoggle(false)
        setLoading(true);
        try {
            SqlHelper.addSearchManga(nativeEvent.text)
            const result = await searchComicByName(1, 10, nativeEvent.text)
            if (result.data.code == 200 || result.data.status == "success") {
                setListComic([...result.data.data]);
                setLoading(false);

            }
        } catch (error) {
            setListComic([])
        }
    }

    const __Onhandlersubmit = async (e: string) => {
        setistoggle(false)
        setLoading(true);
        onChangeText(e)
        const result = await searchComicByName(1, 10, e)
        try {
            if (result.data.code == 200 || result.data.status == "success") {
                setListComic([...result.data.data]);
                setLoading(false);
            }
        } catch (error) {
            setListComic([])
        }
    }
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: color_ }]}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor={color___}
            />
            <Header {...{ color___ }}></Header>
            <FormInputSearch {...{ value, onChangeText, _Onhandlersubmit, setistoggle, color }}></FormInputSearch>
            {
                !isNetWork ?
                    <NetWork></NetWork> : (
                        <React.Fragment>
                            {
                                istoggle ? (
                                    <View>
                                        <Category {...{ listCategory, loading: loadings, color }}></Category>
                                        <HistorySearch {...{ __Onhandlersubmit, color }}></HistorySearch>
                                    </View>
                                ) : null
                            }
                            {
                                !istoggle ?
                                    (
                                        <ListSearch {...{ loading, network: isNetWork, listComic, color__, color }}></ListSearch>
                                    )
                                    : null
                            }
                        </React.Fragment>
                    )

            }

        </SafeAreaView>
    );
}
export default React.memo(SearchComic, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    }
})

import React, { FunctionComponent } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'react-fast-compare';
import { getListTypeCommic, getListSuggest } from './../../api/comic';
import { getListCategory } from './../../api/category';
import { ItemComicProps } from '../../constants/mangaItem.type'
import { STATUS_BAR_HEIGHT } from '../../constants'
import Header from './Header';
import ListHot from './ListHot';
import Category from './Category';
import ListNewChap from './ListNewChap';
import SuggestComic from './SuggestComic';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import NetWork from '../../components/NetWork';
import TitleHeader from './TitleHeader';
import { RootState } from '../../redux/reducers'
import { stores, cache } from '../../../App'
import {
    changeBackground,
    changeBackground_,
    changeBackground__,
    changeBackground___,
    changeBackground_____,
    changeBackground______,
    changeBackground_______,
    changeBackground________
} from '../../common/stringHelper';
import { useFocusEffect } from '@react-navigation/native';
import { dispatchNetWork } from '../../redux/action/NetWorkAction'
type categoryItemProps = {
    _id: string,
    name: string,
    image: string
}
const MainHome: FunctionComponent = () => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const { isNetWork } = state.NetWorkReduce;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [listComic, setListComic] = React.useState<ItemComicProps[] | any>([]);
    const [listComicNewChap, setListComicNewChap] = React.useState<ItemComicProps[] | any>([]);
    const [listCategory, setListCategory] = React.useState<categoryItemProps[] | any>([]);
    const [listSuggest, setListSuggest] = React.useState<ItemComicProps[] | any>([])
    const [loadingHot, setLoadingHot] = React.useState<boolean>(false)
    const [loadingNew, setLoadingNew] = React.useState<boolean>(true)
    const [loadingSuggest, setLoadingSuggest] = React.useState<boolean>(false)
    const color = changeBackground(isDarkMode)
    const color_ = changeBackground_(isDarkMode)
    const color__ = changeBackground__(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    const color____ = changeBackground_____(isDarkMode)
    const colorStatusBar = changeBackground________(isDarkMode)
    React.useEffect(() => {
        dispatch(dispatchNetWork())
    }, [])
    const cleanState = () => {
        setListCategory([])
        setListComic([])
        setListComicNewChap([])
        setListSuggest([])
    }
    React.useEffect(() => {
        if (stores.getState().FunctionReduce.isPremium) return
    }, [])
    React.useEffect(() => {
        (async () => {
            try {
                if (isNetWork) {
                    _fetchData()
                    _fetchDatalistHot()
                    _fetchDataRecommend()
                }
            } catch (error) {
                setListComic([])
            }
        })()
        return () => {
            setListCategory([])
            setListComic([])
            setListComicNewChap([])
            setListSuggest([])
        }
    }, [isNetWork])
    const _fetchDatalistHot = async () => {
        try {
            setLoadingHot(true)
            getListTypeCommic(1, 10, 0).then(async (result: any) => {
                if (result.data.status === "success") {
                    setListComic(result.data?.data)
                    setLoadingHot(false)
                }
            }).catch(() => setListComic([]))
        } catch (error) {
            setListComic([])
        }
    }
    const _fetchDataRecommend = async () => {
        try {
            setLoadingSuggest(true)
            getListSuggest().then(async (result: any) => {
                if (result.data.status === "success") {
                    setListSuggest(result.data?.data)
                    setLoadingSuggest(false)
                }
            }).catch(() => setListSuggest([]))
        } catch (error) {
            setListComic([])
        }
    }
    const _fetchData = async () => {
        try {
            getListTypeCommic(1, 15, 1).then((result) => {
                if (result.data.status === "success") {
                    setListComicNewChap(result.data?.data)
                    setLoadingNew(false)
                }
            }).catch(() => setListComicNewChap([]))
            const value = await cache.get("category");
            if (value?.length && value) {
                setListCategory(value)
                return setLoading(false)
            };
            setLoading(true)
            getListCategory().then(async (result: any) => {
                if (result?.data?.status === "success") {
                    await cache.set("category", result.data.data);
                    setListCategory(result.data.data);
                    setLoading(false)
                }
            }).catch(() => setListComic([]))

        } catch (error) {
            setListCategory([])
            setListComicNewChap([])
            setListSuggest([])
        }
    }

    const _onHandlerRefresh = () => {
        try {
            setRefreshing(true);
            setLoading(true)
            setLoadingSuggest(true)
            setLoadingHot(true)
            setLoadingNew(true)
            setListCategory([])
            setListComic([])
            setListComicNewChap([])
            setListSuggest([])
            if (isNetWork) {
                _fetchData()
                _fetchDatalistHot()
                _fetchDataRecommend()
            }
            setRefreshing(false)
        } catch (error) {
            setListCategory([])
            setListComic([])
            setListComicNewChap([])
            setListSuggest([])
        }
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: color__ }]}>
            <FocusAwareStatusBar
                barStyle={colorStatusBar}
                hidden={true}
                translucent={true}
                backgroundColor={color___}
            />
            <ScrollView
                scrollEventThrottle={10}
                style={styles.container}
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.containerScroll}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={_onHandlerRefresh} />
                }
            >
                <TitleHeader {...{ color____ }}></TitleHeader>
                <View style={styles.containerSearch}>
                    <View style={{ backgroundColor: color__ }}>
                        <Header />
                    </View>
                </View>
                {
                    !isNetWork ? (
                        <NetWork></NetWork>
                    ) : (
                        <View style={styles.containerBody}>
                            <ListHot {...{ listComic, loading: loadingHot, type: 0, color__, color____ }}></ListHot>
                            <Category {...{ listCategory, color____, loading }}></Category>
                            <ListNewChap {...{ listComicNewChap, loading: loadingNew, color__, color____ }}></ListNewChap>
                            <SuggestComic {...{ loading: loadingSuggest, listComic: listSuggest, color__, color____ }} />
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default React.memo(MainHome, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerScroll: {
        marginTop: 0,
    },
    containerSearch: {
        elevation: 5,
    },
    containerBody: {
        marginBottom: STATUS_BAR_HEIGHT + 60
    }
})

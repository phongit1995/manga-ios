import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { DetailChapProps } from '../DetailComic'
import Loading from '../../../components/Loading';
import SqlHelper from '../../../common/SQLHelper';
import Item from './Item';
import { stores } from '../../../../App'
export type itemProps = {
    commentCount: number
    createdAt: string
    index: number
    name: string
    __v: number
    _id: string
}

type itemChapProps = {
    dataTotleChap: any,
    item: any,
    id_: string,
    data: DetailChapProps | null,
    isloadingPage: boolean,
    listChapRead: any,
    color________: string,
    color____: string,
    color__: string,
    page: number,
}

const ItemChap: FunctionComponent<itemChapProps> = ({ page, listChapRead, dataTotleChap, item, id_, data, isloadingPage, color________, color____, color__ }) => {
    const { _id } = item
    const [listChapDown, setListChapDown] = React.useState<any>([])
    const [count, setCount] = React.useState<number>(1)
    const isPremium = stores.getState().FunctionReduce.isPremium
    React.useEffect(() => {
        (() => {
            SqlHelper.GetListChapterByMangaDowload_(_id)
                .then((result: any) => {
                    if (result.length != 0) {
                        setListChapDown(result)

                    }
                })
        })()
        return () => setListChapDown([])
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: color__ }]}>
            {
                isloadingPage ? (
                    <Loading></Loading>
                ) :
                    data?.data.length === 0 ? <Text style={styles.txtUpdate}>updating...</Text> : data?.data.map((i: itemProps, index_: number) => <Item {...{ isPremium, count, setCount ,page,index_,listChapDown,listChapRead,}} color________={color________} color__={color____} __id={_id} _item={item} id_={id_} item={i} dataTotleChap={dataTotleChap} key={i._id}></Item>)
            }
        </View>
    );
};
export default React.memo(ItemChap, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    Chapter_: {
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    containerTitl: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    txtUpdate: {
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'Montserrat-Light',
    }
})


import React, { FunctionComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import isEqual from 'react-fast-compare';
import { DetailChapProps } from '../DetailComic'
import ModalPage from './ModalPage';
interface objProps {
    label: string,
    value: string,
}
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
type TitleChapterProps = {
    data: DetailChapProps | null,
    page: number,
    setPage: (e: number) => void,
    dataTotleChap: number,
    color________: string,
    color__: string,
    color____: string
}

const TitleChapter: FunctionComponent<TitleChapterProps> = ({ page, setPage, dataTotleChap, color________, color__, color____ }) => {
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    return (
        <View>
            <View style={[styles.container, { backgroundColor: color__ }]}>
                <Text style={[
                    styles.txt, {
                        color: color________
                    }
                ]}>Chapter {dataTotleChap}</Text>
                <View style={styles.containerRight}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            marginLeft: 15
                        }}
                        onPress={() => setModalVisible(true)}>
                        <AntDesign name="appstore-o" size={20} color={color________} />
                    </TouchableOpacity>
                </View>
            </View>
            <ModalPage {...{ page, setPage, modalVisible, setModalVisible, dataTotleChap, color__, color________,color____ }}></ModalPage>
        </View>
    );
};
export default React.memo(TitleChapter, isEqual)

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        paddingBottom: 13,
        paddingTop: 13,
        paddingHorizontal: 10
    },
    containerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    txt: {
        fontSize: 16,
        paddingTop: 0,
        color: '#000',
        fontFamily: 'Averta-Bold',
    }
})


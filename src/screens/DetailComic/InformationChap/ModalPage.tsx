
import React, { FunctionComponent } from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ToastAndroid,
    ScrollView,
} from "react-native";
import { SCREEN_HEIGHT, } from '../../../constants'
import { RectButton } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
type modalsProps = {
    setPage: any,
    modalVisible: boolean,
    setModalVisible: (e: boolean) => void,
    dataTotleChap: number,
    page: number,
    color__: string,
    color________: string,
    color____: string
}

const ModalPage: FunctionComponent<modalsProps> = ({ page, setPage, modalVisible, setModalVisible, dataTotleChap, color__, color________, color____ }) => {

    const [selectedValue, setSelectedValue] = React.useState<number>(0);

    React.useEffect(() => {
        (() => {
            if (dataTotleChap != 0) {
                setSelectedValue(Math.ceil(dataTotleChap / 20))
            }
        })()
    }, [dataTotleChap])

    const showchap = () => {
        return (
            <>
                {
                    Array.from(Array(selectedValue).keys()).map((item, index) => {
                        let begin = 20
                        return (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                key={item} style={{
                                    width: 120,
                                    height: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: page - 1 === index ? '#EE3340' : '#000',
                                    marginRight: 10,
                                    marginBottom: 5,
                                    borderRadius: 10,
                                    marginTop: 5
                                }}
                                onPress={() => {

                                    setPage(index + 1)
                                    setModalVisible(false)
                                }}
                            >
                                <Text style={{ color: '#fff' }}>
                                    {

                                        (item === 0 ? 0 : begin) * (item) + 1} - {item + 1 === selectedValue ? dataTotleChap : (((item) === 0 ? 0 : begin) * (item + 1)) + (item === 0 ? 20 : 0)

                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </>
        )
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
            >
            </TouchableOpacity>
            <View style={[styles.container, { backgroundColor: color__ }]}>
                <View style={styles.modalView}>
                    <View style={[styles.containerTotle,{      backgroundColor: color__}]}>
                        <Text style={[styles.txtTitle, { color: color________ }]}>Chapter <Text style={{ color: '#EE3340' }}>{dataTotleChap}</Text></Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => setModalVisible(false)}
                        >
                            <AntDesign name="close" size={25} color={color________}></AntDesign>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 5, marginBottom: 5, }}
                    >
                        <View style={{
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 5,
                        }}>
                            {
                                showchap()
                            }
                        </View>
                    </ScrollView>
                </View>

            </View>
        </Modal >

    );
};
export default React.memo(ModalPage);
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: '#000000AA'
    },
    modalView: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: SCREEN_HEIGHT / 1.5,
        right: '0%',
        bottom: '0%',


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    txtTitle: {
        fontSize: 17,
        fontFamily: 'Averta-Bold',
        color: '#fff',
        textAlign: 'center'
    },
    containerTotle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        elevation: 1,
  
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    }
});

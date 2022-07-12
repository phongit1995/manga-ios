import React, { FunctionComponent } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SCREEN_HEIGHT, } from './../../constants'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider';
import ScreenBrightness from 'react-native-screen-brightness';
import { useDispatch, useSelector } from 'react-redux'
import { dispatchBrightness, dispatchTurn } from '../../redux/action/FunctionAction'
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/reducers'
type modalsProps = {
    modalVisible: boolean,
    _setModalVisible: (e: boolean) => void,
    isTurn: number,
    color_: string,
    color__: string,
}
const Modals: FunctionComponent<modalsProps> = ({ color_, color__, isTurn, modalVisible, _setModalVisible }) => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state)
    const { numberLight } = state.FunctionReduce;

    const _OnchangeBrightness = async (e) => {
        let hasPerm = await ScreenBrightness.hasPermission();
        if (!hasPerm) {
            ScreenBrightness.requestPermission();
            return;
        }
        ScreenBrightness.setBrightness(e * 0.2);
        dispatch(dispatchBrightness(e))
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => _setModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.centeredView}
                activeOpacity={1}

                onPress={() => _setModalVisible(false)}
            >
            </TouchableOpacity>
            <View style={[styles.containerModal, { backgroundColor: color_, }]}>
                <View style={styles.modalView}>
                    <View style={styles.iconTurn}>
                        <Text style={[styles.txt, { color: color__ }]}>Turn</Text>
                        <View style={[styles.Touchable]}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(dispatchTurn(0))
                                    _setModalVisible(false)
                                }}
                            >
                                <Ionicons style={[styles.icon, {}]} color={isTurn === 0 ? '#d34150' : color__} name="phone-portrait-outline" size={30}></Ionicons>
                            </TouchableOpacity>
                            <Text style={[{ color: isTurn === 0 ? '#d34150' : color__, fontFamily: 'Nunito-Bold', }]}>Vertical</Text>
                        </View>
                        <View style={styles.Touchable}>
                            <TouchableOpacity
                                onPress={() => {
                                    dispatch(dispatchTurn(1))
                                    _setModalVisible(false)
                                }}
                            >
                                <Ionicons style={[styles.icon, {}]} color={isTurn === 1 ? '#d34150' : color__} name="phone-landscape-outline" size={30}></Ionicons>
                            </TouchableOpacity>
                            <Text style={[{ color: isTurn === 1 ? '#d34150' : color__, fontFamily: 'Nunito-Bold' }]}>Horizontal</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={[{ marginRight: 20, fontSize: 15, fontFamily: 'Nunito-Bold' }, { color: color__ }]}>Brightness</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={5}
                            step={1}
                            thumbTintColor="#d34150"
                            minimumTrackTintColor={color__}
                            maximumTrackTintColor={color__}
                            value={numberLight}
                            style={{ flex: 1 }}
                            onValueChange={_OnchangeBrightness}
                        />
                    </View>
                </View>
            </View>
        </Modal >

    );
};
export default React.memo(Modals);
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000000AA'
    },
    modalView: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    iconTurn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt: {
        fontSize: 15,
        paddingRight: 15,
        fontFamily: 'Nunito-Bold'
    },
    icon: {
        paddingHorizontal: 25,

    },
    Touchable: {

        alignItems: 'center',
    },
    containerModal: {
        position: 'absolute',
        width: '100%',
        height: SCREEN_HEIGHT / 4,
        right: '0%',
        bottom: '0%',

        alignItems: "center",
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
    }
});

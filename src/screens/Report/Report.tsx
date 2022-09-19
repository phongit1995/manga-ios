import React, { FunctionComponent } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ToastAndroid,
} from "react-native";
import { SCREEN_HEIGHT, } from './../../constants'
import { postReport } from '../../api/report'
import Toast from 'react-native-toast-message';
type modalsProps = {
    modalVisible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    id: string
}

const Report: FunctionComponent<modalsProps> = ({ modalVisible, setModalVisible, id }) => {
    const [reason, setreason] = React.useState<string>('')
    const OnPreshandlerReport = async () => {
        if (reason === '') 
        return Toast.show({
            type:"error",
            text1:"error",
            text2:"Select the content of the report 👌",
            visibilityTime:5000,
        }) 
        try {
            const result = await postReport(id, reason)
            if (result.data.status === "success") {
                return Toast.show({
                    type:"error",
                    text1:"error",
                    text2:"Has submitted an error report 👌🏽",
                    visibilityTime:5000,
                }) 
            }
            setModalVisible(false)
        } catch (error) {
            console.log(error.data)
        }
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
            <View style={styles.containerModal}>
                <View style={styles.modalView}>
                    <Text style={styles.txtTitle}>Select report content</Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.commandButton, {
                            backgroundColor: reason === "Sensitive content" ? '#A46329' : 'rgba(52, 52, 52, 0.8)'
                        }]}
                        onPress={() => {
                            setreason('Sensitive content')

                        }} >
                        <Text style={styles.panelButtonTitle}>Sensitive content</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.commandButton, {
                            backgroundColor: reason === "The story has content" ? '#A46329' : 'rgba(52, 52, 52, 0.8)'
                        }]}
                        onPress={() => {
                            setreason('The story has content')
                        }}>
                        <Text style={styles.panelButtonTitle}>The story has content</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={[styles.commandButton, {
                            backgroundColor: reason === "Other" ? '#A46329' : 'rgba(52, 52, 52, 0.8)'
                        }]}
                        onPress={() => {
                            setreason('Other')
                        }}>
                        <Text style={styles.panelButtonTitle}>Other</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.commandButton} onPress={() => OnPreshandlerReport()}>
                        <Text style={styles.panelButtonTitle}>Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setModalVisible(false)}
                        style={styles.panelButton}
                    >
                        <Text style={styles.panelButtonTitle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >

    );
};
export default React.memo(Report);
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
    commandButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',

    },
    panelButton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        marginTop: 10,
        width: '100%'
    },
    panelButtonTitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-Light',
        color: 'white',
    },
    txtTitle: {
        fontSize: 20,
        fontFamily: 'Averta-Bold',
        color: '#000',
        paddingBottom: 10,
        textAlign: 'center'
    },
    containerModal: {
        position: 'absolute',
        width: '100%',
        height: SCREEN_HEIGHT / 2,
        right: '0%',
        bottom: '0%',
        backgroundColor: '#fff',
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

import React, { FunctionComponent, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, BackHandler, Linking } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH_No } from "../../constants";
import { getBundleId } from 'react-native-device-info';
const CustomModal: FunctionComponent<any> = ({ dispatchLogout, onHandlerrDeleteAcpectChap, onHandlerCleanCacheAcpect, onHandlerrDeleteAcpect, onHandlerAcess, modalVisible, setModalVisible, type,
  children,
  title }) => {
  const onHandlerAction = () => {
    if (type === 2) {
      onHandlerrDeleteAcpect()
      setModalVisible(false)
      return
    }
    if (type === 0) return Linking.openURL("market://details?id=" + getBundleId());
    if (type === 3) {
      onHandlerCleanCacheAcpect()
      setModalVisible(false)
      return
    }
    if (type === 4) {
      onHandlerrDeleteAcpectChap()
      setModalVisible(false)
      return
    }
    if (type === 5) {
      dispatchLogout()
      setModalVisible(false)
      return
    }
    onHandlerAcess()
    setModalVisible(false)
    // BackHandler.exitApp();
  }
  const onHandlerActionCancle = () => {

    // BackHandler.exitApp();
    setModalVisible(false)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{type === 0 ? '🚀' : ''} {title}!</Text>
          <Text style={styles.modalText}> {children} </Text>
          <View style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => onHandlerActionCancle()}
            >
              <Text style={styles.textStyle}>{type === 0 ? 'Cancel' : 'No'}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose, { backgroundColor: '#ff4545' }]}
              onPress={() => onHandlerAction()}
            >
              <Text style={styles.textStyle}>{type === 0 ? 'Update' : 'Yes'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    justifyContent: "center",

    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SCREEN_WIDTH_No * 0.7,
    height: SCREEN_WIDTH_No * 0.5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '48%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#1fcf84",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  textStyle: {
    color: "white",
    fontFamily: 'Nunito-Bold',
    textAlign: "center"
  },
  modalText: {
    marginVertical: 10,
    color: '#000',
    fontFamily: 'averta',
    textAlign: "center"
  },
  modalTitle: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Nunito-Bold',
    textAlign: "center"
  }
});

export default CustomModal;
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as screen from '../../../constants/ScreenTypes'
import isEqual from 'react-fast-compare';
import { RectButton } from 'react-native-gesture-handler';
import AdmodService from '../../../firebase/Admod';
const Item: FunctionComponent<any> = ({ item }) => {
    const navigation = useNavigation()
 
    return (
        <RectButton
            onPress={() => {
                AdmodService.showAdsFull(screen.CATEGORY_SCREEN, { key: item.name },null);
            }}
            style={styles.container}
        >
            <Text style={styles.txt}>{item?.name}</Text>
        </RectButton>
    );
}
export default React.memo(Item, isEqual)
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f4eb',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 10,
        borderRadius: 5
    },
    txt: {
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Montserrat-Light',
    }
})

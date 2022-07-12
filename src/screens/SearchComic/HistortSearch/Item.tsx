import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from "react-native";
import isEqual from 'react-fast-compare';
import { RectButton } from 'react-native-gesture-handler';

type ItemHistorySearchProps = {
    text: string,
    date_time: number
}

type ItemProps = {
    __Onhandlersubmit: (e: string) => void,
    item: ItemHistorySearchProps
}
const Item: FunctionComponent<ItemProps> = ({ __Onhandlersubmit, item }) => {
    return (
        <RectButton
            onPress={() => __Onhandlersubmit(item?.text)}
            style={styles.container}
            activeOpacity={0.7}>
            <Text style={styles.txt}>{item?.text}</Text>
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

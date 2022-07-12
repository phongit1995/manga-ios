import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, Animated } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../../constants';
import isEqual from 'react-fast-compare';
export const iconBack = require('../../assets/image/y3.png');
type headerProps = {
    item:any,
    opacity: any
}

const HeaderName: FunctionComponent<headerProps> = ({ item, opacity }) => {

    return (
        <Animated.View style={[styles.containerName, { opacity }]}>
            <Text
                numberOfLines={1}
                style={styles.txtName}>{item.name}</Text>
        </Animated.View>
    )
}

export default React.memo(HeaderName, isEqual);

const styles = StyleSheet.create({
    containerName: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT + 5,
        marginHorizontal: 40,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        zIndex: 999,
    },
    txtName: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'averta_bold',
    }
})
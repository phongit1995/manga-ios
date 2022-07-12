import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
export const ic_network_fail = require('../../assets/image/ic_network_fail.png');

const Loading: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                style={styles.tinyicon}
                source={ic_network_fail}></Image>
        </View>
    );
};
export default React.memo(Loading, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    tinyicon: {
        width: 200,
        height: 200,
    },
})

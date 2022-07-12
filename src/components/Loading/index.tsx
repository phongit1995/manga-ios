import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

const Loading: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </View>
    );
};
export default React.memo(Loading, isEqual)

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#343a40',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 3,
        width: 50,
        height: 50,
        borderRadius: 100
    },
    tinyiconLeft: {
        width: 35,
        height: 35,
    },
})

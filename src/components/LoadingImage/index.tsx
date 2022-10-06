import React, { FunctionComponent } from 'react';
import isEqual from 'react-fast-compare';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
export const iconload = require('../../assets/image/lf30_editor_tjxfaqaj.json');
// import LottieView from 'lottie-react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH_No } from '../../constants';

const LoadingImage: FunctionComponent<any> = () => {
    return (
        <View style={[styles.loading]}>
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    color: '#FFF',
                    fontFamily: 'Nunito-Bold',
                }}>
                    Loading images...
            </Text>
                <Text style={{
                    color: '#FFF',
                    fontFamily: 'Nunito-Bold',
                }}>
                    please wait a moment.
            </Text>
            </View>
            {/* <LottieView
                source={iconload}
                autoPlay
                loop={true}
                style={styles.tinyiconLeft}
                speed={1.5}

            /> */}
        </View>
    );
};
export default React.memo(LoadingImage, isEqual)

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212529',
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH_No
    },
    tinyiconLeft: {
        width: 150,
        height: 150,
        top:-20
    },
})

import React, {useRef} from 'react';
import isEqual from 'react-fast-compare';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH_No, STATUS_BAR_HEIGHT, } from '../../constants';
import FastImage from 'react-native-fast-image'
import LoadingImage from '../../components/LoadingImage';
import ImageViewer from "./ImagePanZoom";
const ImageFullWith = React.memo(({
    url,
    isTurn,
    scrollY,
    scrollYFooter,
 }: any): any => {
    const [heightImage, setHeightImage] = React.useState<number>(7000);
    const [indicator, Setindicator] = React.useState<boolean>(true);
    const scaleValue = useRef(1);

        return (
          <ImageViewer
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={SCREEN_WIDTH_No}
            imageHeight={heightImage}
            minScale={1}
            onStartShouldSetPanResponder={(e) => {
              return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
            }}
            onMove={({scale}) => {
              scaleValue.current = scale;
            }}
          >
            <FastImage
                style={{
                    width: SCREEN_WIDTH_No,
                    height: heightImage
                }}
                source={{
                    uri: url,
                    headers: {
                        Referer: "https://manganelo.com/"
                    },
                    priority: FastImage.priority.normal,

                }}
                onLoadStart={() => {
                    Setindicator(true)
                }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadEnd={() => {
                    Setindicator(false)
                }}
                onLoad={evt => {
                    setHeightImage(evt.nativeEvent.height / evt.nativeEvent.width * SCREEN_WIDTH_No)
                }}
            >
                {
                    indicator ? <View style={{
                        top: -  (SCREEN_HEIGHT / 12) + 10,
                        height: SCREEN_HEIGHT,
                        width: SCREEN_WIDTH_No,
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <LoadingImage ></LoadingImage>
                    </View> : null
                }
            </FastImage>
          </ImageViewer>

        )

})
export default React.memo(ImageFullWith, isEqual)

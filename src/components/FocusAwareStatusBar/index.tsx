import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import isEqual from 'react-fast-compare';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    console.log('isFocused',isFocused);
    //return isFocused ? <StatusBar {...props} setStyleStatusBar="black"/> : null;
    return <StatusBar  setStyleStatusBar="black" {...props}/> ;
}
export default React.memo(FocusAwareStatusBar, isEqual)
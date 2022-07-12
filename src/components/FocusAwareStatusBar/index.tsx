import * as React from 'react';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import isEqual from 'react-fast-compare';

function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} setStyleStatusBar="black"/> : null;
}
export default React.memo(FocusAwareStatusBar, isEqual)
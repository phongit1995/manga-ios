import * as React from 'react';
import { NavigationContainerRef ,StackActions} from '@react-navigation/native'
export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
}
export function replace(name: string, params?: object): void {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
}
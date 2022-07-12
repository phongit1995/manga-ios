import React, { ReactElement } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native'
import TabBar from './TabBar';
import { tabs } from '../../themes/icons'
import { useDispatch, useSelector } from 'react-redux'
import { SCREEN_WIDTH_No } from '../../constants';
export default ({ state, navigation }) => {
    const states = useSelector((state: any) => state)
    const { isDarkMode} = states.FunctionReduce;

    return (
        <View style={[{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0
        }, { width: SCREEN_WIDTH_No }]}>
            <View style={{
                width: '80%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isDarkMode ? 1 : undefined,
                borderColor: '#fff',
                backgroundColor: isDarkMode ? '#111217' : '#d34150',
                borderRadius: 40,
                bottom: 15,
            }}>
                {state.routes.map((route: { params: { icon: ReactElement; }; key: string | number | null | undefined; name: string; }, index: number) => {
                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        })
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };
                    return (
                        <TabBar
                            key={route.key}
                            {...{ isFocused, index }}
                            onPress_={onPress}
                        >
                            {tabs[index]}
                        </TabBar>
                    );
                })}
            </View>
        </View>
    );
}

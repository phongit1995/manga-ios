import * as React from 'react';
import { View, Dimensions, Text, ToastAndroid, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar, Route, TabBarIndicatorProps, TabBarProps } from 'react-native-tab-view';
import History from './History';
import Follow from './Follow';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Header from './Header'
import { Scene } from 'react-native-tab-view/lib/typescript/src/types';
import isEqual from 'react-fast-compare';
import Download from './Download';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
export const iconFeather = require('../../assets/image/feathers.png');
import {
    changeBackground___,
    changeBackground____,
    changeBackground_,
    changeBackground__,
    changeBackground,
    changeBackground_____,
    changeBackground______
} from '../../common/stringHelper';
import FastImage from 'react-native-fast-image';
const initialLayout = { width: Dimensions.get('window').width };
const Activity = () => {
    const [index, setIndex] = React.useState<number>(0);
    const state = useSelector((state: RootState) => state)
    const { isDarkMode } = state.FunctionReduce;
    const [routes] = React.useState([
        { key: 'first', title: 'History' },
        { key: 'second', title: 'Follow' },
        { key: 'third', title: 'Download' },
    ]);
    const color = changeBackground_(isDarkMode)
    const color_ = changeBackground__(isDarkMode)
    const color__ = changeBackground(isDarkMode)
    const color___ = changeBackground___(isDarkMode)
    const color____ = changeBackground_____(isDarkMode)
    const colorBorder = changeBackground____(isDarkMode)

    const showAlert = () => {
        return ToastAndroid.show('Delete Success', ToastAndroid.CENTER)
    }
    const showAlertFaile = () => {
        return ToastAndroid.show('Delete Fail 👋', ToastAndroid.CENTER)
    }
    const FirstRoute = () => (
        <History {...{ colorBorder, showAlert, showAlertFaile, color_, color, color__, isDark: isDarkMode }}></History>

    );
    const SecondRoute = () => (
        <Follow {...{ colorBorder, showAlert, showAlertFaile, color_, color, color__, isDark: isDarkMode }}></Follow>
    );
    const ThridRoute = () => (
        <Download {...{ colorBorder, showAlert, showAlertFaile, color_, color, color__, isDark: isDarkMode }}></Download>
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThridRoute,
    });
    const renderTabBar = (props: JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<TabBar<Route>> & Pick<Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode; }>, "style" | "children" | "position" | "navigationState" | "layout" | "jumpTo" | "scrollEnabled" | "bounces" | "activeColor" | "inactiveColor" | "pressColor" | "pressOpacity" | "renderLabel" | "renderIcon" | "renderBadge" | "renderTabBarItem" | "onTabPress" | "onTabLongPress" | "tabStyle" | "indicatorStyle" | "indicatorContainerStyle" | "labelStyle" | "contentContainerStyle"> & Partial<Pick<Readonly<TabBarProps<Route>> & Readonly<{ children?: React.ReactNode; }>, "getLabelText" | "getAccessible" | "getAccessibilityLabel" | "getTestID" | "renderIndicator">> & Partial<Pick<{ getLabelText: ({ route }: Scene<Route>) => string | undefined; getAccessible: ({ route }: Scene<Route>) => boolean; getAccessibilityLabel: ({ route }: Scene<Route>) => string | undefined; getTestID: ({ route }: Scene<Route>) => string | undefined; renderIndicator: (props: TabBarIndicatorProps<Route>) => JSX.Element; }, never>>) => (
        <TabBar
            {...props}
            renderLabel={({ route, focused, color }) => (
                <View style={styles.containerItem}>
                    <Text style={{ color: focused ? "#d34150" : isDarkMode ? '#FFF' : "#03045e", fontFamily: 'Averta-Bold', fontSize: 16 }}>
                        {route.title}
                    </Text>
                    {
                        focused ? <FastImage source={iconFeather} style={styles.tiny}></FastImage> : null
                    }
                </View>
            )}
            indicatorStyle={{ backgroundColor: color___ }}
            style={{ backgroundColor: color___ }}
        />
    );

    return (
        <View style={{ flex: 1, backgroundColor: color_, }}>
            <FocusAwareStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                hidden={false}
                translucent={true}
                backgroundColor={color___}
            />
            <Header {...{ color___, color____ }}></Header>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={initialLayout}
            />
        </View>
    );
}
export default React.memo(Activity, isEqual)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toast: { zIndex: 9999, elevation: 1000 },
    containerItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    txt: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16
    },
    tiny: {
        width: 15, height: 15, marginLeft: 5,
        top: -10,
        right: 5
    }
})
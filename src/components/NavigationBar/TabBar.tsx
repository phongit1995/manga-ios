import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity
} from "react-native";
export default ({
    children,
    onPress_,
    isFocused,
}: any) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={style.containerItem}
            onPress={() => {
                onPress_()
            }}
        >
            <View
                style={{
                    paddingHorizontal: 10,
                    // backgroundColor: isFocused ? '#D6040E' : '#111217',
                    borderRadius: 10,
                    paddingVertical: 10
                }}
            >

                {React.cloneElement(children.icon, isFocused && { active: true })}
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    containerItem:{
        width: '25%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
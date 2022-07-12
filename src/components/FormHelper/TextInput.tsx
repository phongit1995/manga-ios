import React from 'react'
import { View, TextInput, StyleSheet, Text, ToastAndroid, GestureResponderEvent } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface TextInputsProps {
    icon: string,
    placeholder: string,
    name: string,
    value: string,
    errors?: string,
    touched?: boolean,
    onChange: (e: string) => void,
    onBlur: (e: string) => void,
    secureTextEntry?: boolean,
    onPresssecureTextEntry?: () => void,
    onPressCleanText?: ((event: GestureResponderEvent) => void) | any,
    autoCompleteType: string,
    returnKeyLabel: string,
    returnKeyType: string,
    keyboardType?: boolean,
}
const SIZE = 20
export default function TextInputs({
    icon,
    name,
    placeholder,
    errors,
    touched,
    onChange,
    onBlur,
    value,
    secureTextEntry,
    onPresssecureTextEntry,
    autoCompleteType,
    returnKeyLabel,
    returnKeyType,
    keyboardType,
    onPressCleanText,
    ...props
}: TextInputsProps) {
    const color = !touched ? "#6c757d" : errors ? "#e63946" : "#2CB9B0";

    return (
        <View style={{ flex: 1 }}>
            <View style={[
                styles.container,
                {
                    borderColor: color
                }
            ]}>
                <View style={{ padding: 10 }}>
                    <Ionicons
                        name={icon}
                        size={20}
                        {...{ color }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput
                        value={value}
                        underlineColorAndroid="transparent"
                        placeholderTextColor={color}
                        keyboardType={keyboardType ? "numeric" : "default"}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        secureTextEntry={secureTextEntry}
                        {...props}
                    ></TextInput>
                </View>

                {
                    name === "password" && (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={onPresssecureTextEntry}
                        >
                            <View
                                style={{
                                    height: SIZE,
                                    width: SIZE,
                                    backgroundColor: "#2CB9B0",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 15,
                                    marginRight: 10
                                }}
                            >
                                <FontAwesome
                                    name={secureTextEntry ? "eye-slash" : "eye"}
                                    size={15}
                                    color="#fff"
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }
                {
                    touched && (
                        <TouchableOpacity style={{
                            height: SIZE,
                            width: SIZE,
                            backgroundColor: color,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 15,
                            marginRight: 10
                        }}
                            onPress={errors ? onPressCleanText : null}
                        >
                            <Feather
                                name={errors ? "x" : "check"}
                                size={15}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
            {
                touched && errors ? (
                    <View style={styles.err}>
                        <Text style={[styles.txterr, { color: '#e63946' }]}>{errors}</Text>
                    </View>
                ) : null
            }

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 12, height: 12 },
        shadowColor: '#489dcf',
        shadowOpacity: 1.0,
        shadowRadius: 18,
        elevation: 3,
        marginBottom: 15
    },
    err: {

        position: 'absolute',
        bottom: -5,

        right: 0,
        width: '100%',

        zIndex: 999,
        elevation: 1000,
    },
    txterr: {

        fontSize: 12,
        fontFamily: 'averta',
        fontWeight: 'normal',
        color: '#000',
    }
})
import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';



const SIZE = 20
const CheckBox = (props: { children: React.ReactNode; }) => {

    const [isChecked, setChecked] = React.useState<boolean>(false)

    const _onPressChecked = (): void => {
        setChecked((isChecked) => !isChecked)
    }

    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => _onPressChecked()}>
                <View style={{
                    flexDirection: 'row'
                }}
                >
                    <View style={{
                        borderRadius: 5,
                        backgroundColor: isChecked ? '#fff' : '#1fcf84',
                        height: SIZE,
                        width: SIZE,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: "#1fcf84",
                        marginRight: 10
                    }}
                    >

                        <Feather
                            name="check"
                            color="#fff"
                        >
                        </Feather>

                    </View>
                    <Text style={{ color: '#6c757d', fontFamily: 'Nunito-Bold', }}>{props.children}</Text>
                </View>
            </TouchableOpacity >
        </>
    )
}
export default React.memo(CheckBox)

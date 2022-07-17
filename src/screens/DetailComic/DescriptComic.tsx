import React, { FunctionComponent } from 'react'
import isEqual from 'react-fast-compare';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ItemComicProps } from '../../constants/mangaItem.type'
import EvilIcons from 'react-native-vector-icons/Entypo'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as screen from './../../constants/ScreenTypes';
import AdmodService from './../../firebase/Admod';
type DescriptComicProps = {
    item: ItemComicProps,
    color________: string,
    color____: string,
    color__: string
}

const DescriptComic: FunctionComponent<DescriptComicProps> = ({ item, color________, color____, color__ }) => {
    const navigation = useNavigation<any>();
    const [txtdescript, setDes] = React.useState<boolean>(false)

    const showCategory = React.useCallback(() => {
        if (item) {
            return item?.category?.map((item, index: React.Key | null | undefined) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            AdmodService.showAdsFull(screen.CATEGORY_SCREEN, { key: item },'replace');
                        }}
                        key={index}
                        activeOpacity={0.7}>
                        <Text style={[styles.normal, {
                            color: color____
                        }]}>{item}</Text>
                    </TouchableOpacity>
                )
            })
        }
        return null

    }, [])

    return (
        <View style={[styles.container, { backgroundColor: color__ }]}>
            <Text style={[styles.title, { color: color________ }]}>What's it about?</Text>
            <Text numberOfLines={txtdescript ? 1000 : 3} style={[styles.name, { color: color____ }]}>{item?.description && item?.description === '' ? 'Read will clearly ...' : item?.description}</Text>
            <View style={styles.containerCategory}>
                {showCategory()}
            </View>
            <View style={styles.containerIcon}>
                {
                    !txtdescript ? (<TouchableOpacity
                        onPress={() => setDes(!txtdescript)}
                    >
                        <EvilIcons name="chevron-down" size={20} color={color____} />
                    </TouchableOpacity>) : (<TouchableOpacity
                        onPress={() => setDes(!txtdescript)}
                    >
                        <EvilIcons name="chevron-up" size={20} color={color____} />
                    </TouchableOpacity>)
                }
            </View>
        </View>
    )
}
export default React.memo(DescriptComic, isEqual)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'


    },
    name: {
        fontSize: 13,
        color: '#5c6b73',
        fontFamily: 'Montserrat-Light',
        marginVertical: 5
    },
    title: {
        fontSize: 18, fontFamily: 'Averta-Bold',
    },
    normal: {
        fontFamily: 'Montserrat-Light',
        color: '#5c6b73',
        paddingVertical: 5,
        fontSize: 10,
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#8f9193'
    },
    containerCategory: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 10,

    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    }
})
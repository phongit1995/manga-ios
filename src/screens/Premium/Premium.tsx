import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../../constants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
export const iconcommunityFocus = require('../../assets/image/premium.png');
export const iconbg = require('../../assets/image/ac5.png');
export const start = require('../../assets/image/a5v.png');
import AntDesign from 'react-native-vector-icons/AntDesign';
import analytics from '@react-native-firebase/analytics';
import {
    getSubscriptions,
    requestSubscription,
    Subscription,
    getProducts,
    requestPurchase
} from 'react-native-iap';
const subcriptionsIds: string[] = Platform.select({
    ios: [],
    android: [
        "manga.reader.best.manga.app.one.month",
        "manga.reader.best.manga.app.three.month",
        "manga.reader.best.manga.app.six.month",
    ]
}) as string[]
// const BuyProducts: string[] = Platform.select({
//     ios: [],
//     android: [
//         "king.of.app.manga.vip.lifetime"
//     ]
// }) as string[]
export default function Premium() {
    const navigation = useNavigation();
    const [subcriptionSelect, setSubcriptionSelect] = useState<string>(subcriptionsIds[0]);
    const [listSubcriptions, setListSubcriptions] = useState<Subscription[]>([]);
    const [listProduct, setListProduct] = useState<any[]>([]);
    // const [ProductSelect, setProductSelect] = useState<string>('');
    useEffect(() => {
        getSubscriptions(subcriptionsIds).then((data: Subscription[]) => {
            let listNewData = data.sort((a, b) => (parseInt(a.price) - parseInt(b.price)));
            setListSubcriptions(listNewData);
        })
        // getProducts(BuyProducts).then((data: any[]) => {
        //     let listNewData = data.sort((a, b) => (parseInt(a.price) - parseInt(b.price)));
        //     setListProduct(listNewData);
        // })
    }, [])
    const showMonthString = (productId: string): string => {

        let resultMonth: string = "1";
        if (productId == subcriptionsIds[0]) {
            resultMonth = "1";
        }
        if (productId == subcriptionsIds[1]) {
            resultMonth = "3";
        }
        if (productId == subcriptionsIds[2]) {
            resultMonth = "6";
        }
        return resultMonth;
    }
    const _OnBuySubcriptions = async () => {
        try {
            analytics().logEvent("ON_CLICK_BUY_INAPP");
            // if (ProductSelect != '') {
            //     return requestPurchase(ProductSelect, false).then((result) => {
            //         ToastAndroid.show("Buy Success", ToastAndroid.SHORT)
            //     }).catch((e) => {
            //         ToastAndroid.show(e.message, ToastAndroid.SHORT)
            //     })
            // }
            requestSubscription(subcriptionSelect).then((result) => {
                ToastAndroid.show("Buy Success", ToastAndroid.SHORT)
            }).catch((e) => {
                ToastAndroid.show(e.message, ToastAndroid.SHORT)
            });
            analytics().logEvent("BUY_INAPP_SUCCESS");
        } catch (error) {
            analytics().logEvent("CANCEL_INAPP");
        }

    }
    const showOptionBuy = () => {
        return listSubcriptions.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => {
                        setSubcriptionSelect(item.productId)
                        // setProductSelect('')
                    }}
                    style={styles.wrapperBg}>
                    <LinearGradient
                        colors={['#9F015F', '#F9c929']}
                        useAngle={true}
                        angle={145}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                        style={styles.Liner}
                    >
                        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                subcriptionSelect == item.productId ? <AntDesign name="checkcircleo" size={20} color="#fff" style={styles.iconCHeck} /> : null
                            }
                        </View>
                        <Text style={styles.txtG}>
                            {item.localizedPrice} / {showMonthString(item.productId)} month All feature (maybe unsubscribe)
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>

            )
        })
    }
    // const showOptionBuy_ = () => {
    //     return listProduct.map((item, index) => {

    //         return (

    //             <TouchableOpacity
    //                 key={index}
    //                 activeOpacity={0.9}
    //                 onPress={() => {
    //                     setSubcriptionSelect('')
    //                     setProductSelect(item.productId)
    //                 }}
    //                 style={styles.wrapperBg}>
    //                 <LinearGradient
    //                     colors={['#9F015F', '#F9c929']}
    //                     useAngle={true}
    //                     angle={145}
    //                     angleCenter={{ x: 0.5, y: 0.5 }}
    //                     style={styles.Liner}
    //                 >
    //                     <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
    //                         {
    //                             ProductSelect == item.productId ? <AntDesign name="checkcircleo" size={20} color="#fff" style={styles.iconCHeck} /> : null
    //                         }
    //                     </View>
    //                     <Text style={styles.txtG}>
    //                         {item.localizedPrice} / Unlimit All feature 
    //                 </Text>
    //                 </LinearGradient>
    //             </TouchableOpacity>

    //         )
    //     })
    // }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <FocusAwareStatusBar barStyle='light-content' hidden={false} translucent={true} backgroundColor={'#220037'} />
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ padding: 20, paddingTop: 20 + STATUS_BAR_HEIGHT }}
                >
                    <AntDesign name="close" size={20} color="#fff" />
                </TouchableOpacity>
                <View
                    style={styles.contaiWrapper}>
                    <Image source={iconcommunityFocus} style={styles.imgIcon}></Image>

                </View>
                <View style={styles.container_}>
                    <View style={{ width: SCREEN_WIDTH / 1.5 }}>
                        <View style={styles.wraptxt}>
                            <Image source={start} style={styles.imgIconStar}></Image>
                            <Text style={styles.txt}>Remove all ads in application</Text>
                        </View>
                        <View style={styles.wraptxt}>
                            <Image source={start} style={styles.imgIconStar}></Image>
                            <Text style={styles.txt}>Landscape reading mode</Text>
                        </View>
                        <View style={styles.wraptxt}>
                            <Image source={start} style={styles.imgIconStar}></Image>
                            <Text style={styles.txt}>Download chapter</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 ,        marginHorizontal:10}}>
                    {
                        showOptionBuy()

                    }
                    {/* {showOptionBuy_()} */}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.btn}
                        activeOpacity={0.9}
                        onPress={_OnBuySubcriptions}
                    >
                        <LinearGradient
                            colors={['#E528DE', '#e71d36']}
                            useAngle={true}
                            angle={145}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            style={styles.btn_}
                        >
                            <Text style={{ color: '#fff', fontFamily: 'Nunito-Bold', fontSize: 20 }}>Buy Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              
                        <Text style={[styles.txtG, { fontSize: 14, fontFamily: 'averta' ,textAlign:'center'}]}>Recurring Billing, cancel anytime</Text>
                  
                </View>
                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    <Text style={[styles.txtG, { fontSize: 12, fontFamily: 'averta' }]}>- The subscription renews automatically at the end of each period feach week, month, 6 months, year, or otherwise) until you cancel.</Text>
                    <Text style={[styles.txtG, { fontSize: 12, fontFamily: 'averta' }]}>- Payment will be charged to your Google Play Store account at confirmation of purchase (after you accept by single-touch identification, facial recognition, or otherwise the subscription terms on the pop-up screen provided by Google).</Text>
                    <Text style={[styles.txtG, { fontSize: 12, fontFamily: 'averta' }]}>- You can cancel the subscription anytime by turning off auto-renewal through your Account settings.</Text>
                    <Text style={[styles.txtG, { fontSize: 12, fontFamily: 'averta' }]}>- To avoid being charged, cancel the subscription in your Account settings at least 24 hours before the end of the current subscription period.</Text>
                    <Text style={[styles.txtG, { fontSize: 12, fontFamily: 'averta' }]}>- You alone can manage your subscription. Learn more about managing subscriptions (and how to cancel them) on Google's support page.</Text>
                    <Text style={[styles.txtG, { fontSize: 12, fontFamily: 'averta' }]}>- If you purchased a subscription through the Google Play Store and are eligible for a refund, you'll have to request it directly from Google. To request a refund, follow these instructions from the Google's support page.</Text>
                </View>

            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#220037',

    },
    contaiWrapper: {
        alignItems: 'center',
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20
    },
    imgIcon: {
        width: 100,
        height: 100,
        marginVertical: 10,

    },
    txt: {
        color: '#ffa518',
        marginLeft: 10,
        fontFamily: 'Nunito-Bold',
        fontSize: 17,
    },
    container_: {
        alignItems: 'center',
    },
    imgIconStar: {
        width: 20,
        height: 20,
    },
    wraptxt: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconbg: {
        borderRadius: 10

    },
    wrapperBg: {
        width: '100%',
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 15,
        marginHorizontal:20
    },
    txtG: {
        color: '#fff',
        width: '90%',
        fontFamily: 'Nunito-Bold',
        fontSize: 14,
    },
    btn: {
        marginTop: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    btn_: {
        paddingVertical: 10,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    iconCHeck: {


    },
    Liner:{ borderRadius: 10, flexDirection: 'row', justifyContent: 'center',height:'100%',alignItems:'center' }
})

import { PermissionsAndroid } from 'react-native';
export const PermissonRequiredDowload =async():Promise<boolean>=>{
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
        title: 'Storage Permission Required',
        message:
            'App needs access to your storage to download Photos',
            buttonPositive:"name"});
        if(granted==PermissionsAndroid.RESULTS.GRANTED){
            return true
        }else {
            return false;
        }
    } catch (error) {
        return false ;
    }
}
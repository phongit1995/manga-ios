import axios from './axios';
import { ResponseApiFull } from './responsive.interface';
import {getVersion} from 'react-native-device-info';
export const checkVersionUpdate=():Promise<ResponseApiFull<boolean>>=>{
    return axios.post("/version/check-update",{
        version_type:"ANDROID",
        name:getVersion()
    })
}
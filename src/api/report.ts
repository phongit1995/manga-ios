import axios from './axios';
import { ResponseApiFull } from './responsive.interface';
export const postReport = (manga_id: string, reason: string):Promise<ResponseApiFull<any>> => {
    return axios.post('/report/report-manga', {
        "manga_id" : manga_id,
        "reason":reason
    })
}


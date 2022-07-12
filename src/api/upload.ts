import axios from './axios';
import { ResponseApiFull } from './responsive.interface';
export const UploadFile = (path:string,type:string):Promise<ResponseApiFull<string>>=>{
    let formData = new FormData();
    formData.append('file',{
        uri:path,
        name:"phong.jpg",
        type:type
    })
    console.log(formData);
    return axios({
        method:"POST",
        url:"/upload",
        data:formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
    })
}
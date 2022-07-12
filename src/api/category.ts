import axios from './axios';
import { CategoryItem } from './interface/category.interface';
import { ResponseApiFull } from './responsive.interface';
export const getListCategory=():Promise<ResponseApiFull<CategoryItem[]>>=>{
    return axios.get("/category/get-list");
}
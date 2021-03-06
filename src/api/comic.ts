import { ItemComicProps } from '../constants/mangaItem.type';
import axios from './axios';
import { ChapterItem } from './interface/chapter.interface';
import { ResponseApiFull } from './responsive.interface';
export const getListTypeCommic = (page = 1, numberItem = 20, type = 0): Promise<ResponseApiFull<ItemComicProps[]>> => {
    return axios.post('/manga/get-list', {
        page: page,
        numberItem: numberItem,
        type: type
    })
}

export const getListComicByType = (page = 1, numberItem = 0, type = 0): Promise<ResponseApiFull<ItemComicProps[]>> => {
    return axios.post('/manga/get-list', {
        page: page,
        numberItem: numberItem,
        type: type
    })
}
export const getDetialComic = (id: string) => {
    return axios.post("/manga/detial-manga", {
        manga_id: id
    })
}
export const getListByCategorySortViews = (page = 1, numberItem = 12, category: any): Promise<ResponseApiFull<ItemComicProps[]>> => {
    return axios.post("/manga/get-list-category", {
        page: page,
        numberItem: numberItem,
        type: 0,
        category: category
    })
}
export const searchComicByName = (page = 1, numberItem = 10, name: any): Promise<ResponseApiFull<ItemComicProps[]>> => {
    return axios.post("/manga/search-manga", {
        page: page,
        numberItem: numberItem,
        name: name
    })
}

export const getListChapter = (page: number = 1, id: string, numberItem: number = 20, sort = 1): Promise<ResponseApiFull<ChapterItem[]>> => {
    return axios.post("/chapter/list-chapter", {
        manga_id: id,
        page: page,
        numberItem,
        sort
    })
}
export const getDetailChapter = (id: any) => {
    return axios.post("/chapter/detial-chapter", {
        id: id,
    }, {
        headers: {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'
        }
    })
}
export const addDevicesManga = (manga_id: string, device: string) => {
    return axios.post("/manga/add-devices", {
        manga_id: manga_id,
        device: device
    })
}
export const removeDevicesManga = (manga_id: any, device: any) => {
    return axios.post("/manga/remove-devices", {
        manga_id: manga_id,
        device: device
    })
}
export const getBannerManga = () => {
    return axios.get("/manga/manga-slide-show")
}
export const getListSuggest = async (): Promise<ResponseApiFull<ItemComicProps[]>> => {
    const listCategory: string[] = [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Romance",
        "Shoumen",
        "Manhua",
        "Webtoons",
    ]
    return axios.post("/manga/suggest-manga", {
        category: [
            listCategory[Math.floor(Math.random() * listCategory.length)]
        ],
        page: 1,
        numberItem: 10
    })
}
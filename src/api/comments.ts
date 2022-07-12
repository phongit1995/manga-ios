import axios from './axios';
import { ResponseApiFull } from './responsive.interface';
export const PostCommentManga = (manga_id: string, message: string, token: string): Promise<ResponseApiFull<any>> => {
    console.log(manga_id, token)
    return axios.post('/comment/comment-manga', {
        manga_id,
        message
    }, {
        headers: {
            'token': token
        }
    })
}

export const GetListCommentManga = (page = 1, numberItem = 10, manga_id: string): Promise<ResponseApiFull<any>> => {
    return axios.post('/comment/list-comment-manga', {
        page,
        numberItem,
        manga_id,
    })
}
export const PostRepCommentManga = (comment_id: string, message: string, token: string): Promise<ResponseApiFull<any>> => {

    return axios.post('/comment/reply-comment', {
        comment_id,
        message
    }, {
        headers: {
            'token': token
        }
    })
}

export const GetlistCmtRepCommentManga = (page = 1, numberItem = 10, comment_id: string): Promise<ResponseApiFull<any>> => {
    return axios.post('/comment/detial-comment', {
        page,
        numberItem,
        comment_id,
    })
}
export const GetlistPublicComment = (page = 1, numberItem = 10): Promise<ResponseApiFull<any>> => {
    return axios.post('/comment/list-public-comment', {
        page,
        numberItem,
    })
}

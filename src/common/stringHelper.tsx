// export const formatViews = (views)=>{
//     return views.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
// }
export const formatViews = (views) => {

    if (views < 1e3) return views;
    if (views >= 1e3 && views < 1e6) return +(views / 1e3).toFixed(1) + " K";
    if (views >= 1e6 && views < 1e9) return +(views / 1e6).toFixed(1) + " M";
    if (views >= 1e9 && views < 1e12) return +(views / 1e9).toFixed(1) + " B";
    if (views >= 1e12) return +(views / 1e12).toFixed(1) + "T";
}
export const makeUserName = (length: number): string => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export const changeBackground = (e:boolean) => {
    return e ? "#fff" : '#5c6b73'
}
export const changeBackground_ = (e:boolean) => {
    return e ? "#fff" : '#111217'
}
export const changeBackground__ = (e:boolean) => {
    return e ? "#111217" : '#fff'
}
export const changeBackground___ = (e:boolean) => {
    return e ? "#111217" : '#FAFAFA'
}

export const changeBackground____ = (e:boolean) => {
    return e ? "#1e1e23" : '#1fcf84'
}
export const changeBackground_____ = (e:boolean) => {
    return e ? "#fff" : '#000'
}
export const changeBackground______ = (e:boolean) => {
    return e ? "#fff" : '#EE3340'
}
export const changeBackground_______ = (e:boolean) => {
    return e ? "#000" : '#fff'
}
export const changeBackground________ = (e:boolean) => {
    return e ?  'light-content' : 'dark-content'
}
export const changeBackground_________ = (e:boolean) => {
    return e ?   '#fff' : '#252333'
}